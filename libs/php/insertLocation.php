<?php
// example use from browser
// http://localhost:8081/Proj2/libs/php/insertLocation.php?name=New%20Location

// remove next two lines for production
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
    
    mysqli_close($conn);

    echo json_encode($output);
    exit;
}

// Check for 'name' parameter
if (!isset($_POST['name']) || empty($_POST['name'])) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "bad request";
    $output['status']['description'] = "missing or empty 'name' parameter";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
    $output['received'] = $_POST; // Debugging

    mysqli_close($conn);

    echo json_encode($output);
    exit;
}

// Insert new location
$query = $conn->prepare("INSERT INTO location (name) VALUES (?)");
$query->bind_param("s", $_POST['name']);
$query->execute();

if ($query === false) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";    
    $output['data'] = [];
    $output['error'] = $conn->error; // Debugging

    mysqli_close($conn);

    echo json_encode($output); 

    exit;
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = [];

mysqli_close($conn);

echo json_encode($output);
?>
