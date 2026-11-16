// Contenido de la landing (servicios, invitaciones, proceso, testimonios).
// Edita los textos y precios aquí; los componentes solo los muestran.

export const servicesSection = {
  eyebrow: 'Lo que hacemos por ti',
  title: 'Todo lo que tu negocio necesita para vender en internet',
  subtitle: 'Elige un servicio o combínalos. Te decimos con honestidad qué te conviene según tu negocio y tu presupuesto.',
};

export const services = [
  {
    id: 'web',
    image: '/img/svc-web.webp',
    icon: 'Globe',
    name: 'Páginas web',
    benefit: 'Que te encuentren en Google y te escriban directo',
    description: 'Una web rápida, que se ve bien en el celular y lleva a tus visitantes a WhatsApp o a comprar.',
    points: ['Clientes que te encuentran solos, las 24 horas', 'Imagen seria que genera confianza', 'Botón directo a tu WhatsApp'],
    message: 'web',
    cta: 'Cotizar mi página web',
  },
  {
    id: 'sistemas',
    image: '/img/svc-sistemas.webp',
    icon: 'Cpu',
    name: 'Sistemas a medida',
    benefit: 'Deja el cuaderno y el Excel: controla tu negocio desde el celular',
    description: 'Inventarios, ventas, reservas, inscripciones o lo que tu negocio necesite, hecho a tu manera.',
    points: ['Menos errores y menos tiempo perdido', 'Información de tu negocio al día', 'Crece sin depender del papel'],
    message: 'sistemas',
    cta: 'Cotizar mi sistema',
  },
  {
    id: 'publicidad',
    image: '/img/svc-publicidad.webp',
    icon: 'Megaphone',
    name: 'Publicidad en Facebook y TikTok',
    benefit: 'Mensajes de clientes interesados, no solo "me gusta"',
    description: 'Campañas pensadas para que te escriban personas que de verdad quieren comprar, cuidando cada boliviano que inviertes.',
    points: ['Llegas a tu cliente ideal en tu ciudad', 'Sabes en qué se va tu dinero', 'Ajustes constantes para gastar mejor'],
    message: 'publicidad',
    cta: 'Cotizar publicidad',
  },
  {
    id: 'diseno',
    image: '/img/svc-diseno.webp',
    icon: 'PenTool',
    name: 'Diseño y branding',
    benefit: 'Una marca que se ve profesional y se recuerda',
    description: 'Logo, identidad y publicaciones para redes con un estilo propio y coherente.',
    points: ['Te diferencias de la competencia', 'Tus redes se ven ordenadas y cuidadas', 'Cobras lo que vales'],
    message: 'diseno',
    cta: 'Cotizar diseño',
  },
  {
    id: 'fotovideo',
    image: '/img/svc-fotovideo.webp',
    icon: 'Camera',
    name: 'Foto y video',
    benefit: 'Contenido que detiene el scroll y vende tu producto',
    description: 'Producción y edición de fotos, reels y spots publicitarios listos para redes y anuncios.',
    points: ['Tus productos se ven como son: buenos', 'Videos en formato vertical para TikTok y Reels', 'Material listo para publicar'],
    message: 'fotovideo',
    cta: 'Cotizar foto y video',
  },
  {
    id: 'invitaciones',
    image: '/img/svc-invitaciones.webp',
    icon: 'MailOpen',
    name: 'Invitaciones digitales',
    benefit: 'Invita a todos por WhatsApp y confirma asistencia sin llamar uno por uno',
    description: 'Invitaciones web para bodas, quinceañeros, cumpleaños, bautizos y eventos de empresa.',
    points: ['Ubicación con mapa en un toque', 'Confirmación de asistencia automática', 'Sin gastos de impresión'],
    message: 'invitaciones',
    anchor: 'invitaciones',
    isNew: true,
  },
];

// ─── Invitaciones digitales ─────────────────────────────────────────────
// Precios y contenido PROPUESTOS: ajústalos a tu realidad antes de publicar.
export const invitationsSection = {
  eyebrow: 'Paquetes y precios',
  title: 'Elige tu paquete',
  subtitle: 'Todos incluyen tu invitación en un link para mandar por WhatsApp, con ubicación, hora y confirmación de asistencia.',
  events: ['Bodas', 'Quinceañeros', 'Cumpleaños', 'Bautizos', 'Baby shower', 'Graduaciones', 'Eventos de empresa'],
  // Pega aquí el link de una invitación de muestra para mostrar el botón "Ver ejemplo".
  demoUrl: '',
  note: 'Precios en bolivianos (Bs.), pago único por evento. 50% al iniciar y 50% al entregar.',
};

