<?php
// API para fotos de invitados (Galería en vivo) y muro de dedicatorias
//   GET ?action=photos&invitation_id=N          -> fotos aprobadas
//   GET ?action=wall&invitation_id=N            -> mensajes del muro
//   POST {action:"upload_photo", invitation_id, uploader_name, image_base64}
//   POST {action:"post_message", invitation_id, author_name, message}

define('MM_APP', true);
require dirname(__DIR__, 2) . '/_mm/bootstrap.php';
require dirname(__DIR__, 2) . '/_mm/invitations.php';

mm_same_origin();
$db = mm_db();
$now = mm_now();

if (mm_method() === 'GET') {
    $action = $_GET['action'] ?? 'photos';
    $invitationId = (int) ($_GET['invitation_id'] ?? 0);
    
    if ($action === 'photos') {
        $stmt = $db->prepare('SELECT id, uploader_name, file_path, created_at FROM guest_photos WHERE invitation_id = ? AND approved = 1 ORDER BY id DESC LIMIT 50');
        $stmt->execute([$invitationId]);
        mm_json($stmt->fetchAll());
    }

    if ($action === 'wall') {
        $stmt = $db->prepare('SELECT id, author_name, message, created_at FROM wall_messages WHERE invitation_id = ? AND approved = 1 ORDER BY id DESC LIMIT 50');
        $stmt->execute([$invitationId]);
        mm_json($stmt->fetchAll());
    }

    mm_json(['status' => 'error', 'message' => 'Acción no válida'], 400);
}

if (mm_method() === 'POST') {
    $in = mm_input();
    $action = $in['action'] ?? '';
    $invId = (int) ($in['invitation_id'] ?? 0);

    if ($action === 'post_message') {
        $name = mm_text($in['author_name'] ?? '', 120);
        $msg = mm_text($in['message'] ?? '', 500);

        if ($name === '' || $msg === '') {
            mm_json(['status' => 'error', 'message' => 'Nombre y mensaje son obligatorios'], 422);
        }

        $stmt = $db->prepare('INSERT INTO wall_messages (invitation_id, author_name, message, approved, created_at) VALUES (?, ?, ?, 1, ?)');
        $stmt->execute([$invId, $name, $msg, $now]);

        mm_json([
            'status' => 'ok',
            'id' => (int) $db->lastInsertId(),
            'author_name' => $name,
            'message' => $msg,
            'created_at' => $now,
        ], 201);
    }

    if ($action === 'upload_photo') {
        $name = mm_text($in['uploader_name'] ?? 'Invitado', 120);
        $base64 = (string) ($in['image_base64'] ?? '');

        if (!preg_match('#^data:image/(jpeg|png|webp);base64,#', $base64, $m)) {
            mm_json(['status' => 'error', 'message' => 'Formato de imagen no válido'], 422);
        }

        $ext = $m[1] === 'jpeg' ? 'jpg' : $m[1];
        $binary = base64_decode(substr($base64, strpos($base64, ',') + 1));
        if (strlen($binary) > 5 * 1024 * 1024) { // Max 5MB
            mm_json(['status' => 'error', 'message' => 'La imagen supera los 5MB'], 413);
        }

        $uploadDir = dirname(__DIR__, 2) . '/public/uploads/eventos/' . $invId;
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = 'foto_' . time() . '_' . strtolower(mm_token(6)) . '.' . $ext;
        $filePath = $uploadDir . '/' . $filename;
        file_put_contents($filePath, $binary);

        $webPath = '/uploads/eventos/' . $invId . '/' . $filename;

        $stmt = $db->prepare('INSERT INTO guest_photos (invitation_id, uploader_name, file_path, approved, created_at) VALUES (?, ?, ?, 1, ?)');
        $stmt->execute([$invId, $name, $webPath, $now]);

        mm_json([
            'status' => 'ok',
            'id' => (int) $db->lastInsertId(),
            'file_path' => $webPath,
            'uploader_name' => $name,
            'created_at' => $now,
        ], 201);
    }

    mm_json(['status' => 'error', 'message' => 'Acción no permitida'], 400);
}
