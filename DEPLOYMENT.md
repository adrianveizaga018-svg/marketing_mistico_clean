# 📦 INSTRUCCIONES RÁPIDAS DE DEPLOYMENT - HOSTINGER BUSINESS

## ✅ Requisitos Previos
- Plan: Hostinger Business (ya lo tienes ✓)
- Dominio: marketingmistico.com (o el tuyo)
- Acceso: hPanel de Hostinger

---

## 🚀 PASO 1: BUILD DEL FRONTEND

```bash
# Abre PowerShell o CMD en la carpeta del proyecto
cd C:\Users\ASUS\Documents\Sistemas\Marketing-mistico\frontend

# Instala dependencias (si no lo hiciste)
npm install

# Crea el build de producción
npm run build
```

✅ Esto creará una carpeta `frontend/build/` con todos los archivos optimizados.

---

## 🗄️ PASO 2: CONFIGURAR BASE DE DATOS EN HOSTINGER

### 2.1 Crear Base de Datos MySQL

1. Entra a hPanel → **Bases de datos** → **MySQL Databases**
2. Click en **Crear nueva base de datos**
3. Configura:
   - **Nombre:** `u763946012_marketing` (Hostinger añade el prefijo automáticamente)
   - **Usuario:** Usa `u763946012_admin` o crea uno nuevo
   - **Contraseña:** `Marketingmistico2026` (o crea una segura)
4. **Asigna el usuario a la base de datos**
5. **IMPORTANTE:** Anota el **nombre real completo** que te dé Hostinger

### 2.2 Actualizar credenciales

Edita `backend_node/.env.production` con los datos reales:

```env
DB_NAME=u763946012_marketing  # El nombre REAL con prefijo
DB_USER=u763946012_admin       # Tu usuario REAL
DB_PASS=TuPasswordReal123      # Tu password REAL
```

---

## 📤 PASO 3: SUBIR FRONTEND A HOSTINGER

### 3.1 Via File Manager (Recomendado)

1. Entra a hPanel → **Archivos** → **File Manager**
2. Navega a `public_html`
3. **Borra todo** el contenido de `public_html` (haz backup si hay algo importante)
4. Sube **TODO el contenido** de `frontend/build/` a `public_html/`
   - ⚠️ Sube los **archivos sueltos**, NO la carpeta "build"
5. Sube también `frontend/.htaccess` a `public_html/`

**Estructura final en `public_html/`:**
```
public_html/
├── .htaccess
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── logo_oficial.webp
├── video_header.mp4
└── ...otros archivos
```

---

## ⚙️ PASO 4: SUBIR Y CONFIGURAR BACKEND NODE.JS

### 4.1 Crear carpeta para backend

1. En File Manager, ve a la **raíz** (un nivel arriba de `public_html`)
2. Crea una nueva carpeta llamada `backend_node`

### 4.2 Subir archivos del backend

Sube estos archivos a `/home/u763946012/backend_node/`:

- `server.js`
- `package.json`
- `.env` (renombra `.env.production` a `.env` antes de subir)

⚠️ **NO subas:**
- `node_modules/` (se instalará en el servidor)
- `.env.production` (solo sube como `.env`)

### 4.3 Configurar Node.js App en Hostinger

1. En hPanel, ve a **Avanzado** → **Node.js**
2. Click **Create Application**
3. Configuración:
   ```
   Application mode: Production
   Application root: /home/u763946012/backend_node
   Application URL: api.marketingmistico.com (o elige otro subdominio)
   Application startup file: server.js
   Node.js version: 18.x (o la más reciente)
   ```
4. Click **Create**
5. Espera a que Hostinger instale las dependencias (puede tardar 2-3 minutos)

---

## 🌐 PASO 5: CONFIGURAR SUBDOMINIOS Y SSL

### 5.1 Crear subdominio paraAPI

1. hPanel → **Dominios** → **Subdominios**
2. Crear: `api.marketingmistico.com`
3. Asígnalo a tu aplicación Node.js (Hostinger lo hace automáticamente)

### 5.2 Activar SSL

1. hPanel → **SSL**
2. Selecciona `marketingmistico.com` y `api.marketingmistico.com`
3. Instala certificado SSL gratuito en ambos
4. Activa **Forzar HTTPS**

---

## ✅ PASO 6: VERIFICACIÓN

### 6.1 Verificar Frontend

Abre `https://marketingmistico.com`

Check:
- ✅ El sitio carga
- ✅ Imágenes y videos visibles
- ✅ Navegación funciona
- ✅ HTTPS activo (candado verde)

### 6.2 Verificar Backend

Abre `https://api.marketingmistico.com/api`

Deberías ver:
```json
{"message": "Marketing Místico API v1 (Node + MySQL)"}
```

### 6.3 Verificar Base de Datos

1. Ve a hPanel → **Bases de datos** → **phpMyAdmin**
2. Selecciona tu base de datos `u763946012_marketing`
3. Verifica que exista la tabla `Leads` (Sequelize la creó automáticamente)

### 6.4 Probar Formulario de Contacto

1. Llena el formulario en `https://marketingmistico.com`
2. Verifica en phpMyAdmin que el lead se guardó:
   ```sql
   SELECT * FROM Leads;
   ```

---

## 🔧 TROUBLESHOOTING

### ❌ "Cannot GET /" en rutas de React

**Solución:** Verifica que `.htaccess` esté en `public_html/`

### ❌ Backend no conecta a MySQL

**Solución:**
1. Verifica credenciales en `.env`
2. Asegúrate de que `DB_HOST=localhost`
3. En hPanel → Node.js → Tu app → **Environment Variables**
   - Verifica que las variables estén configuradas

### ❌ CORS Error en consola del navegador

**Solución:**
1. Edita `.env` en el backend
2. Actualiza `CORS_ORIGINS` con tu dominio real
3. Reinicia la aplicación Node.js en hPanel

### ❌ Node.js app no inicia

**Solución:**
1. Ve a hPanel → **Node.js** → Tu app → **Logs**
2. Revisa errores
3. Común: Faltan dependencias en `package.json`

---

## 📝 CHECKLIST FINAL

Antes de considerar el deployment completo:

- [ ] Frontend en `public_html/` funcionando
- [ ] `.htaccess` configurado
- [ ] SSL activado en dominio principal y API
- [ ] Base de datos MySQL creada
- [ ] Backend Node.js corriendo en Hostinger
- [ ] Subdominio API configurado
- [ ] Formulario de contacto guarda leads
- [ ] WhatsApp widget funciona
- [ ] Todas las imágenes/videos cargan
- [ ] React Router funciona (rutas como `/gestion-leads`)

---

## 🎉 ¡LISTO!

Una vez completados todos los pasos, tu sitio estará en producción en Hostinger.

**URLs finales:**
- Sitio principal: `https://marketingmistico.com`
- API Backend: `https://api.marketingmistico.com`
- Dashboard Leads: `https://marketingmistico.com/gestion-leads`

---

## 📞 Ayuda Adicional

- **Hostinger Support:** Chat 24/7 en hPanel
- **Logs del backend:** hPanel → Node.js → Tu app → Logs
- **Logs de errores:** hPanel → File Manager → `public_html/error_log`
