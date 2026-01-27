<?php
// test_db.php - Sube esto a tu public_html para probar
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>Prueba de Conexión a Base de Datos</h1>";

// TUS DATOS (Verifica que sean exactos)
$host = "localhost";
$user = "u763946012_admin"; 
$password = "Marketingmistico2026"; // ASEGÚRATE QUE ESTA SEA LA CONTRASEÑA CORRECTA
$dbname = "u763946012_u12345678_nomb"; 

echo "<p>Intentando conectar con usuario: <strong>$user</strong>...</p>";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("<h2 style='color:red'>FALLÓ LA CONEXIÓN:</h2> " . $conn->connect_error);
}

echo "<h2 style='color:green'>¡CONEXIÓN EXITOSA!</h2>";

echo "<p>Intentando insertar un dato de prueba en la tabla 'Leads'...</p>";

$id = uniqid();
$fecha = date("Y-m-d H:i:s");
$sql = "INSERT INTO Leads (id, nombre, email, pais, whatsapp, servicio, status, timestamp) VALUES ('$id', 'TEST PRUEBA', 'test@test.com', 'Testland', '00000', 'Prueba Script', 'nuevo', '$fecha')";

if ($conn->query($sql) === TRUE) {
    echo "<h2 style='color:green'>¡INSERT EXITOSO!</h2>";
    echo "<p>Revisa tu phpMyAdmin, debería haber una fila nueva.</p>";
} else {
    echo "<h2 style='color:red'>ERROR AL INSERTAR:</h2> " . $conn->error;
}

$conn->close();
?>
