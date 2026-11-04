<?php
// COPIA este archivo como "mm_config.php" y súbelo a Hostinger UN NIVEL ARRIBA de public_html:
//   /home/u763946012/domains/marketingmistico.com/mm_config.php
// Así nadie puede abrirlo desde el navegador. NUNCA lo subas a GitHub (está en .gitignore).

return [
    // Base de datos MySQL (hPanel → Bases de datos). Pon la contraseña NUEVA después de cambiarla.
    'db_host' => 'localhost',
    'db_name' => 'u763946012_u12345678_nomb',
    'db_user' => 'u763946012_admin',
    'db_pass' => 'PON_AQUI_LA_NUEVA_CONTRASEÑA_DE_LA_BASE',

    // Contraseña para entrar al panel /gestion-leads. Usa una larga y distinta a la de la base.
    'admin_password' => 'PON_AQUI_UNA_CLAVE_LARGA_PARA_EL_PANEL',

    // Correo que recibe los avisos de nuevos contactos.
    'notify_email' => 'marketing.mistico.oficial@gmail.com',

    'allowed_origins' => ['https://marketingmistico.com', 'https://www.marketingmistico.com'],
];
