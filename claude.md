# 🌌 Marketing Místico — INVITIX: Sistema SaaS de Invitaciones Digitales

> **Documento de proyecto activo.** Actualizar en cada sesión de trabajo.  
> Última actualización: 2026-11-16 (sesión 6)

---

## 🧠 Contexto del negocio

**Empresa:** Marketing Místico  
**Dueño:** Adrián  
**Situación actual:** Agencia de marketing con sitio web corporativo ya desplegado (React + PHP + MySQL en Hostinger).  
**Urgencia:** Alta. Se necesita un producto SaaS generador de ingresos recurrentes lo antes posible.

---

## 💡 El producto: INVITIX

**Qué es:** Plataforma SaaS B2C donde clientes contratan invitaciones digitales interactivas para sus eventos (bodas, cumpleaños, 15 años, corporativos, bautizos, etc.).

**Diferencial:** No es solo una invitación bonita. Es un **sistema completo de gestión del evento** con tecnología que nadie más ofrece en el mercado local boliviano.

---

## 🚀 Features del MVP (Fase 1)

### Panel del cliente (organizador del evento)
- [ ] Registro / Login con email
- [ ] Dashboard: mis invitaciones activas
- [ ] Crear invitación: tipo de evento, título, fecha, lugar, mensaje, foto de portada
- [ ] Gestión de invitados: agregar nombre + teléfono, asignar passes (1, 2, 3...)
- [ ] Generación de QR individual por invitado (con token único)
- [ ] Envío masivo por WhatsApp (link personalizado por invitado)
- [ ] Ver RSVP en tiempo real (quién confirmó, cuántos)
- [ ] Control de acceso: marcar check-in con QR en la puerta

### Invitado (vista pública)
- [ ] Página de invitación animada y personalizada (URL: `invitix.com/i/[slug]`)
- [ ] Ver detalles del evento: fecha, lugar, mapa, dress code, itinerario
- [ ] Confirmar asistencia (RSVP) con nombre y número de personas
- [ ] **Subir su foto** al confirmar → aparece en la galería del evento
- [ ] Ver galería de fotos de invitados que ya confirmaron
- [ ] Botón para abrir mapa (Google Maps)

### QR + Check-in
- [ ] QR único por invitado con `pass_code`
- [ ] App/página de scanner para el portero (sin instalar nada, funciona en el celular del cliente)
- [ ] Al escanear: muestra nombre, foto, número de passes → botón "✅ Check-in"
- [ ] Contador en tiempo real de asistentes vs confirmados

---

## ✨ FEATURES PREMIUM (lo que nos hace revolucionarios)

Estos son los diferenciales que justifican precio más alto y generan viralidad:

### 1. 🤖 Inteligencia Artificial en la invitación
- **Generador de texto con IA**: el cliente describe su evento con palabras, la IA redacta el mensaje de la invitación automáticamente
- **Recomendador de plantilla**: según el tipo de evento y estilo descrito, la IA sugiere la mejor plantilla visual

### 2. 📸 Galería colaborativa de invitados (viral)
- Cada invitado puede subir su foto al RSVP o desde un enlace especial el día del evento
- Se crea automáticamente una **galería viva** que se actualiza en tiempo real
- El día del evento: pantalla de proyección con las fotos de los que van llegando (modo kiosco)
- Después del evento: el organizador descarga todas las fotos en un ZIP

### 3. 🎵 Fondo musical personalizado
- El organizador sube o linkea una canción (Spotify, YouTube, URL directa)
- La invitación abre con música de fondo (con botón de silencio)
- Genera una experiencia emocional única

### 4. 📊 Analytics del evento
- Cuántas veces fue vista la invitación
- Tasa de apertura por invitado (si abrió el link)
- Tasa de RSVP
- Mapa de calor de horas de apertura
- Exportable a PDF para el cliente

### 5. 🌍 Mapa interactivo integrado
- Mapa embebido (OpenStreetMap o Google Maps) dentro de la invitación
- El invitado puede "cómo llegar" sin salir de la página

