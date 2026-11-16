<?php
// Pública: galería de fotos de invitados y muro de dedicatorias.
//   GET  ?action=photos&slug=S[&t=CODIGO]
//   GET  ?action=wall&slug=S[&t=CODIGO]
//   POST {action:"upload_photo", slug, t?, uploader_name, image_base64}
//   POST {action:"post_message", slug, t?, author_name, message}
// La invitación se identifica por su slug (no por id numérico, que se podía adivinar).
// Eventos privados (sin link abierto) exigen el código de invitado.
define('MM_APP', true);
require dirname(__DIR__) . '/_mm/bootstrap.php';
require dirname(__DIR__) . '/_mm/invitations.php';

mm_same_origin();
if (mm_method() === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

const MM_PHOTO_MAX_BYTES = 8 * 1024 * 1024; // lo que aceptamos recibir
const MM_PHOTO_MAX_SIDE = 1600;             // lo que guardamos (px del lado mayor)
const MM_PHOTO_MAX_PER_EVENT = 500;

$isPost = mm_method() === 'POST';
$in = $isPost ? mm_input() : $_GET;
$db = mm_db();
$now = mm_now();

$slug = mm_text($in['slug'] ?? '', 90);
$token = mm_text($in['t'] ?? '', 16);

// Las demos de la web no tienen galería real: se muestran vacías y no guardan nada.
if (in_array($slug, ['demo-boda', 'demo-quince', 'demo-cumple'], true)) {
    if ($isPost) {
        mm_json(['status' => 'error', 'message' => 'Esta es una invitación de demostración: las fotos y mensajes no se guardan.'], 403);
    }
    mm_json([]);
}

$stmt = $db->prepare('SELECT id, owner_id, open_link FROM invitations WHERE slug = ? AND active = 1');
$stmt->execute([$slug]);
$inv = $stmt->fetch();
if (!$inv) {
    mm_json(['status' => 'error', 'message' => 'Invitación no encontrada'], 404);
}

$guest = null;
if ($token !== '') {
    $stmt = $db->prepare('SELECT id, name FROM guests WHERE token = ? AND invitation_id = ?');
    $stmt->execute([$token, $inv['id']]);
    $guest = $stmt->fetch() ?: null;
}
if (!$guest && (int) $inv['open_link'] !== 1 && ($isPost || !mm_owner_can_view($inv))) {
    mm_json(['status' => 'error', 'message' => 'Invitación no encontrada'], 404);
}
$invId = (int) $inv['id'];

if (!$isPost) {
    $action = $in['action'] ?? 'photos';
    if ($action === 'photos') {
        $stmt = $db->prepare('SELECT id, uploader_name, file_path, created_at FROM guest_photos WHERE invitation_id = ? AND approved = 1 ORDER BY id DESC LIMIT 60');
        $stmt->execute([$invId]);
        mm_json($stmt->fetchAll());
    }
    if ($action === 'wall') {
        $stmt = $db->prepare('SELECT id, author_name, message, created_at FROM wall_messages WHERE invitation_id = ? AND approved = 1 ORDER BY id DESC LIMIT 60');
        $stmt->execute([$invId]);
        mm_json($stmt->fetchAll());
    }
    mm_json(['status' => 'error', 'message' => 'Acción no válida'], 400);
}

$action = $in['action'] ?? '';

if ($action === 'post_message') {
    if (mm_rate_limit_hit('wall|' . mm_client_ip(), 10, 900)) {
        mm_json(['status' => 'error', 'message' => 'Enviaste muchos mensajes seguidos, espera unos minutos'], 429);
    }
    $name = $guest ? $guest['name'] : mm_text($in['author_name'] ?? '', 120);
    $msg = mm_text($in['message'] ?? '', 500);
    if ($name === '' || $msg === '') {
        mm_json(['status' => 'error', 'message' => 'Nombre y mensaje son obligatorios'], 422);
    }
    $db->prepare('INSERT INTO wall_messages (invitation_id, author_name, message, approved, created_at) VALUES (?, ?, ?, 1, ?)')
        ->execute([$invId, $name, $msg, $now]);
    mm_json([
        'status' => 'ok',
        'id' => (int) $db->lastInsertId(),
        'author_name' => $name,
        'message' => $msg,
        'created_at' => $now,
    ], 201);
}

if ($action === 'upload_photo') {
    if (mm_rate_limit_hit('photo|' . mm_client_ip(), 15, 900)) {
        mm_json(['status' => 'error', 'message' => 'Subiste muchas fotos seguidas, espera unos minutos'], 429);
    }
    $count = $db->prepare('SELECT COUNT(*) FROM guest_photos WHERE invitation_id = ?');
    $count->execute([$invId]);
    if ((int) $count->fetchColumn() >= MM_PHOTO_MAX_PER_EVENT) {
        mm_json(['status' => 'error', 'message' => 'La galería de este evento ya está llena'], 409);
    }

    $name = $guest ? $guest['name'] : (mm_text($in['uploader_name'] ?? '', 120) ?: 'Invitado');
    $base64 = (string) ($in['image_base64'] ?? '');
    if (!preg_match('#^data:image/(jpeg|png|webp);base64,#', $base64)) {
        mm_json(['status' => 'error', 'message' => 'Formato de imagen no válido (usa JPG, PNG o WEBP)'], 422);
    }
    $binary = base64_decode(substr($base64, strpos($base64, ',') + 1), true);
    if ($binary === false || $binary === '') {
        mm_json(['status' => 'error', 'message' => 'Imagen dañada'], 422);
    }
    if (strlen($binary) > MM_PHOTO_MAX_BYTES) {
        mm_json(['status' => 'error', 'message' => 'La imagen es demasiado pesada'], 413);
    }

    // Verificamos que de verdad sea una imagen (no un archivo disfrazado).
    $info = @getimagesizefromstring($binary);
    $allowed = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp'];
    if (!$info || !isset($allowed[$info[2]]) || $info[0] < 1 || $info[1] < 1 || $info[0] * $info[1] > 40000000) {
        mm_json(['status' => 'error', 'message' => 'El archivo no es una imagen válida'], 422);
    }

    $uploadRoot = dirname(__DIR__) . '/uploads';
    $uploadDir = $uploadRoot . '/eventos/' . $invId;
    if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) {
        error_log('galeria.php: no se pudo crear ' . $uploadDir);
        mm_json(['status' => 'error', 'message' => 'No se pudo guardar la foto'], 500);
    }
    mm_protect_uploads($uploadRoot);

    $base = 'foto_' . time() . '_' . strtolower(mm_token(8));
    $saved = mm_save_resized($binary, $info, $uploadDir . '/' . $base . '.jpg');
    if ($saved) {
        $filename = $base . '.jpg';
    } else {
        // Sin la extensión GD: guardamos el original (ya validado como imagen).
        $filename = $base . '.' . $allowed[$info[2]];
        file_put_contents($uploadDir . '/' . $filename, $binary);
    }
    $webPath = '/uploads/eventos/' . $invId . '/' . $filename;

    $db->prepare('INSERT INTO guest_photos (invitation_id, guest_id, uploader_name, file_path, approved, created_at) VALUES (?, ?, ?, ?, 1, ?)')
        ->execute([$invId, $guest ? $guest['id'] : null, $name, $webPath, $now]);

    mm_json([
        'status' => 'ok',
        'id' => (int) $db->lastInsertId(),
        'file_path' => $webPath,
        'uploader_name' => $name,
        'created_at' => $now,
    ], 201);
}

