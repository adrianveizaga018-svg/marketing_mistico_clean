#!/bin/bash
# Uso (Git Bash):  PHP=/c/Users/USUARIO/php/php bash server/tests/api_test.sh
# Pruebas de la API de invitaciones contra un servidor PHP temporal con SQLite.
T="${MM_TEST_DIR:-$(cygpath -m "${TEMP:-/tmp}")/mm_test}"; mkdir -p "$T"; PHP="${PHP:-php}"
# Config de prueba (SQLite, clave de prueba). No usa la base real.
[ -f "$T/mm_config.php" ] || cat > "$T/mm_config.php" <<CFG
<?php return ['db_dsn' => 'sqlite:' . __DIR__ . '/test.sqlite', 'admin_password' => 'clave-de-prueba-larga-123', 'notify_email' => 'nadie@example.com', 'allowed_origins' => ['http://localhost:8090']];
CFG
PUB="$(cd "$(dirname "$0")/../../frontend/public" && pwd -W 2>/dev/null || pwd)"
rm -f "$T/test.sqlite" "$T"/*.cookies
$PHP -r 'foreach(glob(sys_get_temp_dir()."/mm_rl_*") as $f) unlink($f);'
$PHP -r "define('MM_APP',true); require '$PUB/_mm/schema.php'; \$p=new PDO('sqlite:$T/test.sqlite'); foreach(mm_schema('sqlite') as \$s) \$p->exec(\$s); \$p->exec('CREATE TABLE Leads (id TEXT, nombre TEXT, email TEXT, pais TEXT, whatsapp TEXT, servicio TEXT, status TEXT, timestamp TEXT)'); echo \"esquema ok\n\";"
cd "$PUB" && MM_CONFIG="$T/mm_config.php" $PHP -S localhost:8090 -t . >/dev/null 2>&1 &
SRV=$!; sleep 1.5
B=http://localhost:8090; A="$T/admin.cookies"; C="$T/client.cookies"
pass=0; fail=0
req(){ curl -s -o "$T/out.json" -w "%{http_code}" "$@"; }
check(){ # nombre, codigo_esperado, codigo_real, [texto esperado en la respuesta]
  if [ "$2" = "$3" ] && { [ -z "$4" ] || grep -q -- "$4" "$T/out.json"; }; then pass=$((pass+1)); printf "OK   %s\n" "$1";
  else fail=$((fail+1)); printf "FAIL %s (esperaba %s, obtuvo %s) %s\n" "$1" "$2" "$3" "$(head -c 200 "$T/out.json")"; fi; }
J='-H Content-Type:application/json'
jq_(){ $PHP -r "\$d=json_decode(file_get_contents('$T/out.json'),true); echo $1;"; }

c=$(req $B/api/admin/invitaciones.php); check "panel sin login -> 401" 401 $c
c=$(req -c $A $J -d '{"password":"clave-de-prueba-larga-123"}' $B/admin_auth.php); check "login admin" 200 $c '"role":"admin"'
c=$(req -b $A $J -d '{"action":"create","template":"boda","event_type":"boda","title":"Boda de Ana y Luis","honorees":"Ana & Luis","event_at":"2027-02-14 19:30","venue":"Sal00f3n Los Andes","open_link":false,"rsvp_deadline":"2027-02-01","itinerary":[{"time":"19:30","label":"Ceremonia"}],"gifts":{"bank":"BNB 123"}}' $B/api/admin/invitaciones.php); check "crear invitacion" 201 $c '"slug":"ana-luis-'
INV=$(jq_ '$d["id"]'); SLUG=$(jq_ '$d["slug"]')
c=$(req -b $A $J -d "{\"action\":\"add\",\"invitation_id\":$INV,\"name\":\"Luciana Rojas\",\"phone\":\"70011122\",\"passes\":2}" $B/api/admin/invitados.php); check "agregar invitado" 201 $c
c=$(req -b $A $J -d "{\"action\":\"import\",\"invitation_id\":$INV,\"csv\":\"nombre;telefono;pases\nJuan P00e9rez;71234567;3\nMar00eda Quispe;;1\n\"}" $B/api/admin/invitados.php); check "importar CSV (2)" 200 $c '"added":2'
c=$(req -b $A "$B/api/admin/invitados.php?invitation_id=$INV"); check "listar invitados" 200 $c '"passes":6'
TOK=$($PHP -r "\$d=json_decode(file_get_contents('$T/out.json'),true); foreach(\$d['guests'] as \$g) if(\$g['name']==='Luciana Rojas'){ preg_match('#/([A-Za-z0-9]+)\$#',\$g['link'],\$m); echo \$m[1]; }")
grep -qF 'wa.me\/59170011122' "$T/out.json" && { pass=$((pass+1)); echo "OK   link WhatsApp con 591"; } || { fail=$((fail+1)); echo "FAIL link WhatsApp"; }
c=$(req "$B/api/invitacion.php?slug=$SLUG"); check "evento privado sin codigo -> 404" 404 $c
c=$(req "$B/api/invitacion.php?slug=$SLUG&t=codigofalso1"); check "codigo falso -> 404" 404 $c
c=$(req "$B/api/invitacion.php?slug=$SLUG&t=$TOK"); check "invitacion personal" 200 $c '"passes":2'
grep -q '70011122\|owner_id\|"token"' "$T/out.json" && { fail=$((fail+1)); echo "FAIL respuesta publica filtra datos internos"; } || { pass=$((pass+1)); echo "OK   respuesta publica sin datos internos"; }
c=$(req $J -d "{\"slug\":\"$SLUG\",\"t\":\"$TOK\",\"attending\":true,\"people\":3}" $B/api/confirmar.php); check "confirmar mas que sus pases -> 422" 422 $c 'para 2 personas'
c=$(req $J -d "{\"slug\":\"$SLUG\",\"t\":\"$TOK\",\"attending\":true,\"people\":2,\"message\":\"=CMD()\"}" $B/api/confirmar.php); check "confirmar 2 personas" 200 $c '"pass_code":"'
PASS=$(jq_ '$d["pass_code"]')
c=$(req $J -d "{\"slug\":\"$SLUG\",\"name\":\"Colado\",\"attending\":true,\"people\":1}" $B/api/confirmar.php); check "confirmar sin codigo en evento privado -> 404" 404 $c
c=$(req -b $A "$B/api/admin/invitados.php?invitation_id=$INV"); check "estado confirmo y total 2" 200 $c '"confirmed":2'
c=$(req -b $A $J -d "{\"invitation_id\":$INV,\"code\":\"https://marketingmistico.com/pase/$PASS\"}" $B/api/admin/checkin.php); check "check-in con QR" 200 $c '"status":"ok"'
c=$(req -b $A $J -d "{\"invitation_id\":$INV,\"code\":\"$PASS\"}" $B/api/admin/checkin.php); check "check-in repetido -> 409" 409 $c '"status":"already"'
c=$(req -b $A $J -d "{\"invitation_id\":$INV,\"code\":\"XXXXXXXXXXXX\"}" $B/api/admin/checkin.php); check "pase falso -> 404" 404 $c
c=$(req $J -d "{\"slug\":\"$SLUG\",\"t\":\"$TOK\",\"attending\":true,\"people\":1}" $B/api/confirmar.php); check "cambiar respuesta tras ingresar -> 409" 409 $c
c=$(req -b $A "$B/api/admin/confirmados.php?invitation_id=$INV&format=csv"); check "exportar CSV" 200 $c "'=CMD()"
c=$(req -b $A $J -d '{"action":"create","name":"Cliente Uno","email":"cliente@example.com","password":"secreta123"}' $B/api/admin/clientes.php); check "crear cliente" 201 $c
CLI=$(jq_ '$d["id"]')
c=$(req -b $A $J -d '{"action":"create","title":"Otro evento","honorees":"Pedro","event_at":"2027-05-01 20:00","open_link":true}' $B/api/admin/invitaciones.php); INV2=$(jq_ '$d["id"]'); SLUG2=$(jq_ '$d["slug"]')
c=$(req -b $A $J -d "{\"action\":\"update\",\"id\":$INV,\"owner_id\":$CLI}" $B/api/admin/invitaciones.php); check "asignar evento al cliente" 200 $c
c=$(req -c $C $J -d '{"email":"cliente@example.com","password":"secreta123"}' $B/admin_auth.php); check "login cliente" 200 $c '"role":"client"'
c=$(req -b $C $B/api/admin/invitaciones.php); check "cliente ve solo su evento" 200 $c 'Boda de Ana'
grep -q 'Otro evento' "$T/out.json" && { fail=$((fail+1)); echo "FAIL cliente ve evento ajeno"; } || { pass=$((pass+1)); echo "OK   cliente NO ve el evento ajeno"; }
c=$(req -b $C "$B/api/admin/invitados.php?invitation_id=$INV2"); check "cliente pide invitados ajenos -> 404" 404 $c
c=$(req -b $C $J -d "{\"action\":\"add\",\"invitation_id\":$INV,\"name\":\"Invitado del cliente\",\"passes\":1}" $B/api/admin/invitados.php); check "cliente agrega a su evento" 201 $c
c=$(req -b $C $J -d "{\"action\":\"update\",\"id\":$INV,\"title\":\"hack\"}" $B/api/admin/invitaciones.php); check "cliente edita invitacion -> 403" 403 $c
c=$(req -b $C $B/api/admin/clientes.php); check "cliente lista clientes -> 403" 403 $c
c=$(req -b $C $B/leads_api.php); check "cliente ve leads -> 401" 401 $c
c=$(req $J -d "{\"slug\":\"$SLUG2\",\"name\":\"Ana Abierta\",\"attending\":true,\"people\":2}" $B/api/confirmar.php); check "link abierto confirma" 200 $c
c=$(req -b $A $J -d "{\"action\":\"duplicate\",\"id\":$INV}" $B/api/admin/invitaciones.php); check "duplicar" 201 $c '"active":0'
c=$(req $B/_mm/invitations.php); check "archivo privado -> 403" 403 $c

kill $SRV 2>/dev/null; wait $SRV 2>/dev/null
echo "== $pass OK, $fail FALLAS"
