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
