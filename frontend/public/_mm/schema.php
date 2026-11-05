<?php
// Esquema de la base de datos de invitaciones. Funciona en MySQL (Hostinger) y SQLite (pruebas).
// Para Hostinger se importa server/sql/invitaciones.sql desde phpMyAdmin.

if (!defined('MM_APP')) {
    http_response_code(403);
    exit;
}

function mm_schema(string $driver): array
{
    $mysql = $driver === 'mysql';
    $pk = $mysql ? 'INT UNSIGNED AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    $fk = $mysql ? 'INT UNSIGNED' : 'INTEGER';
    $engine = $mysql ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' : '';

    return [
        // Clientes con acceso limitado a SU evento (el admin se configura en mm_config.php).
        "CREATE TABLE IF NOT EXISTS users (
            id $pk,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(160) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(10) NOT NULL DEFAULT 'client',
            active TINYINT NOT NULL DEFAULT 1,
            created_at DATETIME NOT NULL
        )$engine",

        // Una invitación = un evento. Los textos largos opcionales se guardan como JSON en TEXT.
        "CREATE TABLE IF NOT EXISTS invitations (
            id $pk,
            slug VARCHAR(90) NOT NULL UNIQUE,
            owner_id $fk NULL,
            template VARCHAR(20) NOT NULL DEFAULT 'boda',
            event_type VARCHAR(30) NOT NULL DEFAULT 'boda',
            title VARCHAR(160) NOT NULL,
            honorees VARCHAR(160) NOT NULL,
            message TEXT NULL,
            event_at DATETIME NOT NULL,
            venue VARCHAR(160) NULL,
            address VARCHAR(255) NULL,
            maps_url VARCHAR(500) NULL,
            dress_code VARCHAR(160) NULL,
            itinerary TEXT NULL,
            cover_image VARCHAR(255) NULL,
            cover_video VARCHAR(255) NULL,
            gallery TEXT NULL,
            music_url VARCHAR(255) NULL,
            gifts TEXT NULL,
            host_whatsapp VARCHAR(20) NULL,
            rsvp_deadline DATETIME NULL,
            open_link TINYINT NOT NULL DEFAULT 0,
            active TINYINT NOT NULL DEFAULT 1,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )$engine",

        // Cada invitado tiene su propio link con un código aleatorio y sus pases asignados.
        "CREATE TABLE IF NOT EXISTS guests (
            id $pk,
            invitation_id $fk NOT NULL,
            name VARCHAR(120) NOT NULL,
            phone VARCHAR(30) NULL,
            passes TINYINT NOT NULL DEFAULT 1,
            token VARCHAR(16) NOT NULL UNIQUE,
            sent_at DATETIME NULL,
            opened_at DATETIME NULL,
            created_at DATETIME NOT NULL
        )$engine",

        // Confirmaciones. guest_id es NULL cuando confirman por el link abierto (sin invitado).
        "CREATE TABLE IF NOT EXISTS rsvps (
            id $pk,
            invitation_id $fk NOT NULL,
            guest_id $fk NULL UNIQUE,
            name VARCHAR(120) NOT NULL,
            attending TINYINT NOT NULL,
            people TINYINT NOT NULL DEFAULT 0,
            message TEXT NULL,
            pass_code VARCHAR(16) NOT NULL UNIQUE,
            checked_in_at DATETIME NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )$engine",

        $mysql ? 'CREATE INDEX idx_guests_inv ON guests (invitation_id)' : 'CREATE INDEX IF NOT EXISTS idx_guests_inv ON guests (invitation_id)',
        $mysql ? 'CREATE INDEX idx_rsvps_inv ON rsvps (invitation_id)' : 'CREATE INDEX IF NOT EXISTS idx_rsvps_inv ON rsvps (invitation_id)',
        $mysql ? 'CREATE INDEX idx_inv_owner ON invitations (owner_id)' : 'CREATE INDEX IF NOT EXISTS idx_inv_owner ON invitations (owner_id)',
    ];
}