export const invitationPackages = [
  {
    id: 'esencial',
    name: 'Paquete Esencial',
    price: 250,
    tagline: 'Cumpleaños, bautizos y reuniones',
    delivery: 'Lista en 2 días hábiles',
    features: [
      'Invitación web para celular, personalizada con tus fotos',
      'Ubicación con Google Maps, dress code e itinerario',
      'Música de fondo con botón de play / silencio',
      'Confirmación de asistencia (RSVP) directo a tu WhatsApp',
      'Botón de regalo con QR Simple (BNB, Unión, BCP, Tigo Money)',
    ],
  },
  {
    id: 'gala',
    name: 'Paquete Gala Premium',
    price: 490,
    tagline: 'Bodas, quinceañeros y graduaciones',
    delivery: 'Lista en 3 días hábiles',
    highlighted: true,
    badge: 'Más popular',
    features: [
      'Todo lo del Paquete Esencial',
      'Pase digital con código QR individual por invitado o familia',
      'Panel de control del anfitrión: lista, links personales y confirmados',
      'Muro interactivo de dedicatorias y buenos deseos',
      'Lector QR para la puerta desde el celular (sin instalar apps)',
    ],
  },
  {
    id: 'imperial',
    name: 'Paquete Imperial & Fiesta En Vivo',
    price: 850,
    tagline: 'Bodas de gala, prestes y fiestas grandes',
    delivery: 'Lista en 5 días hábiles',
    features: [
      'Todo lo del Paquete Gala Premium',
      'Modo Fiesta En Vivo para proyector o pantalla gigante',
      'Galería de fotos de los invitados en tiempo real durante la fiesta',
      'Envío por WhatsApp con 1 clic por invitado (mensaje personalizado)',
      'Soporte técnico y acompañamiento remoto el día del evento',
    ],
  },
];

export const invitationSteps = [
  { title: 'Escríbenos', text: 'Elige tu paquete y cuéntanos de tu evento por WhatsApp.' },
  { title: 'Mándanos tus datos', text: 'Fecha, lugar, fotos y nombres. Nosotros diseñamos.' },
  { title: 'Comparte tu link', text: 'Lo envías por WhatsApp y ves quién confirma.' },
];

// ─── Trabajos (proyectos reales del portafolio) ─────────────────────────
export const workSection = {
  eyebrow: 'Trabajos reales',
  title: 'Marcas bolivianas que ya trabajan con nosotros',
  subtitle: 'Webs institucionales, videos y campañas hechas en La Paz para negocios de verdad.',
};

export const projects = [
  {
    id: 'vendly',
    client: 'Vendly',
    type: 'Plataforma / sistema a medida',
    description: 'Plataforma para que emprendedores bolivianos creen su tienda online, cobren con QR y reciban pedidos por WhatsApp.',
    image: '/img/work-vendly.webp',
    url: 'https://vendly.com.bo',
    linkLabel: 'Ver vendly.com.bo',
    featured: true,
  },
  {
    id: 'icalp',
    client: 'Colegio de Abogados de La Paz',
    type: 'Plataforma web',
    description: 'Plataforma institucional y sistema de gestión para colegiados.',
    image: '/img/work-icalp.webp',
    url: 'https://icalp.org.bo',
    linkLabel: 'Ver sitio',
  },
  {
    id: 'caulp',
    client: 'Colegio de Auditores – CAULP',
    type: 'Web e identidad digital',
    description: 'Renovación de la identidad digital y plataforma de servicios para auditores.',
    image: '/img/work-caulp.webp',
    url: 'https://caulp.org.bo',
    linkLabel: 'Ver sitio',
  },
  {
    id: 'cenefco',
    client: 'CENEFCO',
    type: 'Producción de video',
    description: 'Videos para promocionar cursos y formación profesional.',
    image: '/img/work-cenefco.webp',
    url: 'https://player.vimeo.com/video/1154013061',
    linkLabel: 'Ver video',
  },
  {
    id: 'pasion-criolla',
    client: 'Pasión Criolla',
    type: 'Video para TikTok y anuncios',
    description: 'Videos verticales de sus platos estrella para redes y publicidad.',
    image: '/img/work-pasion.webp',
    url: 'https://player.vimeo.com/video/1154010752',
    linkLabel: 'Ver video',
  },
];

// ─── Proceso de trabajo ─────────────────────────────────────────────────
export const processSection = {
  eyebrow: 'Así trabajamos',
  title: 'Simple, claro y sin sorpresas',
  subtitle: 'Sabes en todo momento qué estamos haciendo y cuánto cuesta.',
};

export const processSteps = [
  { title: 'Nos escribes', text: 'Por WhatsApp o el formulario. Nos cuentas qué necesitas, sin compromiso.' },
  { title: 'Te cotizamos', text: 'Te enviamos una propuesta clara con precio, tiempos y lo que incluye. Sin costo.' },
  { title: 'Creamos', text: 'Trabajamos y te mostramos avances para que opines antes de terminar.' },
  { title: 'Entregamos y te acompañamos', text: 'Te entregamos todo funcionando y seguimos disponibles para ayudarte.' },
];

// ─── Testimonios ────────────────────────────────────────────────────────
// Reemplaza cada marcador por un testimonio REAL (nombre, negocio, texto y, si se puede, foto o captura).
export const testimonialsSection = {
  eyebrow: 'Opiniones de clientes',
  title: 'Lo que dicen quienes trabajaron con nosotros',
};

