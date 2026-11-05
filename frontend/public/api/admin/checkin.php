<?php
// Panel: check-in en la puerta. El celular escanea el QR del pase y envía su código.
//   POST {code, invitation_id}
define('MM_APP', true);
require dirname(__DIR__, 2) . '/_mm/bootstrap.php';
require dirname(__DIR__, 2) . '/_mm/invitations.php';

mm_same_origin();
$user = mm_require_user();
if (mm_method() !== 'POST') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}

$in = mm_input();
$inv = mm_require_invitation($user, (int) ($in['invitation_id'] ?? 0));
// El QR puede traer el link completo del pase o solo el código.
$code = mm_text($in['code'] ?? '', 300);
if (preg_match('#([A-Za-z0-9]{12})/?$#', $code, $m)) {
    $code = $m[1];
}

$db = mm_db();
$stmt = $db->prepare('SELECT r.*, g.passes FROM rsvps r LEFT JOIN guests g ON g.id = r.guest_id WHERE r.pass_code = ? AND r.invitation_id = ?');
$stmt->execute([$code, $inv['id']]);
$rsvp = $stmt->fetch();

if (!$rsvp) {
    mm_json(['status' => 'invalid', 'message' => 'Pase no válido para este evento'], 404);
}
if ((int) $rsvp['attending'] !== 1) {
    mm_json(['status' => 'declined', 'message' => $rsvp['name'] . ' respondió que no asistiría', 'name' => $rsvp['name']], 409);
}
if ($rsvp['checked_in_at']) {
    mm_json([
        'status' => 'already',
        'message' => 'Este pase ya ingresó a las ' . date('H:i', strtotime($rsvp['checked_in_at'])),
        'name' => $rsvp['name'],
        'people' => (int) $rsvp['people'],
    ], 409);
}

$db->prepare('UPDATE rsvps SET checked_in_at = ? WHERE id = ?')->execute([mm_now(), $rsvp['id']]);
mm_json([
    'status' => 'ok',
    'message' => '¡Bienvenido!',
    'name' => $rsvp['name'],
    'people' => (int) $rsvp['people'],
]);