### 6. 📱 WhatsApp masivo con un clic
- El sistema genera el mensaje personalizado para cada invitado ("Hola Juan, te invitamos a...")
- El organizador hace clic → se abre WhatsApp Web con el mensaje listo para cada uno
- Semaforo de envíos: verde = enviado, amarillo = pendiente, rojo = no tiene teléfono

### 7. 🎁 Lista de regalos / Mesa de regalos
- El organizador agrega links a listas de regalos (Falabella, Amazon, etc.) o números de cuenta
- Se muestra de forma elegante en la invitación

### 7b. 💸 QR de regalos en dinero (feature exclusivo Bolivia)
- El organizador sube la **foto/imagen de su QR de cobro** (Simple, Tigo Money, BNB, Banco Unión, etc.)
- Puede cargar **múltiples QRs**, uno por cada billetera digital que use
- El invitado ve un botón **"💸 Regalar en efectivo digital"** dentro de la invitación

**Flujo UX del invitado:**
```
Invitado toca "💸 Regalar en efectivo digital"
        ↓
  ┌──────────────────────────┐
  │   ¿Con qué app pagás?    │
  │  [Simple] [Tigo Money]   │
  │  [BNB]    [Banco Unión]  │
  └──────────────────────────┘
        ↓
   QR grande en pantalla completa
   listo para escanear con la app
        ↓
   "¡Listo! Gracias por tu regalo 🎉"
```

- Se puede agregar un **monto sugerido** (ej: "Sugerencia: Bs. 100") — opcional, nunca obligatorio
- **Contador social:** "Ya regalaron 12 personas 🎉" — sin mostrar montos, solo cantidad (genera FOMO positivo)
- Implementación simple en MVP: el organizador sube la imagen del QR, se muestra en modal. No requiere integración bancaria.
- **Por qué es viral:** elimina la incomodidad del sobre de efectivo, es moderno, los invitados lo agradecen, y los organizadores lo van a pedir como primera función

### 8. 💬 Muro de mensajes
- Los invitados pueden dejar un mensaje/deseo para los homenajeados
- Los mensajes aparecen en un muro tipo "libro de visitas digital"
- El organizador puede moderar (aprobar/rechazar)

### 9. 🔔 Recordatorios automáticos
- El sistema genera un mensaje de recordatorio listo para copiar y pegar en WhatsApp
- El organizador lo envía manualmente (o lo pega en el grupo) — sin API, sin costo
- Recordatorio 7 días antes y 1 día antes del evento
- A los que no confirmaron: mensaje de RSVP pendiente generado automáticamente
- _(En versión futura: automatización vía cron job + wa.me links masivos)_


### 10. 🏆 Modo evento en vivo (el más viral)
- El día del evento, el organizador activa "Modo En Vivo"
- Pantalla de proyección (TV/proyector) con: contador de asistentes, fotos de invitados llegando, mensajes del muro
- Los invitados pueden votar canciones, hacer preguntas al MC desde su celular
- Genera momentos únicos y shareables → marketing gratuito para Marketing Místico

---

## 💥 MÁS IDEAS — Ronda 2

### 21. 🎮 Trivia / juego sobre los homenajeados
- Dentro de la invitación: "¿Cuánto los conocés? Respondé 5 preguntas sobre Juan y María"
- Preguntas las carga el organizador (¿Dónde se conocieron? ¿Cuál es su película favorita?)
- Al terminar: puntaje y ranking de invitados
- **Por qué funciona:** los invitados compiten entre ellos, comparten el resultado en stories → marketing gratuito masivo
- El evento se vuelve tema de conversación días antes de que suceda

### 22. 📸 Marco personalizado para Stories de Instagram
- El invitado que confirma asistencia puede descargar un marco con el nombre del evento
- "Voy a la boda de Juan y María 💍 — 15 Nov 2026"
- Lo sube a sus historias → miles de personas ven la invitación sin que el organizador haga nada
- El organizador diseña el marco desde el panel (con sus colores y foto)

### 23. 🗺️ Ruta del evento con múltiples paradas
- Para eventos con distintos lugares: ceremonia → recepción → after party
- El invitado ve un mapa con las paradas en orden, horario de cada una y botón "cómo llegar"
- Perfecto para bodas bolivianas: iglesia → salón → after
- Nadie tiene que preguntar "¿y dónde es el after?" — está todo en la invitación

