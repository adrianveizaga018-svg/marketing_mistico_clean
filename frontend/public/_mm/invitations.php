<?php
// Lógica compartida de invitaciones: datos públicos, estados de invitados y links.

if (!defined('MM_APP')) {
    http_response_code(403);
    exit;
}

const MM_TEMPLATES = ['boda', 'quince', 'cumple'];
const MM_EVENT_TYPES = ['boda', 'quinceanero', 'cumpleanos', 'bautizo', 'graduacion', 'fiesta', 'otro'];
// Campos que el panel puede editar (los demás los maneja el sistema).
const MM_INVITATION_FIELDS = [
    'template', 'event_type', 'title', 'honorees', 'message', 'event_at', 'venue', 'address', 'maps_url',
    'dress_code', 'itinerary', 'cover_image', 'cover_video', 'gallery', 'music_url', 'gifts',
    'host_whatsapp', 'rsvp_deadline', 'open_link', 'active', 'owner_id',
];
const MM_JSON_FIELDS = ['itinerary', 'gallery', 'gifts'];

function mm_site_url(): string
{
    return rtrim(mm_config()['site_url'] ?? 'https://marketingmistico.com', '/');
}

function mm_invitation_link(array $inv, ?array $guest = null): string
{
    return mm_site_url() . '/i/' . $inv['slug'] . ($guest ? '/' . $guest['token'] : '');
}

// Convierte un número boliviano de 8 dígitos al formato de WhatsApp (591XXXXXXXX).
function mm_wa_number(?string $phone): string
{
    $digits = preg_replace('/\D+/', '', (string) $phone);
    if (strlen($digits) === 8) {
        $digits = '591' . $digits;
    }
    return $digits;
}

function mm_guest_whatsapp(array $inv, array $guest): string
{
    $passes = (int) $guest['passes'];
    $text = "Hola {$guest['name']} 👋\n\nCon mucho cariño te invitamos a {$inv['title']}.\n"
        . 'Tu invitación es válida para ' . $passes . ($passes === 1 ? ' persona' : ' personas') . ".\n\n"
        . "Ábrela aquí y confirma tu asistencia:\n" . mm_invitation_link($inv, $guest);
    return 'https://wa.me/' . mm_wa_number($guest['phone'] ?? '') . '?text=' . rawurlencode($text);
}

function mm_guest_status(array $guest, ?array $rsvp): string
{
    if ($rsvp && $rsvp['checked_in_at']) {
        return 'llego';
    }
    if ($rsvp && (int) $rsvp['attending'] === 1) {
        return 'confirmo';
    }
    if ($rsvp && (int) $rsvp['attending'] === 0) {
        return 'no_asistira';
    }
    if (!empty($guest['opened_at'])) {
        return 'abrio';
    }
    if (!empty($guest['sent_at'])) {
        return 'enviado';
    }
    return 'no_enviado';
}

function mm_decode_json_fields(array $inv): array
{
    foreach (MM_JSON_FIELDS as $f) {
        $inv[$f] = isset($inv[$f]) && $inv[$f] !== '' ? json_decode($inv[$f], true) : null;
    }
    return $inv;
}

function mm_deadline_passed(array $inv): bool
{
    return !empty($inv['rsvp_deadline']) && strtotime($inv['rsvp_deadline']) < time();
}

// Solo lo que un invitado puede ver: nada de teléfonos de otros, ids internos ni datos del panel.
function mm_public_invitation(array $inv): array
{
    $inv = mm_decode_json_fields($inv);
    return [
        'slug' => $inv['slug'],
        'template' => $inv['template'],
        'event_type' => $inv['event_type'],
        'title' => $inv['title'],
        'honorees' => $inv['honorees'],
        'message' => $inv['message'],
        'event_at' => $inv['event_at'],
        'venue' => $inv['venue'],
        'address' => $inv['address'],
        'maps_url' => $inv['maps_url'],
        'dress_code' => $inv['dress_code'],
        'itinerary' => $inv['itinerary'] ?: [],
        'cover_image' => $inv['cover_image'],
        'cover_video' => $inv['cover_video'],
        'gallery' => $inv['gallery'] ?: [],
        'music_url' => $inv['music_url'],
        'gifts' => $inv['gifts'],
        'host_whatsapp' => $inv['host_whatsapp'] ? mm_wa_number($inv['host_whatsapp']) : null,
        'rsvp_deadline' => $inv['rsvp_deadline'],
        'deadline_passed' => mm_deadline_passed($inv),
    ];
}

// Limpia y valida los datos que llegan del panel para crear/editar una invitación.
function mm_invitation_payload(array $in, bool $partial): array
{
    $data = [];
    foreach (MM_INVITATION_FIELDS as $field) {
        if (!array_key_exists($field, $in)) {
            continue;
        }
        $value = $in[$field];
        switch ($field) {
            case 'template':
                $data[$field] = in_array($value, MM_TEMPLATES, true) ? $value : 'boda';
                break;
            case 'event_type':
                $data[$field] = in_array($value, MM_EVENT_TYPES, true) ? $value : 'otro';
                break;
            case 'event_at':
            case 'rsvp_deadline':
                $ts = $value ? strtotime((string) $value) : false;
                $data[$field] = $ts ? date('Y-m-d H:i:s', $ts) : null;
                break;
            case 'open_link':
            case 'active':
                $data[$field] = $value ? 1 : 0;
                break;
            case 'owner_id':
                $data[$field] = $value ? (int) $value : null;
                break;
            case 'maps_url':
            case 'cover_image':
            case 'cover_video':
            case 'music_url':
                $v = mm_text($value, 500);
                $data[$field] = ($v === '' || preg_match('#^(https?://|/)#', $v)) ? ($v ?: null) : null;
                break;
            case 'itinerary':
            case 'gallery':
            case 'gifts':
                $data[$field] = $value ? json_encode($value, JSON_UNESCAPED_UNICODE) : null;
                break;
            case 'message':
                $data[$field] = mm_text($value, 2000) ?: null;
                break;
            default:
                $data[$field] = mm_text($value, 255) ?: null;
        }
    }
    if (!$partial) {
        foreach (['title', 'honorees', 'event_at'] as $required) {
            if (empty($data[$required])) {
                mm_json(['status' => 'error', 'message' => "Falta el campo: $required"], 422);
            }
        }
    }
    return $data;
}

function mm_slugify(string $text): string
{
    $text = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text) ?: $text;
    $text = strtolower(preg_replace('/[^A-Za-z0-9]+/', '-', $text));
    return trim(substr($text, 0, 60), '-') ?: 'evento';
}
