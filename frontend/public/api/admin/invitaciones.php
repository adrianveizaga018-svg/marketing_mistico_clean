<?php
// Panel: invitaciones.
//   GET                                   -> lista (admin: todas; cliente: las suyas) con totales
//   GET ?id=N                             -> una invitación completa
//   POST {action:"create", ...}           -> crear (solo admin)
//   POST {action:"update", id, ...}       -> editar (solo admin)
//   POST {action:"duplicate", id}         -> duplicar sin invitados (solo admin)
//   POST {action:"toggle", id, active}    -> activar / desactivar (solo admin)
define('MM_APP', true);
require dirname(__DIR__, 2) . '/_mm/bootstrap.php';
require dirname(__DIR__, 2) . '/_mm/invitations.php';

mm_same_origin();
$user = mm_require_user();
$db = mm_db();
$isAdmin = $user['role'] === 'admin';

$withTotals = function (array $inv) use ($db): array {
    $g = $db->prepare('SELECT COUNT(*) AS guests, COALESCE(SUM(passes), 0) AS passes FROM guests WHERE invitation_id = ?');
    $g->execute([$inv['id']]);
    $r = $db->prepare('SELECT COALESCE(SUM(CASE WHEN attending = 1 THEN people ELSE 0 END), 0) AS confirmed,
                              COALESCE(SUM(CASE WHEN checked_in_at IS NOT NULL THEN people ELSE 0 END), 0) AS arrived
                       FROM rsvps WHERE invitation_id = ?');
    $r->execute([$inv['id']]);
    $inv = mm_decode_json_fields($inv);
    $inv['link'] = mm_invitation_link($inv);
    $inv['totals'] = array_map('intval', $g->fetch() + $r->fetch());
    return $inv;
};

if (mm_method() === 'GET') {
    if (isset($_GET['id'])) {
        mm_json($withTotals(mm_require_invitation($user, (int) $_GET['id'])));
    }
    if ($isAdmin) {
        $rows = $db->query('SELECT * FROM invitations ORDER BY event_at DESC')->fetchAll();
    } else {
        $stmt = $db->prepare('SELECT * FROM invitations WHERE owner_id = ? ORDER BY event_at DESC');
        $stmt->execute([$user['id']]);
        $rows = $stmt->fetchAll();
    }
    mm_json(array_map($withTotals, $rows));
}

if (mm_method() !== 'POST') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}
if (!$isAdmin) {
    mm_json(['status' => 'error', 'message' => 'Solo el administrador puede editar invitaciones'], 403);
}

$in = mm_input();
$action = $in['action'] ?? '';
$now = mm_now();

$insert = function (array $data) use ($db, $now): int {
    $data['created_at'] = $now;
    $data['updated_at'] = $now;
    $cols = array_keys($data);
    $sql = 'INSERT INTO invitations (' . implode(', ', $cols) . ') VALUES (' . implode(', ', array_fill(0, count($cols), '?')) . ')';
    $db->prepare($sql)->execute(array_values($data));
    return (int) $db->lastInsertId();
};

switch ($action) {
    case 'create':
        $data = mm_invitation_payload($in, false);
        // El slug lleva un final aleatorio para que nadie pueda adivinar eventos ajenos.
        $data['slug'] = mm_slugify($in['slug'] ?? $data['honorees']) . '-' . strtolower(mm_token(4));
        $id = $insert($data);
        mm_json($withTotals(mm_require_invitation($user, $id)), 201);

    case 'update':
        $inv = mm_require_invitation($user, (int) ($in['id'] ?? 0));
        $data = mm_invitation_payload($in, true);
        if ($data) {
            $data['updated_at'] = $now;
            $sets = implode(', ', array_map(fn($c) => "$c = ?", array_keys($data)));
            $db->prepare("UPDATE invitations SET $sets WHERE id = ?")->execute([...array_values($data), $inv['id']]);
        }
        mm_json($withTotals(mm_require_invitation($user, (int) $inv['id'])));

    case 'duplicate':
        $inv = mm_require_invitation($user, (int) ($in['id'] ?? 0));
        $copy = array_intersect_key($inv, array_flip(MM_INVITATION_FIELDS));
        $copy['title'] = mb_substr('Copia de ' . $inv['title'], 0, 160);
        $copy['active'] = 0;
        $copy['slug'] = mm_slugify($inv['honorees']) . '-' . strtolower(mm_token(4));
        $id = $insert($copy);
        mm_json($withTotals(mm_require_invitation($user, $id)), 201);

    case 'toggle':
        $inv = mm_require_invitation($user, (int) ($in['id'] ?? 0));
        $db->prepare('UPDATE invitations SET active = ?, updated_at = ? WHERE id = ?')
            ->execute([!empty($in['active']) ? 1 : 0, $now, $inv['id']]);
        mm_json($withTotals(mm_require_invitation($user, (int) $inv['id'])));

    default:
        mm_json(['status' => 'error', 'message' => 'Acción no válida'], 400);
}