### 24. 🍽️ Menú interactivo + restricciones dietéticas
- El organizador carga el menú del evento (entrada, plato, postre)
- El invitado al confirmar puede indicar: vegetariano, sin gluten, alergia a mariscos, etc.
- El organizador descarga un reporte por mesa de restricciones → le pasa al catering
- Elimina el caos de preguntar uno por uno qué comen

### 25. ⏳ Contador regresivo animado en la invitación
- "Faltan 15 días, 4 horas y 32 minutos para la boda"
- Se actualiza en tiempo real cada vez que el invitado abre la invitación
- Genera expectativa y emoción desde el primer día
- Simple de implementar, grandioso visualmente

### 26. 📬 Carta del futuro (el más emocional del año)
- El organizador escribe una carta/mensaje que se enviará a todos los invitados exactamente 1 año después del evento
- "Un año después de nuestra boda, queremos recordarles que..."
- El invitado recibe el WhatsApp o email un año después sin esperarlo
- **Ninguna plataforma del mundo hace esto.** Es nuestro feature más diferenciador y emotivo
- Genera prensa, virales, testimonios espontáneos

### 27. 📱 Lista de espera para eventos con cupo limitado
- El organizador define cupo máximo (ej: 150 personas)
- Una vez lleno: nuevos RSVP van a lista de espera automáticamente
- Si alguien cancela: el primero de la lista recibe WhatsApp automático "¡Se liberó un lugar!"
- Genera urgencia y FOMO: "confirmá antes que se llene"

### 28. 🎭 Zonas de acceso diferenciadas
- El organizador define zonas: VIP, General, Familia, Staff
- Cada invitado tiene su QR con su zona asignada
- El escáner del portero indica la zona al verificar el QR → acceso diferenciado automático
- Perfecto para eventos grandes: el DJ no entra por la puerta de invitados, la familia tiene mesa especial

### 29. 📰 Álbum digital post-evento (recuerdo para toda la vida)
- Después del evento, el organizador activa "Crear álbum"
- El sistema combina: fotos subidas por invitados + mensajes del muro + datos del evento
- Genera un álbum digital bonito (tipo revista) que se puede compartir por link o descargar en PDF
- El organizador puede mandarlo a todos los invitados como recuerdo
- **Ingreso extra:** cobrar el álbum como add-on (Bs. 80 extra)

### 30. 🤖 Chatbot de preguntas frecuentes del evento
- El organizador precarga las preguntas típicas: "¿Hay estacionamiento?", "¿Puedo ir con mis hijos?", "¿Cuál es el dress code exacto?"
- El invitado puede "chatear" con el evento y obtener respuestas instantáneas
- Elimina el bombardeo de WhatsApp al organizador con las mismas preguntas 20 veces
- Simple de implementar: es solo un FAQ interactivo con animación de chat

### 31. 🇧🇴 Plantillas temáticas bolivianas (exclusivo mercado local)
- Plantillas con estética de eventos típicos bolivianos:
  - **Presterio / Entrada** (con decoración de morenada, caporales)
  - **Aniversario de fundación** (para organizaciones, sindicatos, colegios)
  - **Graduación universitaria**
  - **Bautizo / Primera comunión**
  - **Reunión de ex alumnos**
- Ninguna plataforma internacional tiene plantillas adaptadas a Bolivia
- Esto solo lo podemos hacer nosotros que conocemos la cultura

### 32. 📊 Encuesta post-evento automática
- 24 horas después del evento, el sistema manda automáticamente a todos los asistentes:
  "¿Cómo estuvo el evento? Calificá con 1 estrella a 5 ⭐"
- El organizador recibe el resumen con calificación promedio y comentarios
- **Para Marketing Místico:** estos testimonios se pueden usar con permiso en la web como casos de éxito

### 33. 🎬 Video slideshow automático post-evento
- El sistema toma todas las fotos subidas por invitados, les aplica un filtro uniforme y genera un video slideshow automático con música de fondo
- El organizador lo descarga y lo sube a Instagram/TikTok
- Lleva el watermark "Creado con INVITIX by Marketing Místico" → publicidad gratuita en cada reel
- **Implementación:** librería FFmpeg en servidor o integración con API de video

