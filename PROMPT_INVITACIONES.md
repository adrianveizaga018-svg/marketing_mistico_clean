# Paso 2: Sistema de invitaciones digitales de Marketing Místico

Haz esto DESPUÉS de terminar las mejoras de la landing (PROMPT_LANDING.md).

## Rol
Actúa como un equipo de 3 expertos:
1. Ingeniero de sistemas full-stack (arquitectura simple, segura y fácil de mantener)
2. Experto en UX/UI (invitaciones bonitas, emotivas y mobile first)
3. Marketero (que cada invitación también promocione a Marketing Místico)

## Contexto
- Marketing Místico, La Paz, Bolivia. Nuevo servicio: invitaciones digitales para bodas, quinceañeros, cumpleaños, bautizos, graduaciones y fiestas.
- Versión 1 = SERVICIO: yo creo las invitaciones desde un panel y el cliente recibe su link para compartirlo por WhatsApp. (Más adelante será SaaS, con el cliente creando la suya solo; diséñalo para que ese paso sea fácil después.)
- Los invitados abren el link casi siempre desde el celular, dentro de WhatsApp.

## Paso 1: análisis y plan (no programes todavía)
- Revisa el proyecto actual: qué tecnología usa y dónde está publicado.
- Propón la arquitectura más simple que funcione con lo que ya tengo. Si la landing es estática, propón un backend liviano (por ejemplo Supabase, o Node + base de datos) y explícame costos y hosting.
- Propón el modelo de datos: invitaciones, plantillas, confirmaciones (RSVP) y usuario admin.
- Espera mi aprobación.

## Paso 2: página pública de la invitación (/i/[slug])
Debe tener:
- Portada con foto o video, nombres de los festejados y tipo de evento
- Cuenta regresiva hasta el evento
- Fecha, hora y lugar, con mapa y botón "Cómo llegar" (Google Maps)
- Itinerario opcional (ceremonia, recepción, fiesta)
- Código de vestimenta opcional
- Confirmación de asistencia: nombre, número de acompañantes, mensaje opcional; con fecha límite
- Sección de regalos: imagen del QR de pago y/o datos para depósito
- Botón de WhatsApp al anfitrión
- Galería de fotos
- Música de fondo opcional, con botón para activarla (los navegadores no permiten autoplay con sonido)
- Vista previa bonita al compartir por WhatsApp (Open Graph: foto, título, fecha)
- Al pie, discreto: "Invitación creada por Marketing Místico" con link a WhatsApp 68105614 (así cada invitación me trae clientes)

Crea una invitación de prueba, saca capturas en celular (390px) y revísalas antes de mostrarme.

## Paso 2B: invitaciones personalizadas por invitado (MUY IMPORTANTE)
Cada invitado debe recibir SU PROPIA invitación, no un link genérico:
- Cada invitación tiene una lista de invitados. Cada invitado tiene: nombre, teléfono (opcional) y número de pases asignados.
- Cada invitado tiene su link único y difícil de adivinar (por ejemplo /i/boda-ana-y-luis/x7k2p9).
- Al abrir su link ve: "Querida Luciana, estás invitada a…" y "Esta invitación es válida para 2 personas".
- Su confirmación ya viene con su nombre y no puede confirmar más personas que sus pases asignados.
- Pase de entrada: al confirmar, el invitado recibe un pase con código QR y su nombre, para mostrarlo en la puerta.
- Modo "check-in" en el panel: escanear el QR con el celular en la puerta para marcar quién llegó.
- El link genérico (sin código de invitado) sigue existiendo como opción, para eventos abiertos.

En el panel (paso 4), para cada invitación:
- Cargar invitados uno por uno o importarlos desde Excel/CSV (nombre, teléfono, pases).
- Botón "Enviar por WhatsApp" por invitado: abre WhatsApp con el mensaje personalizado y su link ya escritos (wa.me con texto prellenado), para que el cliente o yo solo toquemos "enviar".
- Estado de cada invitado: no enviado / enviado / abrió la invitación / confirmó / no asistirá / llegó al evento.
- Totales: invitados, pases asignados, confirmados y personas que llegaron.

Este también debe ser el panel que el CLIENTE pueda usar para mandar sus invitaciones uno por uno. Dale a cada cliente un acceso propio y limitado: solo ve y gestiona los invitados de SU evento, sin poder entrar al resto del panel.

## Paso 3: las 3 primeras plantillas
- Boda: elegante (tonos crema/dorado, tipografía serif)
- Quinceañero: moderno y brillante
- Cumpleaños: divertido y colorido
Cada plantilla con su propio estilo, pero usando los mismos datos. Muéstrame capturas de las 3 en celular.

## Paso 4: panel admin (solo yo)
- Login seguro
- Lista de invitaciones: crear, editar, duplicar, activar/desactivar
- Formulario para cargar todos los datos y subir fotos
- Ver confirmados de cada invitación: total de personas, lista y mensajes
- Exportar la lista de confirmados a Excel
- Copiar el link de la invitación y el mensaje listo para mandar por WhatsApp

## Paso 5: en la landing
- Sección "Invitaciones digitales" con las 3 plantillas como ejemplo en vivo (links a invitaciones demo)
- Paquetes con precios: [PRECIO BÁSICO], [PRECIO PREMIUM], [PRECIO CON VIDEO]
- Botón de WhatsApp con mensaje prellenado: "Hola, quiero una invitación digital para mi evento"

## Reglas
- Avanza paso por paso y espera mi aprobación entre pasos.
- No rompas nada de la landing actual.
- Seguridad: solo yo entro al panel completo; cada cliente solo ve su evento; los invitados solo pueden ver su invitación y confirmar; nadie puede ver los datos de otra invitación ni adivinar los links de otros invitados.
- Imágenes optimizadas para que carguen rápido con datos móviles.
- NO inventes precios, testimonios ni datos reales; usa marcadores como [PRECIO].
- Textos en español boliviano.
- Haz un commit en git antes de empezar y después de cada paso que funcione.
