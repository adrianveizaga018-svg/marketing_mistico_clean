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
    mm_json(['authenticated' => mm_is_admin()]);
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

if (mm_rate_limit_hit('login|' . mm_client_ip())) {
    mm_json(['status' => 'error', 'message' => 'Demasiados intentos. Espera 15 minutos.'], 429);
}

$expected = (string) (mm_config()['admin_password'] ?? '');
$given = (string) ($in['password'] ?? '');
usleep(400000); // frena intentos automáticos

if ($expected === '' || strlen($expected) < 10 || !hash_equals($expected, $given)) {
    mm_json(['status' => 'error', 'message' => 'Contraseña incorrecta'], 401);
}

session_regenerate_id(true);
$_SESSION['is_admin'] = true;
mm_json(['authenticated' => true]);