### 34. 🔗 Integración con grupos de WhatsApp
- El organizador puede generar un mensaje formateado listo para pegar en su grupo de WhatsApp
- "📩 Hola a todos! Los invito a mi boda. Confirmen asistencia acá: invitix.com/i/juan-maria — Fecha límite: 10 Nov"
- Un clic copia el mensaje al portapapeles, listo para pegar
- Para el organizador que tiene todos los invitados en un grupo familiar/de amigos

### 35. 🌟 Badge "Asistí a este evento" (coleccionable)
- Cada evento tiene un badge digital único (imagen/sticker personalizado)
- El invitado que hace check-in recibe su badge en el celular: "✅ Asistí a la Boda de Juan y María — 15 Nov 2026"
- Lo puede descargar y subir a sus stories, agregar a su perfil
- Con el tiempo los invitados coleccionan badges de eventos → se vuelve un hábito social

---

## 🏆 DIFERENCIADORES CLAVE — Por qué nos van a elegir a nosotros

> Estas son las razones por las que un cliente en Bolivia va a pagar por INVITIX y no va a usar Canva, una plantilla de WhatsApp, o a la competencia.

### 11. 📖 Historia animada de los homenajeados (el más emocional)
- Para bodas y 15 años: una sección tipo "Reels" dentro de la invitación con fotos de la pareja/quinceañera y fechas importantes ("Se conocieron en 2019", "Su primer viaje juntos", "El día que nos comprometimos")
- El organizador sube fotos y escribe los hitos → el sistema genera una línea de tiempo animada
- **Es lo que más van a compartir.** La gente manda la invitación a sus contactos solo para mostrarla, no para confirmar asistencia
- Ninguna plantilla de Canva ni invitación estática puede hacer esto

### 12. 📅 Botón "Agregar al calendario" con un clic
- Google Calendar, iCal (iPhone), Outlook — el invitado agrega el evento con un toque
- Se genera un archivo `.ics` automáticamente con nombre, fecha, hora, lugar y link al evento
- Simple pero casi ningún competidor lo tiene
- El día del evento, el celular recuerda al invitado automáticamente → menos "se me olvidó"

### 13. 🔒 Invitaciones privadas con código de acceso
- El organizador puede proteger la invitación con una contraseña o código (ej: "BODA2026")
- El invitado que no tiene el código no puede ver nada
- Genera **exclusividad real** — "esta invitación es solo para ti"
- Ideal para eventos privados, corporativos, fiestas VIP

### 14. 🎥 Video mensaje del anfitrión
- El organizador graba o sube un video corto (15–30 segundos) de bienvenida
- Se reproduce automáticamente al abrir la invitación (con sonido silenciado por defecto)
- "Hola Juan, queremos que seas parte de este momento tan especial para nosotros..."
- Nadie más hace esto en Bolivia. Es personalización al máximo nivel

### 15. 🪑 Mapa de mesas (para bodas y eventos formales)
- El organizador carga la distribución de mesas con nombres
- Cada invitado ve automáticamente en qué mesa está sentado cuando abre su invitación
- Elimina el caos del día del evento buscando dónde sentarse
- Para el organizador: elimina imprimir carteles de mesas

### 16. 🔔 Alerta al organizador por cada RSVP
- Cada vez que alguien confirma → el sistema genera un link `wa.me` listo con el mensaje
- El organizador tiene un botón en el panel: "Ver últimas confirmaciones"
- En el panel se muestra en tiempo real: "✅ Juan Pérez confirmó para 2 personas — hace 5 min"
- Sin API, sin costo — el organizador ve todo desde su dashboard


### 17. 🤝 Programa de referidos (el que más clientes trae)
- Cada cliente que contrata recibe un **código de referido personal**
- Cuando alguien nuevo contrata usando ese código → el referidor recibe descuento en su próxima invitación o dinero directo (Bs. 50 por referido)
- El organizador tiene incentivo económico para recomendar INVITIX a todos sus conocidos
- **Efecto red:** un cliente feliz trae 3 más. Con bodas y 15 años, toda la familia se entera

