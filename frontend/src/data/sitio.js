// Contenido de la nueva estructura multipágina (PROMPT_LANDING v2).

// Dirección del caso CAULP (cámbiala aquí si hace falta).
export const CAULP_URL = 'https://caulp.org.bo';
// Edita aquí los textos; los componentes solo los muestran.

export const homeHero = {
  eyebrow: 'Ingeniería de sistemas · La Paz, Bolivia',
  title: 'Tu negocio vende más, se organiza',
  titleHighlight: 'y está protegido',
  subtitle: 'Marketing y tecnología con mirada de ingeniero de sistemas: conseguimos clientes para tu negocio, lo ordenamos con sistemas a medida y cuidamos tu información.',
  cta: 'Escríbenos por WhatsApp',
  trustedBy: ['CENEFCO', 'Colegio de Abogados LP', 'Colegio de Auditores', 'ARES', 'Monocroma', 'Pasión Criolla'],
};

export const pillars = [
  {
    id: 'vende-mas',
    path: '/vende-mas',
    icon: 'TrendingUp',
    name: 'Vende más',
    phrase: 'Clientes nuevos cada mes con publicidad y una imagen que convence.',
    examples: ['Publicidad en Facebook y TikTok', 'Diseño, foto y video', 'Páginas web y tiendas online con Vendly'],
  },
  {
    id: 'organiza',
    path: '/organiza',
    icon: 'Cpu',
    name: 'Organiza tu negocio',
    phrase: 'Deja el cuaderno y el Excel: sistemas que trabajan por ti.',
    examples: ['Sistemas a medida', 'Sistemas para instituciones educativas', 'Chatbots de WhatsApp con IA'],
  },
  {
    id: 'protege',
    path: '/protege',
    icon: 'ShieldCheck',
    name: 'Protege tu negocio',
    phrase: 'Que tu web, tus datos y tus cuentas no se caigan ni se pierdan.',
    examples: ['Diagnóstico y auditoría', 'Mantenimiento y soporte mensual', 'Respaldos y seguridad'],
  },
];

export const eventsBand = {
  eyebrow: 'Eventos',
  title: 'Invitaciones digitales con pase QR',
  text: 'Cada invitado recibe su invitación personal por WhatsApp, confirma con un toque y entra mostrando su pase QR. Tú controlas quién llegó desde el celular.',
  points: ['Invitación personal por invitado', 'Confirmación de asistencia', 'Control de ingreso en la puerta'],
  path: '/eventos',
};

export const cases = [
  {
    id: 'caulp',
    client: 'CAULP',
    pillar: 'Organiza',
    title: 'Plataforma del Colegio de Auditores de La Paz',
    text: 'Sitio y plataforma para afiliación, servicios y formación continua, con acceso para colegiados.',
    result: '[RESULTADO REAL]',
    image: '/img/case-caulp.webp',
    url: CAULP_URL,
    linkLabel: 'Ver caulp.org.bo',
  },
  {
    id: 'vendly',
    client: 'Vendly',
    pillar: 'Producto propio',
    title: 'Tiendas online para emprendedores bolivianos',
    text: 'Nuestra plataforma: crea tu tienda, cobra con QR y recibe pedidos por WhatsApp.',
    result: null,
    image: '/img/work-vendly.webp',
    url: 'https://vendly.com.bo',
    linkLabel: 'Ver vendly.com.bo',
  },
  {
    id: 'icalp',
    client: 'Colegio de Abogados de La Paz',
    pillar: 'Organiza',
    title: 'Plataforma institucional y gestión de colegiados',
    text: 'Sitio institucional y sistema de gestión para sus miembros.',
    result: '[RESULTADO REAL]',
    image: '/img/work-icalp.webp',
    url: 'https://icalp.org.bo',
    linkLabel: 'Ver sitio',
  },
];

// Preguntas de la página principal (las detalladas van en cada página interna).
export const homeFaqIds = [0, 1, 5, 6, 7];

// Mensaje del botón flotante de WhatsApp según la página.
export const pageMessages = {
  '/': 'Hola Marketing Místico 👋 Quiero una cotización para mi negocio.',
  '/vende-mas': 'Hola Marketing Místico 👋 Quiero vender más con publicidad y presencia digital.',
  '/organiza': 'Hola Marketing Místico 👋 Quiero organizar mi negocio con un sistema.',
  '/protege': 'Hola Marketing Místico 👋 Quiero proteger los sistemas y la información de mi negocio.',
  '/eventos': 'Hola Marketing Místico 👋 Quiero una invitación digital para mi evento.',
  '/auditoria': 'Hola Marketing Místico 👋 Quiero agendar el diagnóstico digital y de seguridad.',
  '/mantenimiento': 'Hola Marketing Místico 👋 Me interesa el plan de mantenimiento mensual.',
};

export const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Vende más', path: '/vende-mas' },
  { label: 'Organiza', path: '/organiza' },
  { label: 'Protege', path: '/protege' },
  { label: 'Eventos', path: '/eventos' },
  { label: 'Contacto', path: '/#contacto' },
];
