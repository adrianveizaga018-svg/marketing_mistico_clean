# 🚀 Despliegue de INVITIX en Hostinger: guía rápida

> Para subir a producción el sitio + el sistema de invitaciones (panel, invitaciones públicas, escáner QR y modo en vivo).
> Tiempo estimado: unos 30 minutos. Todo se hace desde **hPanel** (no hace falta SSH).

---

## 0. Antes de empezar (una sola vez)

| Necesitas | Dónde se ve |
|---|---|
| Nombre de la base de datos (`u763946012_...`) | hPanel → **Bases de datos** → Gestión |
| Usuario de la base (`u763946012_admin`) | mismo lugar |
| Contraseña de la base | la cambias tú en el mismo lugar (la anterior estuvo en GitHub: **dala por perdida**) |
| Versión de PHP **8.1 o superior** | hPanel → **Avanzado → Configuración de PHP** |
| Extensiones `pdo_mysql`, `gd`, `mbstring` activas | Configuración de PHP → Extensiones (vienen activas por defecto) |

---

## 1. Base de datos MySQL

1. hPanel → **Bases de datos → phpMyAdmin** → entra a tu base.
2. Pestaña **Importar** → elige `server/sql/invitaciones.sql` → **Continuar**.
   - Crea las 7 tablas con `utf8mb4_unicode_ci`:
     `users`, `invitations`, `guests`, `rsvps`, `guest_photos`, `wall_messages`, `invitation_views`.
   - ℹ️ El prompt hablaba de tablas `inv_eventos`, `inv_invitados`, etc. **Esas no existen**: el código usa los nombres de arriba.
3. **¿La base ya existía antes del 16-11-2026?** Entonces importa también
   `server/sql/migracion_2026-11-16_mesa.sql` (agrega la columna de **mesa** a los invitados).
   Si da error *"Duplicate column name 'table_label'"* es que ya estaba: todo bien.
4. La tabla `Leads` del formulario de contacto ya existe en tu base actual; no la toques.

---

## 2. Archivo de contraseñas `mm_config.php` (FUERA de public_html)

1. Copia `server/mm_config.example.php` con el nombre **`mm_config.php`** y complétalo:

```php
<?php
return [
    'db_host' => 'localhost',
    'db_name' => 'u763946012_XXXXXXXX',          // nombre EXACTO de tu base (hPanel)
    'db_user' => 'u763946012_admin',
    'db_pass' => 'LA_CONTRASEÑA_NUEVA_DE_LA_BASE',

    // Clave del panel /panel-invitaciones y /gestion-leads: 16+ caracteres, distinta a la de la base.
    'admin_password' => 'UNA_FRASE_LARGA_SOLO_TUYA_2026',

    'notify_email' => 'marketing.mistico.oficial@gmail.com',
    'site_url' => 'https://marketingmistico.com',
    'allowed_origins' => ['https://marketingmistico.com', 'https://www.marketingmistico.com'],
];
```

2. Súbelo con el **Administrador de archivos** a la carpeta que **contiene** `public_html`:
   `/home/u763946012/domains/marketingmistico.com/mm_config.php`
   (así nadie lo puede abrir desde el navegador). **Nunca** lo subas a GitHub; ya está en `.gitignore`.

---

## 3. Compilar el frontend (en tu PC)

```bash
cd frontend
npm install        # solo la primera vez
npm run build      # debe terminar con "Compiled successfully" y código 0
```

Se genera `frontend/build/`, que ya trae todo junto:

| Carpeta / archivo dentro de `build/` | Qué es |
|---|---|
| `index.html`, `static/` | La web en React (sitio + panel + invitaciones + escáner + en vivo) |
| `api/` | API PHP: `invitacion.php`, `confirmar.php`, `galeria.php` y `api/admin/*` |
| `_mm/` | Código PHP privado (tiene su propio `.htaccess` que lo bloquea al público) |
| `admin_auth.php`, `contact.php`, `leads_api.php` | Login del panel, formulario de contacto, leads |
| `demo-*.html`, `demo-kit.js` | Las 4 invitaciones demo con banner de WhatsApp y música |
| `uploads/.htaccess` | Carpeta de fotos de invitados (bloquea ejecutar PHP ahí) |
| `.htaccess` | Rutas de React + cabeceras de seguridad + caché |

---

## 4. Subir a `public_html`

1. hPanel → **Administrador de archivos** → `public_html/`.
2. **Haz una copia** de lo que hay (selecciona todo → Comprimir → descarga el .zip).
3. Comprime `frontend/build/` **por dentro** (el contenido, no la carpeta) en un .zip, súbelo a `public_html/` y **Extraer**.
4. Activa **"Mostrar archivos ocultos"** y verifica que estén `public_html/.htaccess`, `public_html/_mm/.htaccess` y `public_html/uploads/.htaccess`.
5. Permisos de la carpeta de fotos: clic derecho en `public_html/uploads` → **Permisos** → `755`
   (si al subir una foto da error "No se pudo guardar la foto", prueba con `775`).
6. **Borra** del servidor `test_db.php` si todavía existe.
7. hPanel → **Seguridad → SSL** → activa **Forzar HTTPS**.

### Rutas que maneja el `.htaccess` (React Router)
`/panel-invitaciones`, `/i/:slug`, `/i/:slug/:codigo`, `/scanner`, `/en-vivo/:slug`, `/eventos`, `/gestion-leads`…
Cualquier ruta que no sea un archivo real va a `index.html`. Lo que empieza con `/api/` o `/_mm/` **no** cae en React.

---

## 5. Pruebas después de subir (5 minutos)

| Abre | Debe pasar |
|---|---|
| `https://marketingmistico.com/eventos` | Paquetes Bs. 250 / 490 / 850 con botones a WhatsApp |
| `https://marketingmistico.com/demo-boda-imperial.html` | Banner dorado abajo + el botón 🎵 suena |
| `https://marketingmistico.com/i/demo-boda` | Invitación demo; "Confirmar" muestra el pase QR de ejemplo |
| `https://marketingmistico.com/leads_api.php` | `{"status":"error","message":"No autorizado"}` |
| `https://marketingmistico.com/_mm/bootstrap.php` | **403 Prohibido** |
| `https://marketingmistico.com/panel-invitaciones` | Login → entra con `admin_password` |
| En el panel: crea un evento, agrega un invitado, ábrelo con su link | Ve su nombre, pases y mesa; confirma; sube una foto |
| `https://marketingmistico.com/scanner` (desde el celular) | Escanea el QR del pase → "¡Bienvenido!" |

---

## 6. Si algo falla

| Síntoma | Causa probable |
|---|---|
| "Servidor sin configurar" | `mm_config.php` no está en `/domains/marketingmistico.com/` (un nivel arriba de `public_html`) |
| Error 500 en `/api/...` | Datos de la base mal escritos en `mm_config.php`, o PHP menor a 8.1 |
| Las rutas `/i/...` dan 404 | Falta el `.htaccess` en `public_html` (archivo oculto) |
| No se pueden subir fotos | Permisos de `public_html/uploads` → `755` o `775` |
| "Origen no permitido" | Entras por una dirección que no está en `allowed_origins` (agrega `https://www...` si usas www) |

---

## 7. Pruebas locales (opcional, para desarrolladores)

```bash
bash server/tests/api_test.sh     # levanta PHP + SQLite temporal y corre 52 pruebas de la API
```
