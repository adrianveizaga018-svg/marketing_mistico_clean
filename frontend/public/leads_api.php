<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Configuración de Base de Datos (Misma que contact.php)
$host = "localhost";
$user = "u763946012_admin"; 
$password = "Marketingmistico2026"; 
$dbname = "u763946012_u12345678_nomb"; 

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Consultar Leads
$sql = "SELECT * FROM Leads ORDER BY timestamp DESC LIMIT 500";
$result = $conn->query($sql);

$leads = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $leads[] = $row;
    }
}

echo json_encode($leads);

$conn->close();
?>
