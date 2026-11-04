<?php
// Lista de leads para el panel /gestion-leads. Solo con sesión de administrador.
define('MM_APP', true);
require __DIR__ . '/_mm/bootstrap.php';

mm_same_origin();
mm_require_admin();

try {
    $rows = mm_db()->query('SELECT id, nombre, email, pais, whatsapp, servicio, status, timestamp FROM Leads ORDER BY timestamp DESC LIMIT 500')->fetchAll();
    mm_json($rows);
} catch (Throwable $e) {
    error_log('leads_api.php: ' . $e->getMessage());
    mm_json(['status' => 'error', 'message' => 'No se pudo leer la base de datos'], 500);
}
