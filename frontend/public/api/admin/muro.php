<?php
// Panel: moderación del muro de dedicatorias (admin y cliente dueño del evento).
//   GET ?invitation_id=N                       -> mensajes (pendientes primero) y conteo de pendientes
//   POST {action:"approve", id}                -> se publica en la invitación y en la pantalla en vivo
//   POST {action:"reject", id}                 -> se borra
//   POST {action:"approve_all", invitation_id} -> publica todos los pendientes (útil el día del evento)
define('MM_APP', true);
require dirname(__DIR__, 2) . '/_mm/bootstrap.php';
require dirname(__DIR__, 2) . '/_mm/invitations.php';

mm_same_origin();
$user = mm_require_user();
$db = mm_db();

if (mm_method() === 'GET') {
    $inv = mm_require_invitation($user, (int) ($_GET['invitation_id'] ?? 0));
    $stmt = $db->prepare('SELECT id, author_name, message, approved, created_at FROM wall_messages
                          WHERE invitation_id = ? ORDER BY approved ASC, id DESC LIMIT 500');
    $stmt->execute([$inv['id']]);
    $rows = array_map(function ($r) {
        $r['id'] = (int) $r['id'];
        $r['approved'] = (int) $r['approved'] === 1;
        return $r;
    }, $stmt->fetchAll());
    $pending = count(array_filter($rows, fn($r) => !$r['approved']));
    mm_json(['messages' => $rows, 'pending' => $pending]);
}

if (mm_method() !== 'POST') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}

$in = mm_input();
$action = $in['action'] ?? '';

if ($action === 'approve_all') {
    $inv = mm_require_invitation($user, (int) ($in['invitation_id'] ?? 0));
    $stmt = $db->prepare('UPDATE wall_messages SET approved = 1 WHERE invitation_id = ? AND approved = 0');
    $stmt->execute([$inv['id']]);
    mm_json(['status' => 'success', 'approved' => $stmt->rowCount()]);
}

// Acciones sobre un mensaje: primero comprobamos que sea de un evento de este usuario.
$stmt = $db->prepare('SELECT id, invitation_id FROM wall_messages WHERE id = ?');
$stmt->execute([(int) ($in['id'] ?? 0)]);
$msg = $stmt->fetch();
if (!$msg) {
    mm_json(['status' => 'error', 'message' => 'Mensaje no encontrado'], 404);
}
mm_require_invitation($user, (int) $msg['invitation_id']);

switch ($action) {
    case 'approve':
        $db->prepare('UPDATE wall_messages SET approved = 1 WHERE id = ?')->execute([$msg['id']]);
        mm_json(['status' => 'success']);

    case 'reject':
        $db->prepare('DELETE FROM wall_messages WHERE id = ?')->execute([$msg['id']]);
        mm_json(['status' => 'success']);

    default:
        mm_json(['status' => 'error', 'message' => 'Acción no válida'], 400);
}
