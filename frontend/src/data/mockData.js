// Mock data para Marketing Místico

export const heroData = {
  title: "Convertimos Ideas en Ventas",
  subtitle: "Marketing, publicidad y tecnología para hacer crecer tu negocio",
  description: "Somos la agencia que transforma tu visión en resultados reales. Estrategia, creatividad y datos para impulsar tu marca.",
  ctaPrimary: "Agenda Asesoría Gratuita",
  ctaSecondary: "Ver Nuestros Trabajos"
};

export const autorityData = {
  stats: [
    { number: "150+", label: "Proyectos Exitosos" },
    { number: "3.5M+", label: "En Inversión Publicitaria Gestionada" },
    { number: "98%", label: "Clientes Satisfechos" },
    { number: "5X", label: "ROI Promedio" }
  ],
  badge: "La Diferencia Marketing Místico",
  description: "No somos una agencia más. Somos tu socio estratégico que combina creatividad, tecnología y datos para generar resultados medibles y escalables."
};

export const videosData = [
  {
    id: 1,
    title: "Campaña para E-commerce de Moda",
    description: "Incremento del 340% en ventas online",
    category: "Facebook Ads",
    thumbnail: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: "+340% ventas, -45% costo por adquisición"
  },
  {
    id: 2,
    title: "Lanzamiento de Producto Tech",
    description: "500K impresiones en 30 días",
    category: "TikTok Ads",
    thumbnail: "https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: "500K impresiones, 15K leads generados"
  },
  {
    id: 3,
    title: "Marca Personal - Coach",
    description: "Posicionamiento como autoridad",
    category: "Video + Ads",
    thumbnail: "https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    results: "2M alcance orgánico, +80% engagement"
  }
];

export const servicesData = [
  {
    id: 1,
    icon: "TrendingUp",
    title: "Publicidad Digital Facebook & TikTok",
    problem: "¿Inviertes en publicidad pero no ves resultados claros?",
    solution: "Creamos y gestionamos campañas con estrategia basada en datos reales",
    benefits: [
      "Segmentación láser de tu audiencia ideal",
      "Creatividades que convierten y venden",
      "Optimización diaria para maximizar ROI",
      "Reportes transparentes de cada peso invertido"
    ],
    color: "violet"
  },
  {
    id: 2,
    icon: "Video",
    title: "Producción de Videos Publicitarios",
    problem: "¿Tu contenido no logra captar atención ni generar ventas?",
    solution: "Producimos videos diseñados específicamente para vender en redes",
    benefits: [
      "Guiones persuasivos y hooks irresistibles",
      "Edición profesional de alto impacto",
      "Formato optimizado para cada plataforma",
      "Videos que cuentan historias y cierran ventas"
    ],
    color: "gold"
  },
  {
    id: 3,
    icon: "Megaphone",
    title: "Gestión Completa de Campañas",
    problem: "¿No tienes tiempo o conocimiento para manejar tus anuncios?",
    solution: "Nosotros pagamos, monitoreamos y optimizamos todo por ti",
    benefits: [
      "Inversión publicitaria optimizada",
      "Monitoreo 24/7 de rendimiento",
      "Ajustes en tiempo real para mejores resultados",
      "Tú enfócate en tu negocio, nosotros en vender"
    ],
    color: "violet"
  },
  {
    id: 4,
    icon: "Code",
    title: "Landing Pages de Alta Conversión",
    problem: "¿Tu sitio web no convierte visitantes en clientes?",
    solution: "Diseñamos landing pages pensadas 100% en conversión",
    benefits: [
      "Diseño premium que genera confianza",
      "Copywriting persuasivo orientado a CRO",
      "Optimización para velocidad y SEO",
      "A/B testing para maximizar conversiones"
    ],
    color: "gold"
  },
  {
    id: 5,
    icon: "Laptop",
    title: "Desarrollo Web & Apps",
    problem: "¿Necesitas un sistema personalizado para tu negocio?",
    solution: "Desarrollamos soluciones web a medida que automatizan y escalan",
    benefits: [
      "Sistemas web personalizados",
      "Aplicaciones escalables y seguras",
      "Integración con herramientas de marketing",
      "Automatización de procesos de venta"
    ],
    color: "violet"
  }
];

export const processData = {
  title: "Nuestro Proceso Probado",
  subtitle: "De la estrategia a resultados en 5 pasos",
  steps: [
    {
      number: "01",
      title: "Diagnóstico",
      description: "Analizamos tu negocio, audiencia y competencia para entender qué necesitas realmente."
    },
    {
      number: "02",
      title: "Estrategia",
      description: "Diseñamos un plan personalizado con objetivos claros, KPIs y presupuesto óptimo."
    },
    {
      number: "03",
      title: "Ejecución",
      description: "Implementamos campañas, creamos contenido y desarrollamos los sistemas necesarios."
    },
    {
      number: "04",
      title: "Optimización",
      description: "Monitoreamos, analizamos y ajustamos constantemente para mejorar resultados."
    },
    {
      number: "05",
      title: "Escalamiento",
      description: "Una vez validado, escalamos tu inversión para maximizar el crecimiento."
    }
  ]
};

export const ctaData = {
  title: "¿Listo para Vender Más?",
  subtitle: "Agenda una asesoría estratégica gratuita y descubre cómo podemos hacer crecer tu negocio",
  features: [
    "✓ Análisis inicial sin costo",
    "✓ Estrategia personalizada",
    "✓ Sin compromisos ni letra pequeña"
  ],
  buttonText: "Quiero Vender Más"
};

export const formFields = [
  { name: "nombre", label: "Nombre completo", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "whatsapp", label: "WhatsApp", type: "tel", required: true },
  { 
    name: "servicio", 
    label: "Servicio de interés", 
    type: "select", 
    required: true,
    options: [
      "Publicidad Digital (Facebook/TikTok)",
      "Producción de Videos",
      "Gestión de Campañas",
      "Landing Pages",
      "Desarrollo Web/Apps",
      "Paquete Completo"
    ]
  }
];

export const footerData = {
  tagline: "Transformando negocios con marketing y tecnología",
  email: "hola@marketingmistico.com",
  whatsapp: "+52 123 456 7890",
  social: [
    { name: "Facebook", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "TikTok", url: "#" },
    { name: "LinkedIn", url: "#" }
  ]
};
