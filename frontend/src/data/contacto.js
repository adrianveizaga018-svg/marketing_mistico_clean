// Datos de contacto centralizados: cambia el número aquí y se actualiza en toda la página.
export const WHATSAPP_NUMBER = '59169612395';
export const WHATSAPP_DISPLAY = '+591 696 12395';

export const whatsappMessages = {
  general: 'Hola Marketing Místico 👋 Quiero una cotización para mi negocio.',
  web: 'Hola Marketing Místico 👋 Quiero cotizar una página web para mi negocio.',
  sistemas: 'Hola Marketing Místico 👋 Necesito un sistema a medida para mi negocio. ¿Podemos conversar?',
  publicidad: 'Hola Marketing Místico 👋 Quiero vender más con publicidad en Facebook / TikTok.',
  diseno: 'Hola Marketing Místico 👋 Necesito diseño para mi marca (logo, posts o identidad).',
  fotovideo: 'Hola Marketing Místico 👋 Quiero cotizar foto y video para mi negocio.',
  invitaciones: 'Hola Marketing Místico 👋 Quiero una invitación digital para mi evento.',
  dudas: 'Hola Marketing Místico 👋 Tengo unas preguntas sobre sus servicios.',
};

export const waLink = (message = whatsappMessages.general) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
