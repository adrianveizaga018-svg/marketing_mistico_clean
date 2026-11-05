-- Base de datos de invitaciones digitales - Marketing Místico
-- Importar en phpMyAdmin (Hostinger) sobre la base existente. Generado desde frontend/public/_mm/schema.php

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'client',
  active TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS invitations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(90) NOT NULL UNIQUE,
  owner_id INT UNSIGNED NULL,
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
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS guests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invitation_id INT UNSIGNED NOT NULL,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NULL,
  passes TINYINT NOT NULL DEFAULT 1,
  token VARCHAR(16) NOT NULL UNIQUE,
  sent_at DATETIME NULL,
  opened_at DATETIME NULL,
  created_at DATETIME NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS rsvps (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invitation_id INT UNSIGNED NOT NULL,
  guest_id INT UNSIGNED NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  attending TINYINT NOT NULL,
  people TINYINT NOT NULL DEFAULT 0,
  message TEXT NULL,
  pass_code VARCHAR(16) NOT NULL UNIQUE,
  checked_in_at DATETIME NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_guests_inv ON guests (invitation_id);

CREATE INDEX idx_rsvps_inv ON rsvps (invitation_id);

CREATE INDEX idx_inv_owner ON invitations (owner_id);

