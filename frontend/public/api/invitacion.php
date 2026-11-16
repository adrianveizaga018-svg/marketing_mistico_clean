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
    if ($slug === 'demo-boda') {
        $inv = [
            'id' => 9991, 'slug' => 'demo-boda', 'template' => 'boda', 'event_type' => 'boda',
            'title' => '¡Nuestra Boda! Acompáñanos a celebrar nuestro gran amor',
            'honorees' => 'Ana & Luis',
            'message' => 'Hay momentos en la vida que son inolvidables, y compartirlos con las personas que más queremos los hace eternos. ¡Los esperamos para brindar y bailar toda la noche!',
            'event_at' => '2026-12-18 18:30:00',
            'venue' => 'Salón Real Magnolia',
            'address' => 'Av. Arequipa #450, Calacoto, La Paz',
            'maps_url' => 'https://maps.google.com',
            'dress_code' => 'Formal / Traje Oscuro y Vestido Largo',
            'itinerary' => json_encode([['time' => '18:30', 'activity' => 'Ceremonia Religiosa'], ['time' => '20:00', 'activity' => 'Recepción y Brindis'], ['time' => '21:30', 'activity' => 'Cena'], ['time' => '23:00', 'activity' => 'Fiesta y Baile']]),
            'cover_image' => '/img/inv-boda.webp',
            'music_url' => '',
            'gifts' => json_encode([
                'notes' => 'El mejor regalo es tu presencia y cariño, pero si deseas hacernos un presente en efectivo digital, puedes utilizar nuestros QRs bancarios.',
                'qrs' => [['name' => 'Simple / BNB', 'image' => '/img/inv-boda.webp', 'holder' => 'Ana Silva']],
                'banks' => [['bank' => 'Banco Nacional de Bolivia (BNB)', 'account' => '150-0892716', 'holder' => 'Ana Silva', 'type' => 'Caja de Ahorros']],
            ]),
            'open_link' => 1, 'active' => 1, 'rsvp_deadline' => '2026-12-10 23:59:00', 'host_whatsapp' => '59170000000',
        ];
    } elseif ($slug === 'demo-quince') {
        $inv = [
            'id' => 9992, 'slug' => 'demo-quince', 'template' => 'quince', 'event_type' => 'quinceanero',
            'title' => 'Mis XV Años · Una noche de magia y celebración',
            'honorees' => 'Valentina',
            'message' => 'Llegó el momento más soñado de mi vida. Quiero celebrar junto a mis amigos y familia una noche inolvidable llena de música y alegría.',
            'event_at' => '2026-11-28 19:00:00',
            'venue' => 'Centro de Convenciones Las Palmas',
            'address' => 'Av. Ballivián #1200, La Paz',
            'maps_url' => 'https://maps.google.com',
            'dress_code' => 'Gala / Juvenil',
            'cover_image' => '/img/inv-quince.webp',
            'gifts' => json_encode(['notes' => 'Lluvia de sobres o regalo digital QR Simple']),
            'open_link' => 1, 'active' => 1, 'rsvp_deadline' => '2026-11-20 23:59:00', 'host_whatsapp' => '59170000000',
        ];
    } elseif ($slug === 'demo-cumple') {
        $inv = [
            'id' => 9993, 'slug' => 'demo-cumple', 'template' => 'cumple', 'event_type' => 'cumpleanos',
            'title' => '¡Mateo cumple 5 años! 🚀 Aventura Espacial',
            'honorees' => 'Mateo',
            'message' => '¡Te invito a mi fiesta de cumpleaños! Habrá juegos, piñata, sorpresas y mucha diversión.',
            'event_at' => '2026-11-21 15:00:00',
            'venue' => 'Parque Mágico de Juegos',
            'address' => 'Calle 15 de Calacoto #80, La Paz',
            'maps_url' => 'https://maps.google.com',
            'dress_code' => 'Cómodo para jugar',
            'cover_image' => '/img/inv-cumple.webp',
            'open_link' => 1, 'active' => 1, 'rsvp_deadline' => '2026-11-18 20:00:00', 'host_whatsapp' => '59170000000',
        ];
    } else {
        $notFound();
    }
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
