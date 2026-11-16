-- Solo si la base YA existía antes del 16-11-2026 (si importas invitaciones.sql desde cero, no hace falta).
-- Agrega la columna "mesa" de cada invitado (plantilla CSV: nombre_completo,telefono,passes,mesa).
ALTER TABLE guests ADD COLUMN table_label VARCHAR(40) NULL AFTER passes;
