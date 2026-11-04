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
