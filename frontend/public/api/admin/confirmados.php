<?php
// Panel: confirmaciones de una invitación.
//   GET ?invitation_id=N              -> lista JSON con totales
//   GET ?invitation_id=N&format=csv   -> descarga para Excel
define('MM_APP', true);
require dirname(__DIR__, 2) . '/_mm/bootstrap.php';
require dirname(__DIR__, 2) . '/_mm/invitations.php';

mm_same_origin();
$user = mm_require_user();
$inv = mm_require_invitation($user, (int) ($_GET['invitation_id'] ?? 0));

$stmt = mm_db()->prepare('SELECT r.name, r.attending, r.people, r.message, r.checked_in_at, r.created_at, r.updated_at,
                                 g.phone, g.passes
                          FROM rsvps r LEFT JOIN guests g ON g.id = r.guest_id
                          WHERE r.invitation_id = ? ORDER BY r.attending DESC, r.name');
$stmt->execute([$inv['id']]);
$rows = $stmt->fetchAll();

if (($_GET['format'] ?? '') === 'csv') {
    $file = 'confirmados-' . $inv['slug'] . '.csv';
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $file . '"');
    header('Cache-Control: no-store');
    $out = fopen('php://output', 'w');
    fwrite($out, "\xEF\xBB\xBF"); // BOM para que Excel lea bien las tildes
    fputcsv($out, ['Nombre', 'Teléfono', 'Asistirá', 'Personas', 'Pases asignados', 'Mensaje', 'Llegó', 'Fecha de respuesta'], ';');
    foreach ($rows as $r) {
        // Evita que Excel ejecute fórmulas escritas por invitados (=, +, -, @).
        $safe = fn($v) => preg_match('/^[=+\-@]/', (string) $v) ? "'" . $v : $v;
        fputcsv($out, [
            $safe($r['name']), $safe($r['phone']), (int) $r['attending'] === 1 ? 'Sí' : 'No', (int) $r['people'],
            $r['passes'] !== null ? (int) $r['passes'] : '', $safe($r['message']),
            $r['checked_in_at'] ? 'Sí' : 'No', $r['updated_at'],
        ], ';');
    }
    fclose($out);
    exit;
}

$totals = ['responses' => count($rows), 'attending_people' => 0, 'declined' => 0, 'arrived_people' => 0];
foreach ($rows as $r) {
    $totals['attending_people'] += (int) $r['attending'] === 1 ? (int) $r['people'] : 0;
    $totals['declined'] += (int) $r['attending'] === 0 ? 1 : 0;
    $totals['arrived_people'] += $r['checked_in_at'] ? (int) $r['people'] : 0;
}
mm_json(['rsvps' => $rows, 'totals' => $totals]);