### 18. 🏢 Certificado digital de asistencia (mercado corporativo)
- Para eventos empresariales, congresos, talleres y capacitaciones
- Al hacer check-in con QR → se genera automáticamente un PDF firmado con nombre, evento y fecha
- El participante lo descarga como certificado de asistencia
- Abre un mercado completamente nuevo: empresas, instituciones educativas, ONGs
- Precio mayor (plan corporativo)

### 19. 🌐 Directorio de proveedores locales (ingreso extra para Marketing Místico)
- Dentro de la invitación: sección "Los proveedores del evento" con links a DJ, fotógrafo, catering, decoración
- Los proveedores pagan para ser listados/destacados
- **Marketing Místico cobra comisión** a los proveedores que quieran aparecer
- Genera un ecosistema donde INVITIX es el centro del mercado de eventos en Bolivia

### 20. 🏷️ Marca blanca para organizadores profesionales
- Organizadores de eventos que hacen 10+ eventos al año contratan INVITIX con su propio logo y colores
- Sus clientes ven la herramienta como propia — no saben que es Marketing Místico
- Precio: plan mensual premium (Bs. 500–800/mes)
- **Efecto multiplicador:** un solo organizador profesional trae decenas de eventos

---

## 🎯 Tabla de diferenciación vs competencia

| Feature | INVITIX | Canva | WhatsApp/PDF | Competencia local |
|---------|---------|-------|--------------|-------------------|
| QR individual por invitado | ✅ | ❌ | ❌ | ❌ |
| Check-in en tiempo real | ✅ | ❌ | ❌ | ❌ |
| Galería colaborativa de invitados | ✅ | ❌ | ❌ | ❌ |
| QR de regalos Bolivia (Simple/Tigo) | ✅ | ❌ | ❌ | ❌ |
| Historia animada homenajeados | ✅ | ⚠️ estático | ❌ | ❌ |
| Modo evento en vivo (proyector) | ✅ | ❌ | ❌ | ❌ |
| Certificado digital de asistencia | ✅ | ❌ | ❌ | ❌ |
| Mapa de mesas | ✅ | ❌ | ❌ | ❌ |
| Analytics del evento | ✅ | ❌ | ❌ | ❌ |
| Programa de referidos | ✅ | ❌ | ❌ | ❌ |
| Marca blanca | ✅ | ❌ | ❌ | ❌ |
| **Precio** | **Bs. 150–650** | **Gratis** | **Gratis** | **?** |

> **Propuesta de valor:** Canva da una imagen bonita. INVITIX da una **experiencia completa del evento** antes, durante y después. No competimos con Canva — competimos con el caos de organizar un evento.

---

## 💰 Modelo de negocio

| Plan | Precio | Qué incluye |
|------|--------|-------------|
| **Starter** | Bs. 150 / evento | 1 invitación, hasta 50 invitados, plantilla básica, QR |
| **Premium** | Bs. 350 / evento | 1 invitación, hasta 200 invitados, galería de fotos, música, analytics |
| **Elite** | Bs. 650 / evento | Ilimitados invitados, IA, modo en vivo, recordatorios, soporte prioritario |
| **SaaS Mensual** | Bs. 300 / mes | Eventos ilimitados (para organizadores de eventos frecuentes) |

> **Meta inmediata:** 10 clientes en el primer mes = Bs. 3.500 mínimo  
> **Meta 3 meses:** 50 clientes recurrentes = Bs. 15.000/mes

---

## 🛠️ Stack técnico

