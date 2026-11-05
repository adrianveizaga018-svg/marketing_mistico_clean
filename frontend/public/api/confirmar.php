<?php
// Pública: confirmación de asistencia (RSVP).
//   POST {slug, t?, name?, attending, people, message?}
// Con código de invitado (t): el nombre viene de la lista y no puede pasar sus pases asignados.
// Sin código: solo si la invitación tiene link abierto.
define('MM_APP', true);
require dirname(__DIR__) . '/_mm/bootstrap.php';
require dirname(__DIR__) . '/_mm/invitations.php';

mm_same_origin();
if (mm_method() === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
if (mm_method() !== 'POST') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}
if (mm_rate_limit_hit('rsvp|' . mm_client_ip(), 30, 900)) {
    mm_json(['status' => 'error', 'message' => 'Demasiados intentos, espera unos minutos'], 429);
}

$in = mm_input();
$db = mm_db();

$stmt = $db->prepare('SELECT * FROM invitations WHERE slug = ? AND active = 1');
$stmt->execute([mm_text($in['slug'] ?? '', 90)]);
$inv = $stmt->fetch();
if (!$inv) {
    mm_json(['status' => 'error', 'message' => 'Invitación no encontrada'], 404);
}
if (mm_deadline_passed($inv)) {
    mm_json(['status' => 'error', 'message' => 'La fecha límite para confirmar ya pasó. Escribe al anfitrión.'], 409);
}

$attending = !empty($in['attending']);
$message = mm_text($in['message'] ?? '', 500) ?: null;
$token = mm_text($in['t'] ?? '', 16);
$now = mm_now();

if ($token !== '') {
    $stmt = $db->prepare('SELECT * FROM guests WHERE token = ? AND invitation_id = ?');
    $stmt->execute([$token, $inv['id']]);
    $guest = $stmt->fetch();
    if (!$guest) {
        mm_json(['status' => 'error', 'message' => 'Invitación no encontrada'], 404);
    }
    $passes = (int) $guest['passes'];
    $people = $attending ? mm_int($in['people'] ?? 1, 1, $passes, 1) : 0;
    if ($attending && (int) ($in['people'] ?? 1) > $passes) {
        mm_json(['status' => 'error', 'message' => "Tu invitación es válida para $passes " . ($passes === 1 ? 'persona' : 'personas') . '.'], 422);
    }

    $stmt = $db->prepare('SELECT id, pass_code, checked_in_at FROM rsvps WHERE guest_id = ?');
    $stmt->execute([$guest['id']]);
    $existing = $stmt->fetch();
    if ($existing && $existing['checked_in_at']) {
        mm_json(['status' => 'error', 'message' => 'Esta invitación ya fue usada para ingresar al evento.'], 409);
    }
    if ($existing) {
        $db->prepare('UPDATE rsvps SET attending = ?, people = ?, message = ?, updated_at = ? WHERE id = ?')
            ->execute([$attending ? 1 : 0, $people, $message, $now, $existing['id']]);
        $passCode = $existing['pass_code'];
    } else {
        $passCode = mm_token(12);
        $db->prepare('INSERT INTO rsvps (invitation_id, guest_id, name, attending, people, message, pass_code, created_at, updated_at)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([$inv['id'], $guest['id'], $guest['name'], $attending ? 1 : 0, $people, $message, $passCode, $now, $now]);
    }
    $name = $guest['name'];
} else {
    if ((int) $inv['open_link'] !== 1) {
        mm_json(['status' => 'error', 'message' => 'Invitación no encontrada'], 404);
    }
    $name = mm_text($in['name'] ?? '', 120);
    if ($name === '') {
        mm_json(['status' => 'error', 'message' => 'Escribe tu nombre'], 422);
    }
    $people = $attending ? mm_int($in['people'] ?? 1, 1, 10, 1) : 0;
    $passCode = mm_token(12);
    $db->prepare('INSERT INTO rsvps (invitation_id, guest_id, name, attending, people, message, pass_code, created_at, updated_at)
                  VALUES (?, NULL, ?, ?, ?, ?, ?, ?, ?)')
        ->execute([$inv['id'], $name, $attending ? 1 : 0, $people, $message, $passCode, $now, $now]);
}

mm_json([
    'status' => 'success',
    'name' => $name,
    'attending' => $attending,
    'people' => $people,
    // El código del pase (para el QR de entrada) solo existe si asistirá.
    'pass_code' => $attending ? $passCode : null,
]);