export const testimonials = [
  { id: 1, quote: '[TESTIMONIO REAL]', name: '[NOMBRE DEL CLIENTE]', business: '[NEGOCIO / CARGO]' },
  { id: 2, quote: '[TESTIMONIO REAL]', name: '[NOMBRE DEL CLIENTE]', business: '[NEGOCIO / CARGO]' },
  { id: 3, quote: '[TESTIMONIO REAL]', name: '[NOMBRE DEL CLIENTE]', business: '[NEGOCIO / CARGO]' },
];

// ─── Preguntas frecuentes ───────────────────────────────────────────────
export const faqSection = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Resolvemos tus dudas',
};

export const faqData = [
  {
    question: '¿Cuánto cuesta una página web o un sistema?',
    answer: 'Depende de lo que necesites: no es lo mismo una web de presentación que una tienda en línea o un sistema de inventario. Escríbenos por WhatsApp, te hacemos unas preguntas rápidas y te mandamos una cotización clara sin costo.',
  },
  {
    question: '¿Cómo funcionan las invitaciones digitales?',
    answer: 'Eliges un paquete, nos mandas los datos de tu evento (fecha, lugar, fotos, nombres) y te entregamos un link. Lo compartes por WhatsApp y tus invitados ven la ubicación, la hora y confirman asistencia desde su celular.',
  },
  {
    question: '¿Cuánto debo invertir en publicidad en Facebook o TikTok?',
    answer: 'Te recomendamos empezar con al menos Bs 700 al mes en anuncios. Ese dinero se paga directo a Facebook o TikTok; nuestra gestión mensual se cobra aparte según el plan que elijas.',
  },
  {
    question: '¿Cuánto tiempo toma ver resultados con publicidad?',
    answer: 'Los primeros resultados suelen verse entre 7 y 14 días después de lanzar las campañas. Los resultados más estables llegan entre 30 y 60 días, cuando ya hay datos para ajustar la estrategia.',
  },
  {
    question: '¿Necesito tener redes sociales activas para empezar?',
    answer: 'No. Si no tienes presencia en redes, podemos crear y configurar tus perfiles desde cero. Si ya tienes, optimizamos lo que hay.',
  },
  {
    question: '¿Hay contrato mínimo?',
    answer: 'Para publicidad recomendamos al menos 3 meses para ver resultados sólidos, pero trabajamos mes a mes, sin contratos de permanencia forzosa.',
  },
  {
    question: '¿Ofrecen garantía de resultados?',
    answer: 'Nadie serio puede garantizar ventas exactas, porque dependen del producto, el mercado y la competencia. Lo que sí garantizamos es trabajo profesional, optimización constante y transparencia total. Si en los primeros 30 días no ves progreso, ajustamos la estrategia sin costo adicional.',
  },
  {
    question: '¿Qué pasa si no estoy satisfecho?',
    answer: 'Puedes cancelar el servicio al terminar el mes en curso, sin penalidades.',
  },
];

// ─── Planes mensuales de publicidad (precios PROPUESTOS en bolivianos) ──
export const plansSection = {
  eyebrow: 'Planes de publicidad mensual',
  title: 'Publicidad que trabaja todos los meses',
  subtitle: 'Nos encargamos de tus anuncios mes a mes, sin contratos de permanencia forzosa.',
  note: 'La inversión en anuncios se paga aparte, directo a Facebook o TikTok (te recomendamos desde Bs 700 al mes). Si en los primeros 30 días no ves progreso, ajustamos la estrategia sin costo adicional.',
};

export const plans = [
  {
    id: 'basico',
    name: 'Básico',
    price: 'Bs 1.200',
    period: '/mes',
    tagline: 'Para emprendedores que están empezando',
    features: [
      'Anuncios en 1 red (Facebook/Instagram o TikTok)',
      '4 diseños o videos cortos al mes',
      'Configuración y seguimiento de campañas',
      'Textos para tus anuncios',
      'Reporte de resultados y soporte por WhatsApp',
    ],
  },
  {
    id: 'crecimiento',
    name: 'Crecimiento',
    price: 'Bs 2.500',
    period: '/mes',
    tagline: 'Para negocios que quieren vender más',
    highlighted: true,
    features: [
      'Anuncios en Facebook, Instagram y TikTok',
      '8 diseños o videos al mes',
      'Página de ventas (landing) incluida',
      'Mensajes automáticos para atender por WhatsApp',
      'Reporte y reunión mensual de resultados',
    ],
  },
  {
    id: 'empresa',
    name: 'Empresa',
    price: 'A cotizar',
    period: '',
    tagline: 'Solución completa a tu medida',
    features: [
      'Todo lo del plan Crecimiento',
      'Página web o tienda online',
      'Producción de video profesional',
      'Sistema a medida (ventas, clientes, inventario)',
      'Asesoría continua',
    ],
  },
];