### Ya existente (reutilizar)
- **Frontend:** React 19 + Tailwind CSS + React Router
- **Base de datos:** MySQL (Hostinger) — el schema `invitaciones.sql` ya existe
- **Hosting:** Hostinger (PHP + MySQL disponible)
- **Paleta de colores:** Negro (#1a1f2e), Dorado (#c9a961), Violeta (#7c3aed)

### A construir
- **Backend API:** PHP (para Hostinger, sin costo extra) — RESTful API
- **Autenticación:** JWT tokens (PHP)
- **Generación de QR:** `endroid/qr-code` (PHP) o librería JS (`qrcode.js`)
- **Almacenamiento de fotos:** Hostinger filesystem o Cloudinary (free tier)
- **IA texto:** OpenAI API (GPT-4o-mini, muy barato) — opcional en v2
- **WhatsApp:** `wa.me` links (v1 gratis) → WhatsApp Business API (v2)
- **Subdomain:** `invitix.marketingmistico.com` o dominio propio

### Estructura de carpetas nueva
```
marketing_mistico_clean/
├── frontend/              ← sitio corporativo (ya existe)
├── invitix/               ← NUEVO PROYECTO
│   ├── frontend/          ← React SPA para el dashboard de cliente
│   ├── public/            ← invitaciones públicas (PHP puro, SEO-friendly)
│   │   ├── i/[slug].php   ← vista de invitación para invitados
│   │   └── scanner.php    ← escáner QR para porteros
│   └── api/               ← REST API en PHP
│       ├── auth/
│       ├── invitations/
│       ├── guests/
│       ├── rsvp/
│       └── checkin/
└── server/
    └── sql/
        └── invitaciones.sql  ← ya existe, ampliar
```

---

## 🗄️ Base de datos (estado actual + expansión)

### Ya existe
- `users` — clientes del sistema
- `invitations` — invitaciones con todos los campos del evento
- `guests` — invitados con token QR
- `rsvps` — confirmaciones de asistencia con check-in

### A agregar
```sql
-- Fotos subidas por invitados
CREATE TABLE guest_photos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invitation_id INT UNSIGNED NOT NULL,
  guest_id INT UNSIGNED NULL,
  uploader_name VARCHAR(120),
  file_path VARCHAR(255) NOT NULL,
  approved TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL
);

-- Mensajes del muro
CREATE TABLE wall_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invitation_id INT UNSIGNED NOT NULL,
  author_name VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  approved TINYINT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL
);

-- Analytics de vistas
CREATE TABLE invitation_views (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invitation_id INT UNSIGNED NOT NULL,
  guest_id INT UNSIGNED NULL,
  ip VARCHAR(45),
  user_agent VARCHAR(255),
  viewed_at DATETIME NOT NULL
);

-- Planes / subscripciones
CREATE TABLE subscriptions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  plan VARCHAR(20) NOT NULL,
  events_limit INT NOT NULL DEFAULT 1,
  guests_limit INT NOT NULL DEFAULT 50,
  features JSON,
  paid_at DATETIME,
  expires_at DATETIME,
  created_at DATETIME NOT NULL
);
```

---

## 📅 Plan de desarrollo (sprints de 1 semana)

### Sprint 1 — MVP funcional básico
- [x] Arquitectura e integración de base de datos (`frontend/public/_mm/` y `server/sql/`)
- [x] Ampliar schema SQL con tablas nuevas (`guest_photos`, `wall_messages`, `invitation_views`)
- [x] API PHP: auth para admin y clientes (`admin_auth.php`)
- [x] API PHP: CRUD de invitaciones con permisos (`api/admin/invitaciones.php`)
- [x] API PHP: CRUD de invitados + generación de QR token (`api/admin/invitados.php`)
- [x] API PHP: RSVP con control de pases (`api/confirmar.php`)
- [x] API PHP: Check-in de portería en tiempo real (`api/admin/checkin.php`)
- [x] Frontend React: Panel de invitaciones y autenticación (`InvitixDashboard.jsx`)
- [x] Frontend React: Creación y edición de eventos (`InvitationEditor.jsx`)
- [x] Frontend React: Mesa de regalos con QR de dinero digital Bolivia (`GiftQRModal.jsx`)
- [x] Frontend React: Gestor de invitados con importación masiva CSV y WhatsApp (`GuestManager.jsx`)
- [x] Página pública: Vista de invitación móvil con música, mapa y dedicatoria (`/i/:slug` en `PublicInvitation.jsx`)
- [x] Página pública: Formulario RSVP interactivo con confetti y pase QR (`QRCodeModal.jsx`)
- [x] Página pública: Escáner QR de portero para acceso y validación (`/scanner` en `QRScanner.jsx`)

### Sprint 2 — Features premium
- [x] Subida de fotos por invitados (`frontend/public/api/galeria.php`)
- [x] Galería de fotos en tiempo real en la invitación (`PublicInvitation.jsx`)
- [x] Muro interactivo de dedicatorias y buenos deseos (`PublicInvitation.jsx`)
- [x] Enlace de acceso a portal de clientes en barra de navegación (`Navbar.jsx`)
- [x] Demos en vivo integradas en la página web corporativa (`/i/demo-boda`, `/i/demo-quince`, `/i/demo-cumple` en `InvitationExamples.jsx`)
- [ ] Analytics básico (vistas, RSVP rate)
- [ ] Generación de links de WhatsApp masivo

### Sprint 3 — Viralidad y pulido
- [x] Música de fondo en invitación
- [x] Modo fiesta en vivo para proyector y Smart TV (`/en-vivo/:slug` en `LiveEventScreen.jsx`)
- [ ] Recordatorios automáticos (cron jobs)
- [ ] Exportar galería en ZIP
- [ ] Integración IA para redacción de mensajes

### Sprint 4 — Comercialización
- [ ] Landing page de ventas de INVITIX
- [ ] Sistema de pagos (QR Simple de Bolivia o pago manual con confirmación)
- [ ] Panel admin para Marketing Místico (ver todos los clientes, activar planes)
- [ ] Integración en el sitio corporativo (sección de servicios → INVITIX)

---

## 🎨 Diseño visual

- Mismo DNA visual que Marketing Místico: dark, premium, místico-tech
- Plantillas de invitación: `boda`, `quinceañero`, `cumpleanos`, `corporativo`, `bautizo`
- Cada plantilla tiene: colores propios, tipografía, animaciones de entrada, música sugerida
- Mobile-first absoluto (el 95% de los invitados abrirá desde el celular)

---

## 📌 Decisiones tomadas

| # | Decisión | Razón |
|---|----------|-------|
| 1 | PHP para la API (no FastAPI) | Hostinger ya disponible, 0 costo extra de servidor |
| 2 | MySQL (no MongoDB) | Schema ya existe, Hostinger lo soporta nativamente |
| 3 | QR con librería JS del lado del cliente | Sin dependencias extra en servidor |
| 4 | Fotos en Hostinger filesystem (MVP) | Sin costo. Migrar a Cloudinary en v2 si escala |
| 5 | WhatsApp solo con `wa.me` links | Gratis, inmediato, sin API. Sin costo ni aprobación de Meta |
| 6 | Un proyecto separado (invitix/) | Mantiene el sitio corporativo limpio |

---

## ❓ Preguntas abiertas / A decidir con Adrián

- [ ] ¿Nombre del producto? Sugerencia: **INVITIX** o **MísticoInvite** o **EventPass**
- [ ] ¿Dominio propio o subdominio? (`invitix.bo` vs `invitaciones.marketingmistico.com`)
- [ ] ¿Sistema de pago digital o manual al inicio?
- [ ] ¿Cuántos clientes ya tiene interesados en invitaciones digitales?
- [ ] ¿Tiene acceso a la API de WhatsApp Business?

---

## 📝 Log de sesiones

### 2026-11-12 — Sesión 1
- Exploración del proyecto existente (stack: React + PHP + MySQL en Hostinger)
- Se identificó que ya existe schema SQL de invitaciones en `server/sql/invitaciones.sql`
- Se definió la visión completa del producto INVITIX con 10 features premium
- **Idea de Adrián:** QR de regalos en dinero → agregado como feature 7b con flujo UX completo
  - Simple, Tigo Money, BNB, Banco Unión
  - Múltiples QRs por billetera
  - Contador social "Ya regalaron X personas" sin mostrar montos
  - Monto sugerido opcional
  - MVP: solo imagen del QR en modal, sin integración bancaria compleja
- Se redactó este documento `claude.md`
- **Pendiente de respuesta de Adrián:**
  - ¿Nombre del producto? (INVITIX u otro)
  - ¿Dominio propio o subdominio?
  - ¿Sistema de pago digital o manual al inicio?
  - ¿Clientes interesados ya identificados?

### 2026-11-16 — Sesión 5: Catálogo completo de invitaciones de lujo
- Extraído y limpiado 3 plantillas HTML de invitación de gala del HTML compuesto proporcionado por Adrián:
  1. **`demo-boda-imperial.html`** — Boda Imperial Paceña (Paola & Rodrigo): tema Illimani/midnight blue & gold, ceremonia San Miguel Arcángel, recepción Castillo del Valle, vals imperial, Banda Oruro, banquete 4 tiempos, QR BNB regalo.
  2. **`demo-quince-esmeralda.html`** — Quinceañero de Gala (Valeria Sofía Mendoza Alarcón): tema esmeralda & oro, coronación, padrinos bolivianos tradicionales (bautizo, corona/cetro, brindis, vestido), Grupo Euphoria + hora loca, BNB QR Simple.
  3. **`demo-fiesta-gala.html`** — Gran Fiesta Privada & Aniversario VIP (Rodrigo & Marcela): Salón El Campanario Real, Banda Continental de Oruro + Orquesta Sabor Latino, fricasé trasnochero.
- **`InvitationExamples.jsx`**: Actualizado con los 4 demos reales (Morenada + Boda + Quince + Fiesta), todos con "Ver invitación en vivo".
- **`EventsBand.jsx`**: Agregados 4 botones pill dorados de vista rápida para cada demo en la sección Home.
- Build exitoso (exit code 0). Commit `72d3728`, pushed a GitHub.

### 2026-11-16 — Sesión 6: PROMTULTIMO (comercial + pulido + seguridad + despliegue)
- **Paquetes nuevos** (`data/landing.js`): Esencial Bs. 250 · Gala Premium Bs. 490 (Más popular) · Imperial & Fiesta En Vivo Bs. 850. Botones "Contratar este paquete" + "Consultar disponibilidad" con mensaje de WhatsApp prellenado. Precios también en la Home (`EventsBand`).
- **`public/demo-kit.js`** en los 4 demos: banner flotante "¿Te gusta este diseño…?" → WhatsApp; música ambiental real (Web Audio, sin archivos) en los botones 🎵; los botones de confirmar de la demo ya no escriben a números de ejemplo.
- Limpiado texto de chat y metadatos que se veían al final de `demo-fiesta-gala.html`.
- **GuestManager**: botón "Descargar plantilla Excel/CSV" (`nombre_completo,telefono,passes,mesa`), cargar archivo .csv, columna **mesa** (nueva columna `guests.table_label`, migración `server/sql/migracion_2026-11-16_mesa.sql`). El invitado ve su mesa en su invitación.
- **Bugs corregidos**: RSVP mostraba error aunque guardaba (`ok` vs `success`); links personales `/i/slug/CODIGO` daban pantalla en blanco (faltaba la ruta); galería y muro nunca cargaban (la API pública no devuelve `id`); `galeria.php` tenía rutas de `require` y de `uploads` rotas; la pantalla en vivo no se refrescaba (closure con estado viejo) y no abría eventos privados; el importador contaba `undefined`.
- **Seguridad**: galería/muro por slug + código de invitado (eventos privados cerrados), límite de envíos por IP, validación real de imagen + re-compresión a JPG 1600px (borra GPS/EXIF), `uploads/.htaccess` sin ejecución de PHP, tope de 500 fotos por evento, cliente no puede cambiar `owner_id`, `.htaccess` con cabeceras de seguridad y bloqueo de archivos sensibles.
- Fotos: compresión también en el celular antes de subir (máx. 1600px, JPG 80%).
- Pruebas API: 52/52 OK (`server/tests/api_test.sh`). Build `CI=true` sin warnings.
- Guía de despliegue: `DEPLOY_INVITIX.md`.
- **Solo el admin crea/duplica eventos** (cada evento = paquete pagado); el cliente edita los suyos. Panel del cliente sin botón "Crear", con enlace a WhatsApp.
- **Moderación del muro**: los mensajes nuevos quedan pendientes; el anfitrión aprueba / borra / "Aprobar todos" desde el gestor de invitados (`WallModeration.jsx` + `api/admin/muro.php`). Pruebas API: 63/63 OK.
