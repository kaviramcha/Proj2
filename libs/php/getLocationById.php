<?php

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

// Prepare SQL statement to retrieve location details by ID
$query = $conn->prepare('SELECT id, name FROM location WHERE id = ?');

if ($query === false) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query preparation failed: " . $conn->error;
    $output['data'] = [];

    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

$query->bind_param("i", $_REQUEST['id']);
$query->execute();

if ($query === false) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query execution failed: " . $query->error;
    $output['data'] = [];

    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

$result = $query->get_result();

if ($result->num_rows > 0) {
    $location = $result->fetch_assoc();
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data']['location'] = $location;
} else {
    $output['status']['code'] = "204";
    $output['status']['name'] = "no content";
    $output['status']['description'] = "location not found";
    $output['data'] = [];
}

mysqli_close($conn);
echo json_encode($output);
?>
