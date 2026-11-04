<?php
// Base compartida de la API de Marketing Místico.
// La configuración (contraseñas) vive FUERA de public_html: ver server/mm_config.example.php.

if (!defined('MM_APP')) {
    http_response_code(403);
    exit;
}

function mm_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }
    // En Hostinger: /home/uXXXX/domains/marketingmistico.com/mm_config.php (un nivel arriba de public_html).
    $path = getenv('MM_CONFIG') ?: dirname(__DIR__, 2) . '/mm_config.php';
    if (!is_file($path)) {
        error_log('mm_config.php no encontrado en ' . $path);
        mm_json(['status' => 'error', 'message' => 'Servidor sin configurar'], 500);
    }
    $config = require $path;
    return $config;
}

function mm_db(): PDO
{
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }
    $c = mm_config();
    $dsn = $c['db_dsn'] ?? sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $c['db_host'] ?? 'localhost', $c['db_name']);
    $pdo = new PDO($dsn, $c['db_user'] ?? null, $c['db_pass'] ?? null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function mm_json($data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function mm_input(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '', true);
    return is_array($data) ? $data : [];
}

// Solo aceptamos peticiones desde nuestro propio dominio (y localhost para pruebas).
function mm_same_origin(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return; // navegadores no envían Origin en GET del mismo sitio
    }
    $allowed = mm_config()['allowed_origins'] ?? ['https://marketingmistico.com', 'https://www.marketingmistico.com'];
    if (!in_array($origin, $allowed, true)) {
        mm_json(['status' => 'error', 'message' => 'Origen no permitido'], 403);
    }
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

function mm_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_name('mm_admin');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
    // Cierra la sesión tras 8 horas sin uso.
    if (isset($_SESSION['last_seen']) && time() - $_SESSION['last_seen'] > 8 * 3600) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['last_seen'] = time();
}

function mm_is_admin(): bool
{
    mm_session();
    return !empty($_SESSION['is_admin']);
}

function mm_require_admin(): void
{
    if (!mm_is_admin()) {
        mm_json(['status' => 'error', 'message' => 'No autorizado'], 401);
    }
}

// Límite de intentos de login por IP: 5 intentos cada 15 minutos.
function mm_rate_limit_hit(string $key, int $max = 5, int $window = 900): bool
{
    $file = sys_get_temp_dir() . '/mm_rl_' . hash('sha256', $key);
    $now = time();
    $hits = is_file($file) ? array_filter(explode(',', (string) file_get_contents($file)), fn($t) => $now - (int) $t < $window) : [];
    if (count($hits) >= $max) {
        return true;
    }
    $hits[] = $now;
    file_put_contents($file, implode(',', $hits), LOCK_EX);
    return false;
}

function mm_client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

// Limpia texto para correos: sin saltos de línea (evita inyección de cabeceras).
function mm_clean_line(string $value, int $max = 200): string
{
    $value = preg_replace('/[\r\n\t]+/', ' ', $value);
    return mb_substr(trim($value), 0, $max);
}
