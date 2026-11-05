<?php
// Login del panel de administración (sesión en el servidor, no en el navegador).
//   GET                       -> { authenticated: bool }
//   POST {password}           -> inicia sesión
//   POST {action: "logout"}   -> cierra sesión
define('MM_APP', true);
require __DIR__ . '/_mm/bootstrap.php';

mm_same_origin();
mm_session();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $current = mm_current_user();
    mm_json(['authenticated' => mm_is_admin(), 'user' => $current ? ['role' => $current['role'], 'name' => $current['name']] : null]);
}
if ($method !== 'POST') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}

$in = mm_input();

if (($in['action'] ?? '') === 'logout') {
    $_SESSION = [];
    session_regenerate_id(true);
    mm_json(['authenticated' => false]);
}

if (mm_rate_limit_hit('login|' . mm_client_ip(), 8)) {
    mm_json(['status' => 'error', 'message' => 'Demasiados intentos. Espera 15 minutos.'], 429);
}

$given = (string) ($in['password'] ?? '');
usleep(400000); // frena intentos automáticos

// Cliente: entra con email + contraseña y solo ve su evento.
if (!empty($in['email'])) {
    $stmt = mm_db()->prepare("SELECT id, name, password_hash FROM users WHERE email = ? AND role = 'client' AND active = 1");
    $stmt->execute([strtolower(mm_text($in['email'], 160))]);
    $client = $stmt->fetch();
    if (!$client || !password_verify($given, $client['password_hash'])) {
        mm_json(['status' => 'error', 'message' => 'Email o contraseña incorrectos'], 401);
    }
    session_regenerate_id(true);
    $_SESSION = ['client_id' => (int) $client['id'], 'last_seen' => time()];
    mm_json(['authenticated' => true, 'role' => 'client', 'name' => $client['name']]);
}

// Administrador: solo contraseña (definida en mm_config.php).
$expected = (string) (mm_config()['admin_password'] ?? '');
if ($expected === '' || strlen($expected) < 10 || !hash_equals($expected, $given)) {
    mm_json(['status' => 'error', 'message' => 'Contraseña incorrecta'], 401);
}

session_regenerate_id(true);
$_SESSION = ['is_admin' => true, 'last_seen' => time()];
mm_json(['authenticated' => true, 'role' => 'admin']);
