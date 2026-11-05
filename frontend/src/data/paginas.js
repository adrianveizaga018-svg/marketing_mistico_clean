// Contenido de las páginas propias: /eventos, /auditoria, /mantenimiento.
// Los [MARCADORES] son datos que debes completar tú (no los inventamos).

export const eventosPage = {
  seoTitle: 'Invitaciones digitales con pase QR | Marketing Místico · La Paz',
  seoDescription: 'Invitaciones digitales para bodas, quinceañeros, cumpleaños y eventos: invitación personal por WhatsApp, confirmación de asistencia, pase QR y control de ingreso.',
  qrSection: {
    eyebrow: 'Pases QR y control de asistencia',
    title: 'Sabes quién viene y quién llegó',
    items: [
      { icon: 'Send', title: 'Invitación personal', text: 'Cada invitado recibe su propio link por WhatsApp: "Querida Luciana, tu invitación es válida para 2 personas".' },
      { icon: 'CheckCircle', title: 'Confirmación sin llamar', text: 'Tus invitados confirman con un toque y nunca pueden registrar más personas de las que invitaste.' },
      { icon: 'QrCode', title: 'Pase QR de entrada', text: 'Al confirmar, cada invitado recibe un pase con código QR y su nombre para mostrar en la puerta.' },
      { icon: 'ScanLine', title: 'Control en la puerta', text: 'Escaneas el QR con el celular y ves al instante quién llegó. Sin listas de papel.' },
    ],
  },
};

export const auditoriaPage = {
  seoTitle: 'Diagnóstico digital y de seguridad para tu negocio | Marketing Místico',
  seoDescription: 'Revisamos tu web, dominio, correos, respaldos, contraseñas y cuentas. Recibes un informe claro con plan de acción. Precio fijo.',
  hero: {
    eyebrow: 'Diagnóstico digital y de seguridad',
    title: '¿Tu negocio está en riesgo y no lo sabes?',
    subtitle: 'Revisamos tu web, tus correos, tus cuentas y tus respaldos, y te entregamos un informe claro con lo que hay que arreglar primero.',
    price: '[PRECIO]',
    priceNote: 'Precio fijo, sin sorpresas',
  },
  checks: [
    { icon: 'Globe', title: 'Sitio web y hosting', text: 'Que esté seguro, actualizado y sin errores que alejen clientes.' },
    { icon: 'Mail', title: 'Dominio y correos', text: 'Quién es dueño de tu dominio, si vence pronto y si tus correos llegan.' },
    { icon: 'DatabaseBackup', title: 'Respaldos', text: 'Si existen copias de tu información y si de verdad se pueden recuperar.' },
    { icon: 'KeyRound', title: 'Contraseñas y accesos', text: 'Quién tiene acceso a qué y si tus cuentas tienen verificación en dos pasos.' },
    { icon: 'Share2', title: 'Redes y cuentas de anuncios', text: 'Quién administra tus páginas y tus cuentas publicitarias.' },
    { icon: 'Cpu', title: 'Sistemas que usas', text: 'Los programas y sistemas de tu negocio: riesgos y puntos débiles.' },
  ],
  report: {
    title: 'Qué recibes',
    items: [
      'Informe con semáforo: verde, amarillo y rojo para cada punto',
      'Lista de riesgos ordenada por urgencia',
      'Plan de acción paso a paso, en lenguaje simple',
      'Reunión para explicarte el informe: [DURACIÓN]',
    ],
  },
  steps: [
    { title: 'Escríbenos', text: 'Nos cuentas qué usa tu negocio: web, correos, redes, sistemas.' },
    { title: 'Agendamos', text: 'Coordinamos la fecha y los accesos que necesitamos para revisar.' },
    { title: 'Recibes tu informe', text: 'Te entregamos el informe y el plan de acción en [PLAZO].' },
  ],
  faq: [
    { q: '¿Tengo que darles mis contraseñas?', a: 'Solo pedimos los accesos necesarios para revisar. Al terminar te recomendamos cambiar las contraseñas que compartiste.' },
    { q: '¿Y si encuentran problemas?', a: 'El informe te dice cómo resolverlos. Puedes hacerlo tú, con tu equipo, o pedirnos ayuda: tú decides.' },
    { q: '¿Sirve si mi negocio es pequeño?', a: 'Sí. Justamente los negocios pequeños son los que menos se protegen y los que más pierden cuando algo falla.' },
  ],
};

export const mantenimientoPage = {
  seoTitle: 'Mantenimiento y soporte mensual para tu web y sistemas | Marketing Místico',
  seoDescription: 'Planes mensuales de mantenimiento: hosting, respaldos, actualizaciones de seguridad y cambios pequeños para que tu web y tus sistemas siempre funcionen.',
  hero: {
    eyebrow: 'Mantenimiento y soporte mensual',
    title: 'Olvídate de que tu web se caiga',
    subtitle: 'Nos encargamos del hosting, los respaldos, las actualizaciones y los cambios pequeños. Tú te dedicas a tu negocio.',
  },
  plans: [
    {
      id: 'basico',
      name: 'Básico',
      price: '[PRECIO]',
      tagline: 'Para webs de presentación',
      features: ['Hosting y vigilancia de tu web', 'Respaldo mensual', 'Actualizaciones de seguridad', 'Soporte por WhatsApp'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '[PRECIO]',
      tagline: 'Para webs que generan ventas',
      highlighted: true,
      features: ['Todo lo del plan Básico', 'Respaldos semanales', '[N] cambios pequeños al mes', 'Respuesta en [TIEMPO DE RESPUESTA]'],
    },
    {
      id: 'empresa',
      name: 'Empresa',
      price: '[PRECIO]',
      tagline: 'Para sistemas y plataformas',
      features: ['Todo lo del plan Pro', 'Mantenimiento de tu sistema a medida', 'Prioridad en la atención', 'Reporte mensual de estado'],
    },
  ],
  smallChanges: {
    title: '¿Qué es un "cambio pequeño"?',
    items: ['Cambiar textos, precios o fotos', 'Agregar un producto, curso o servicio', 'Actualizar datos de contacto u horarios', 'Publicar un aviso o promoción'],
  },
};
