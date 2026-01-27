<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Configuración de Base de Datos (MySQL)
$host = "localhost";
$user = "u763946012_admin"; // Usuario de la imagen
$password = "Marketingmistico2026"; // Debes poner la contraseña que creaste
$dbname = "u763946012_u12345678_nomb"; // Verifica si el nombre termina así o es más largo

$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    // Si falla la conexión, al menos intentamos enviar el correo
    // pero reportamos el error de BD
    error_log("Connection failed: " . $conn->connect_error);
}

// Recibir datos JSON
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

// Función para generar UUID v4
function gen_uuid() {
    return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
        mt_rand( 0, 0xffff ),
        mt_rand( 0, 0x0fff ) | 0x4000,
        mt_rand( 0, 0x3fff ) | 0x8000,
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
    );
}

$id = gen_uuid();
$nombre = $conn->real_escape_string($data->nombre);
$email = $conn->real_escape_string($data->email);
$pais = $conn->real_escape_string($data->pais);
$whatsapp = $conn->real_escape_string($data->whatsapp);
$servicio = $conn->real_escape_string($data->servicio);
$fecha = date("Y-m-d H:i:s");
$status = "nuevo";

// 1. Guardar en Base de Datos (Mapeado a tu tabla existente "Leads")
$sql = "INSERT INTO Leads (id, nombre, email, pais, whatsapp, servicio, status, timestamp) VALUES ('$id', '$nombre', '$email', '$pais', '$whatsapp', '$servicio', '$status', '$fecha')";

$db_success = false;
if ($conn->query($sql) === TRUE) {
    $db_success = true;
} else {
    error_log("Error BD: " . $conn->error);
}

// 2. Enviar Correo Electrónico
$to = "marketing.mistico.oficial@gmail.com"; // Tu correo
$subject = "Nuevo Lead: $nombre - $servicio";
$message = "
Nuevo contacto desde el sitio web:

Nombre: $nombre
Email: $email
País: $pais
WhatsApp: $whatsapp
Servicio: $servicio

Fecha: $fecha
";
$headers = "From: noreply@marketingmistico.com";

$mail_success = mail($to, $subject, $message, $headers);

// Respuesta al Frontend
if ($db_success || $mail_success) {
    echo json_encode(["status" => "success", "message" => "Lead recibido"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al procesar"]);
}

$conn->close();
?>
