<?php
// Panel: invitados de una invitación (lo usan tú y el cliente dueño del evento).
//   GET ?invitation_id=N                          -> invitados con estado, link, WhatsApp y totales
//   POST {action:"add", invitation_id, name, phone?, passes}
//   POST {action:"import", invitation_id, csv}    -> columnas: nombre, teléfono, pases (separador , o ;)
//   POST {action:"update", id, name?, phone?, passes?}
//   POST {action:"delete", id}
//   POST {action:"mark_sent", id}                 -> al tocar "Enviar por WhatsApp"
define('MM_APP', true);
require dirname(__DIR__, 2) . '/_mm/bootstrap.php';
require dirname(__DIR__, 2) . '/_mm/invitations.php';

mm_same_origin();
$user = mm_require_user();
$db = mm_db();
$now = mm_now();

$loadGuest = function (int $id) use ($db, $user): array {
    $stmt = $db->prepare('SELECT * FROM guests WHERE id = ?');
    $stmt->execute([$id]);
    $guest = $stmt->fetch();
    if (!$guest) {
        mm_json(['status' => 'error', 'message' => 'Invitado no encontrado'], 404);
    }
    mm_require_invitation($user, (int) $guest['invitation_id']); // corta si no es su evento
    return $guest;
};

$addGuest = function (array $inv, string $name, ?string $phone, int $passes) use ($db, $now): void {
    $db->prepare('INSERT INTO guests (invitation_id, name, phone, passes, token, created_at) VALUES (?, ?, ?, ?, ?, ?)')
        ->execute([$inv['id'], $name, $phone ?: null, $passes, mm_token(10), $now]);
};

if (mm_method() === 'GET') {
    $inv = mm_require_invitation($user, (int) ($_GET['invitation_id'] ?? 0));
    $stmt = $db->prepare('SELECT g.*, r.attending, r.people, r.message AS rsvp_message, r.checked_in_at, r.pass_code
                          FROM guests g LEFT JOIN rsvps r ON r.guest_id = g.id
                          WHERE g.invitation_id = ? ORDER BY g.name');
    $stmt->execute([$inv['id']]);
    $totals = ['guests' => 0, 'passes' => 0, 'confirmed' => 0, 'declined' => 0, 'arrived' => 0];
    $guests = [];
    foreach ($stmt->fetchAll() as $row) {
        $rsvp = $row['attending'] !== null ? $row : null;
        $status = mm_guest_status($row, $rsvp);
        $totals['guests']++;
        $totals['passes'] += (int) $row['passes'];
        $totals['confirmed'] += $rsvp && (int) $row['attending'] === 1 ? (int) $row['people'] : 0;
        $totals['declined'] += $status === 'no_asistira' ? 1 : 0;
        $totals['arrived'] += $status === 'llego' ? (int) $row['people'] : 0;
        $guests[] = [
            'id' => (int) $row['id'],
            'name' => $row['name'],
            'phone' => $row['phone'],
            'passes' => (int) $row['passes'],
            'status' => $status,
            'people' => $rsvp ? (int) $row['people'] : null,
            'message' => $rsvp ? $row['rsvp_message'] : null,
            'link' => mm_invitation_link($inv, $row),
            'whatsapp' => mm_guest_whatsapp($inv, $row),
        ];
    }
    mm_json(['guests' => $guests, 'totals' => $totals]);
}

if (mm_method() !== 'POST') {
    mm_json(['status' => 'error', 'message' => 'Método no permitido'], 405);
}

$in = mm_input();
switch ($in['action'] ?? '') {
    case 'add':
        $inv = mm_require_invitation($user, (int) ($in['invitation_id'] ?? 0));
        $name = mm_text($in['name'] ?? '', 120);
        if ($name === '') {
            mm_json(['status' => 'error', 'message' => 'Escribe el nombre del invitado'], 422);
        }
        $addGuest($inv, $name, mm_text($in['phone'] ?? '', 30), mm_int($in['passes'] ?? 1, 1, 20, 1));
        mm_json(['status' => 'success'], 201);

    case 'import':
        $inv = mm_require_invitation($user, (int) ($in['invitation_id'] ?? 0));
        $lines = preg_split('/\r\n|\r|\n/', (string) ($in['csv'] ?? ''));
        $added = 0;
        $skipped = [];
        foreach ($lines as $n => $line) {
            if (trim($line) === '') {
                continue;
            }
            $cols = str_getcsv($line, substr_count($line, ';') > substr_count($line, ',') ? ';' : ',');
            $name = mm_text($cols[0] ?? '', 120);
            if ($name === '' || ($n === 0 && preg_match('/^nombre$/i', $name))) {
                continue; // fila vacía o encabezado
            }
            if (count($lines) > 2000 || $added >= 1000) {
                $skipped[] = $n + 1;
                continue;
            }
            $addGuest($inv, $name, mm_text($cols[1] ?? '', 30), mm_int($cols[2] ?? 1, 1, 20, 1));
            $added++;
        }
        mm_json(['status' => 'success', 'added' => $added, 'skipped_lines' => $skipped]);

    case 'update':
        $guest = $loadGuest((int) ($in['id'] ?? 0));
        $name = array_key_exists('name', $in) ? mm_text($in['name'], 120) : $guest['name'];
        $phone = array_key_exists('phone', $in) ? (mm_text($in['phone'], 30) ?: null) : $guest['phone'];
        $passes = array_key_exists('passes', $in) ? mm_int($in['passes'], 1, 20, 1) : (int) $guest['passes'];
        $db->prepare('UPDATE guests SET name = ?, phone = ?, passes = ? WHERE id = ?')
            ->execute([$name ?: $guest['name'], $phone, $passes, $guest['id']]);
        mm_json(['status' => 'success']);

    case 'delete':
        $guest = $loadGuest((int) ($in['id'] ?? 0));
        $db->prepare('DELETE FROM rsvps WHERE guest_id = ?')->execute([$guest['id']]);
        $db->prepare('DELETE FROM guests WHERE id = ?')->execute([$guest['id']]);
        mm_json(['status' => 'success']);

    case 'mark_sent':
        $guest = $loadGuest((int) ($in['id'] ?? 0));
        if (empty($guest['sent_at'])) {
            $db->prepare('UPDATE guests SET sent_at = ? WHERE id = ?')->execute([$now, $guest['id']]);
        }
        mm_json(['status' => 'success']);

    default:
        mm_json(['status' => 'error', 'message' => 'Acción no válida'], 400);
}