mm_json(['status' => 'error', 'message' => 'Acción no permitida'], 400);

// Reduce la foto a máx. 1600px y la guarda como JPG calidad 80 (una foto de celular de 6 MB queda en ~300 KB).
// Al re-dibujarla también se eliminan los metadatos (GPS del celular) y cualquier contenido oculto.
function mm_save_resized(string $binary, array $info, string $dest): bool
{
    if (!function_exists('imagecreatefromstring')) {
        return false;
    }
    $src = @imagecreatefromstring($binary);
    if (!$src) {
        return false;
    }
    [$w, $h] = [$info[0], $info[1]];
    $scale = min(1, MM_PHOTO_MAX_SIDE / max($w, $h));
    $nw = max(1, (int) round($w * $scale));
    $nh = max(1, (int) round($h * $scale));
    $dst = imagecreatetruecolor($nw, $nh);
    imagefill($dst, 0, 0, imagecolorallocate($dst, 255, 255, 255)); // fondo blanco para PNG transparentes
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);
    $ok = imagejpeg($dst, $dest, 80);
    imagedestroy($src);
    imagedestroy($dst);
    return $ok;
}

// La carpeta de fotos nunca debe ejecutar código, aunque alguien logre subir un archivo raro.
function mm_protect_uploads(string $root): void
{
    $file = $root . '/.htaccess';
    if (is_file($file)) {
        return;
    }
    @file_put_contents($file, "# Solo imágenes: aquí no se ejecuta PHP ni scripts.\n"
        . "Options -Indexes -ExecCGI\n"
        . "RemoveHandler .php .phtml .php3 .php4 .php5 .php7 .php8 .phar .pl .py .cgi\n"
        . "RemoveType .php .phtml .php3 .php4 .php5 .php7 .php8 .phar\n"
        . "<IfModule mod_php.c>\n  php_flag engine off\n</IfModule>\n"
        . "<FilesMatch \"(?i)\\.(php\\d?|phtml|phar|pl|py|cgi|sh|html?|js|svg)$\">\n"
        . "  Require all denied\n</FilesMatch>\n"
        . "<IfModule mod_headers.c>\n  Header set X-Content-Type-Options nosniff\n</IfModule>\n");
}
