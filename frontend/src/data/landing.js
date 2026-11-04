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
  eyebrow: 'Nuevo servicio',
  title: 'Invitaciones digitales que tus invitados sí abren',
  subtitle: 'Tu invitación en un link: la mandas por WhatsApp, tus invitados ven la ubicación, la hora y confirman asistencia con un toque. Tú ves quién viene sin llamar a nadie.',
  events: ['Bodas', 'Quinceañeros', 'Cumpleaños', 'Bautizos', 'Baby shower', 'Graduaciones', 'Eventos de empresa'],
  // Pega aquí el link de una invitación de muestra para mostrar el botón "Ver ejemplo".
  demoUrl: '',
  note: 'Precios en bolivianos. Pago 50% al iniciar y 50% al entregar.',
};

export const invitationPackages = [
  {
    id: 'esencial',
    name: 'Esencial',
    price: 150,
    tagline: 'Para cumpleaños y reuniones',
    delivery: 'Lista en 2 días hábiles',
    features: [
      'Invitación web de una página con tus datos y foto',
      'Diseño a elegir de nuestras plantillas',
      'Cuenta regresiva para el evento',
      'Ubicación con Google Maps',
      'Botón para confirmar por WhatsApp',
      '1 ronda de cambios',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 300,
    tagline: 'Para quinceañeros, bautizos y graduaciones',
    delivery: 'Lista en 3 días hábiles',
    highlighted: true,
    features: [
      'Todo lo del paquete Esencial',
      'Diseño personalizado con tus colores y temática',
      'Galería de hasta 15 fotos',
      'Música de fondo',
      'Itinerario del evento y código de vestimenta',
      'Formulario de confirmación con lista de asistentes',
      '2 rondas de cambios',
    ],
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    price: 500,
    tagline: 'Para bodas y eventos especiales',
    delivery: 'Lista en 5 días hábiles',
    features: [
      'Todo lo del paquete Premium',
      'Animación de apertura tipo sobre',
      'Link personalizado con el nombre de cada invitado',
      'Mesa de regalos o QR para transferencias',
      'Video o historia de la pareja / festejado',
      'Cambios ilimitados hasta el día del evento',
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
    id: 'icalp',
    client: 'Colegio de Abogados de La Paz',
    type: 'Plataforma web',
    description: 'Plataforma institucional y sistema de gestión para colegiados.',
    image: '/thumb_icalp.webp',
    url: 'https://icalp.org.bo',
    linkLabel: 'Ver sitio',
  },
  {
    id: 'caulp',
    client: 'Colegio de Auditores – CAULP',
    type: 'Web e identidad digital',
    description: 'Renovación de la identidad digital y plataforma de servicios para auditores.',
    image: '/thumb_auditores.png',
    url: 'http://caulp.org.bo',
    linkLabel: 'Ver sitio',
  },
  {
    id: 'cenefco',
    client: 'CENEFCO',
    type: 'Producción de video',
    description: 'Videos para promocionar cursos y formación profesional.',
    image: '/thumb_cenefco.webp',
    url: 'https://player.vimeo.com/video/1154013061',
    linkLabel: 'Ver video',
  },
  {
    id: 'pasion-criolla',
    client: 'Pasión Criolla',
    type: 'Video para TikTok y anuncios',
    description: 'Videos verticales de sus platos estrella para redes y publicidad.',
    image: '/thumb_pasion_1.webp',
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
    answer: 'La inversión mínima recomendada es de $300-500 USD al mes para campañas efectivas en Meta Ads, porque permite juntar suficientes datos para optimizar. Ese dinero va directo a la plataforma; nuestra gestión se cobra aparte.',
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
