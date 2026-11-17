<?php
// Panel: moderación de las fotos que suben los invitados (admin y cliente dueño del evento).
//   GET ?invitation_id=N                       -> fotos (pendientes primero) y conteo de pendientes
//   POST {action:"approve", id}                -> se publica en la galería y en la pantalla en vivo
//   POST {action:"reject", id}                 -> se borra la foto (registro y archivo)
//   POST {action:"approve_all", invitation_id} -> publica todas las pendientes
define('MM_APP', true);
require dirname(__DIR__, 2) . '/_mm/bootstrap.php';
require dirname(__DIR__, 2) . '/_mm/invitations.php';

mm_same_origin();
$user = mm_require_user();
$db = mm_db();

if (mm_method() === 'GET') {
    $inv = mm_require_invitation($user, (int) ($_GET['invitation_id'] ?? 0));
    $stmt = $db->prepare('SELECT id, uploader_name, file_path, approved, created_at FROM guest_photos
                          WHERE invitation_id = ? ORDER BY approved ASC, id DESC LIMIT 600');
    $stmt->execute([$inv['id']]);
    $rows = array_map(function ($r) {
        $r['id'] = (int) $r['id'];
        $r['approved'] = (int) $r['approved'] === 1;
        return $r;
    }, $stmt->fetchAll());
    $pending = count(array_filter($rows, fn($r) => !$r['approved']));
    mm_json(['photos' => $rows, 'pending' => $pending]);
}

if (mm_method() !== 'POST') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}

$in = mm_input();
$action = $in['action'] ?? '';

if ($action === 'approve_all') {
    $inv = mm_require_invitation($user, (int) ($in['invitation_id'] ?? 0));
    $stmt = $db->prepare('UPDATE guest_photos SET approved = 1 WHERE invitation_id = ? AND approved = 0');
    $stmt->execute([$inv['id']]);
    mm_json(['status' => 'success', 'approved' => $stmt->rowCount()]);
}

$stmt = $db->prepare('SELECT id, invitation_id, file_path FROM guest_photos WHERE id = ?');
$stmt->execute([(int) ($in['id'] ?? 0)]);
$photo = $stmt->fetch();
if (!$photo) {
    mm_json(['status' => 'error', 'message' => 'Foto no encontrada'], 404);
}
mm_require_invitation($user, (int) $photo['invitation_id']); // corta si no es su evento

switch ($action) {
    case 'approve':
        $db->prepare('UPDATE guest_photos SET approved = 1 WHERE id = ?')->execute([$photo['id']]);
        mm_json(['status' => 'success']);

    case 'reject':
        $db->prepare('DELETE FROM guest_photos WHERE id = ?')->execute([$photo['id']]);
        // Borramos el archivo solo si de verdad está dentro de /uploads/eventos/ (nunca fuera).
        $root = realpath(dirname(__DIR__, 2) . '/uploads/eventos');
        $file = realpath(dirname(__DIR__, 2) . (string) $photo['file_path']);
        if ($root && $file && str_starts_with($file, $root . DIRECTORY_SEPARATOR) && is_file($file)) {
            @unlink($file);
        }
        mm_json(['status' => 'success']);

    default:
        mm_json(['status' => 'error', 'message' => 'Acción no válida'], 400);
}
