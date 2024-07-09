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

$id = $_POST['id'];

$query = $conn->prepare("DELETE FROM location WHERE id = ?");
if (!$query) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query preparation failed: " . $conn->error;    
    $output['data'] = [];
    
    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

$query->bind_param("i", $id);
$query->execute();

if ($query->affected_rows === 0) {
    $output['status']['code'] = "204";
    $output['status']['name'] = "no content";
    $output['status']['description'] = "no rows deleted";
    $output['data'] = [];
} elseif ($query->errno) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query execution failed: " . $query->error;    
    $output['data'] = [];
} else {
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['data'] = [];
}

$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

mysqli_close($conn);

echo json_encode($output);

?>
