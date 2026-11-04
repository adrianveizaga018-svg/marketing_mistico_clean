<?php
// Recibe el formulario de cotización de la landing: guarda el lead y avisa por correo.
define('MM_APP', true);
require __DIR__ . '/_mm/bootstrap.php';

mm_same_origin();
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}
// Evita que un bot llene la base: máximo 10 envíos por IP cada 15 minutos.
if (mm_rate_limit_hit('contact|' . mm_client_ip(), 10, 900)) {
    mm_json(['status' => 'error', 'message' => 'Demasiados envíos, intenta más tarde'], 429);
}

$in = mm_input();
$lead = [
    'nombre' => mm_clean_line((string) ($in['nombre'] ?? ''), 120),
    'email' => mm_clean_line((string) ($in['email'] ?? ''), 160),
    'pais' => mm_clean_line((string) ($in['pais'] ?? ''), 80),
    'whatsapp' => mm_clean_line((string) ($in['whatsapp'] ?? ''), 40),
    'servicio' => mm_clean_line((string) ($in['servicio'] ?? ''), 120),
];

if ($lead['nombre'] === '' || $lead['whatsapp'] === '') {
    mm_json(['status' => 'error', 'message' => 'Faltan nombre o celular'], 422);
}
if ($lead['email'] !== '' && !filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
    mm_json(['status' => 'error', 'message' => 'Email no válido'], 422);
}

$id = bin2hex(random_bytes(16));
$fecha = date('Y-m-d H:i:s');

$dbOk = false;
try {
    $stmt = mm_db()->prepare(
        'INSERT INTO Leads (id, nombre, email, pais, whatsapp, servicio, status, timestamp)
         VALUES (:id, :nombre, :email, :pais, :whatsapp, :servicio, :status, :fecha)'
    );
    $dbOk = $stmt->execute($lead + ['id' => $id, 'status' => 'nuevo', 'fecha' => $fecha]);
} catch (Throwable $e) {
    error_log('contact.php BD: ' . $e->getMessage());
}

$to = mm_config()['notify_email'] ?? 'marketing.mistico.oficial@gmail.com';
$subject = 'Nuevo lead: ' . $lead['nombre'] . ' - ' . $lead['servicio'];
$body = "Nuevo contacto desde el sitio web:\n\n"
    . "Nombre: {$lead['nombre']}\nEmail: {$lead['email']}\nPaís: {$lead['pais']}\n"
    . "WhatsApp: {$lead['whatsapp']}\nServicio: {$lead['servicio']}\n\nFecha: $fecha\n";
$mailOk = @mail($to, $subject, $body, "From: noreply@marketingmistico.com\r\nContent-Type: text/plain; charset=UTF-8");

if ($dbOk || $mailOk) {
    mm_json(['status' => 'success', 'message' => 'Lead recibido']);
}
mm_json(['status' => 'error', 'message' => 'Error al procesar'], 500);
