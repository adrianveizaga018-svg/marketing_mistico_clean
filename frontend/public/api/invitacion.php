<?php
// Pública: datos de una invitación para mostrarla.
//   GET ?slug=boda-ana-y-luis-x7k2            -> link abierto (solo si la invitación lo permite)
//   GET ?slug=boda-ana-y-luis-x7k2&t=CODIGO   -> invitación personal del invitado
define('MM_APP', true);
require dirname(__DIR__) . '/_mm/bootstrap.php';
require dirname(__DIR__) . '/_mm/invitations.php';

mm_same_origin();
if (mm_method() !== 'GET') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}

$slug = mm_text($_GET['slug'] ?? '', 90);
$token = mm_text($_GET['t'] ?? '', 16);
$notFound = fn() => mm_json(['status' => 'error', 'message' => 'Invitación no encontrada'], 404);

$stmt = mm_db()->prepare('SELECT * FROM invitations WHERE slug = ? AND active = 1');
$stmt->execute([$slug]);
$inv = $stmt->fetch();
if (!$inv) {
    $notFound();
}

$response = ['invitation' => mm_public_invitation($inv), 'guest' => null];

if ($token !== '') {
    $stmt = mm_db()->prepare('SELECT * FROM guests WHERE token = ? AND invitation_id = ?');
    $stmt->execute([$token, $inv['id']]);
    $guest = $stmt->fetch();
    if (!$guest) {
        $notFound();
    }
    if (empty($guest['opened_at'])) {
        mm_db()->prepare('UPDATE guests SET opened_at = ? WHERE id = ?')->execute([mm_now(), $guest['id']]);
    }
    $stmt = mm_db()->prepare('SELECT attending, people, message, pass_code FROM rsvps WHERE guest_id = ?');
    $stmt->execute([$guest['id']]);
    $rsvp = $stmt->fetch() ?: null;
    $response['guest'] = [
        'name' => $guest['name'],
        'passes' => (int) $guest['passes'],
        'rsvp' => $rsvp ? [
            'attending' => (bool) $rsvp['attending'],
            'people' => (int) $rsvp['people'],
            'message' => $rsvp['message'],
            'pass_code' => (int) $rsvp['attending'] === 1 ? $rsvp['pass_code'] : null,
        ] : null,
    ];
} elseif ((int) $inv['open_link'] !== 1) {
    // Evento privado: sin código de invitado no se muestra nada.
    $notFound();
}

mm_json($response);
