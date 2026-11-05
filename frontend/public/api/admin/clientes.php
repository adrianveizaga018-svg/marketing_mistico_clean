<?php
// Panel (solo admin): cuentas de clientes con acceso limitado a su evento.
//   GET                                        -> lista
//   POST {action:"create", name, email, password}
//   POST {action:"set_password", id, password}
//   POST {action:"toggle", id, active}
// Para dar acceso a un evento: editar la invitación con owner_id = id del cliente.
define('MM_APP', true);
require dirname(__DIR__, 2) . '/_mm/bootstrap.php';

mm_same_origin();
$user = mm_require_user();
if ($user['role'] !== 'admin') {
    mm_json(['status' => 'error', 'message' => 'Solo el administrador'], 403);
}
$db = mm_db();

if (mm_method() === 'GET') {
    mm_json($db->query("SELECT id, name, email, active, created_at FROM users WHERE role = 'client' ORDER BY name")->fetchAll());
}

$in = mm_input();
$password = (string) ($in['password'] ?? '');
$checkPassword = function () use ($password): void {
    if (strlen($password) < 8) {
        mm_json(['status' => 'error', 'message' => 'La contraseña debe tener al menos 8 caracteres'], 422);
    }
};

switch ($in['action'] ?? '') {
    case 'create':
        $email = strtolower(mm_text($in['email'] ?? '', 160));
        $name = mm_text($in['name'] ?? '', 120);
        if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            mm_json(['status' => 'error', 'message' => 'Nombre y email válidos son obligatorios'], 422);
        }
        $checkPassword();
        try {
            $db->prepare("INSERT INTO users (name, email, password_hash, role, active, created_at) VALUES (?, ?, ?, 'client', 1, ?)")
                ->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), mm_now()]);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000') { // email repetido
                mm_json(['status' => 'error', 'message' => 'Ya existe un cliente con ese email'], 409);
            }
            error_log('clientes.php: ' . $e->getMessage());
            mm_json(['status' => 'error', 'message' => 'No se pudo crear el cliente'], 500);
        }
        mm_json(['status' => 'success', 'id' => (int) $db->lastInsertId()], 201);

    case 'set_password':
        $checkPassword();
        $db->prepare("UPDATE users SET password_hash = ? WHERE id = ? AND role = 'client'")
            ->execute([password_hash($password, PASSWORD_DEFAULT), (int) ($in['id'] ?? 0)]);
        mm_json(['status' => 'success']);

    case 'toggle':
        $db->prepare("UPDATE users SET active = ? WHERE id = ? AND role = 'client'")
            ->execute([!empty($in['active']) ? 1 : 0, (int) ($in['id'] ?? 0)]);
        mm_json(['status' => 'success']);

    default:
        mm_json(['status' => 'error', 'message' => 'Acción no válida'], 400);
}
