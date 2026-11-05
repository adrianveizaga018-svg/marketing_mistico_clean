// Se ejecuta después de "npm run build".
// WhatsApp, Facebook y Google NO ejecutan JavaScript: para que cada página muestre su propio
// título y descripción al compartirla, creamos build/<ruta>/index.html con esos datos ya escritos.
const fs = require('fs');
const path = require('path');

const SITE = 'https://marketingmistico.com';
const pages = {
  'vende-mas': ['Vende más | Publicidad, diseño y páginas web en La Paz', 'Publicidad en Facebook y TikTok, diseño, foto y video, páginas web y tiendas online con Vendly para negocios de Bolivia.'],
  organiza: ['Organiza tu negocio | Sistemas a medida y chatbots en La Paz', 'Sistemas a medida, sistemas para instituciones educativas, chatbots de WhatsApp con IA y capacitación a empresas.'],
  protege: ['Protege tu negocio | Auditoría, mantenimiento y respaldos', 'Diagnóstico y auditoría de sistemas, mantenimiento mensual, respaldos y seguridad para negocios de Bolivia.'],
  eventos: ['Invitaciones digitales con pase QR | Marketing Místico', 'Invitación personal por WhatsApp, confirmación de asistencia, pase QR y control de ingreso para bodas, quinceañeros y eventos.'],
  auditoria: ['Diagnóstico digital y de seguridad | Marketing Místico', 'Revisamos tu web, dominio, correos, respaldos, contraseñas y cuentas. Informe claro con plan de acción. Precio fijo.'],
  mantenimiento: ['Mantenimiento mensual de webs y sistemas | Marketing Místico', 'Hosting, respaldos, actualizaciones de seguridad y cambios pequeños para que tu web y tus sistemas siempre funcionen.'],
};

const build = path.join(__dirname, '..', 'build');
const base = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const setMeta = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${esc(value)}$2`);

for (const [route, [title, description]] of Object.entries(pages)) {
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, 'name', 'description', description);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:url', `${SITE}/${route}`);
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);
  html = setMeta(html, 'name', 'twitter:url', `${SITE}/${route}`);
  fs.mkdirSync(path.join(build, route), { recursive: true });
  fs.writeFileSync(path.join(build, route, 'index.html'), html);
}
console.log(`meta-paginas: ${Object.keys(pages).length} páginas con su propia vista previa`);
