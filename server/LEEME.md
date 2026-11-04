# Seguridad del servidor (Hostinger)

Las contraseñas ya NO están en el código. Viven en un archivo `mm_config.php` que va **fuera** de `public_html`.

## Pasos para publicar (una sola vez)

1. **Cambia la contraseña de la base de datos** en hPanel → Bases de datos → `u763946012_admin` → Cambiar contraseña.
   (La anterior estuvo publicada en GitHub: hay que darla por perdida.)
2. Copia `server/mm_config.example.php` como `mm_config.php`, completa:
   - `db_pass`: la contraseña NUEVA de la base.
   - `admin_password`: una clave larga (10+ caracteres) para entrar a `/gestion-leads`.
3. Súbelo con el File Manager a la carpeta que CONTIENE `public_html`
   (ej. `/home/u763946012/domains/marketingmistico.com/mm_config.php`).
4. Haz el build (`npm run build` en `frontend/`) y sube el contenido de `frontend/build/` a `public_html`,
   incluida la carpeta `_mm/` (tiene su propio `.htaccess` que la bloquea al público).
5. **Borra del servidor `test_db.php`** si todavía existe.
6. Prueba: `https://marketingmistico.com/leads_api.php` debe responder "No autorizado".

## Archivos

| Archivo | Para qué |
|---|---|
| `public/_mm/bootstrap.php` | Conexión, sesiones, límite de intentos (privado) |
| `public/contact.php` | Formulario de cotización → guarda el lead y avisa por correo |
| `public/admin_auth.php` | Login / logout del panel (sesión en el servidor) |
| `public/leads_api.php` | Lista de leads, solo con sesión de administrador |
