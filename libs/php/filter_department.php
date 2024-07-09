<?php
// example use from browser
// http://localhost/companydirectory/libs/php/getFilterOptions.php

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

// Fetch departments
$departments = [];
$deptQuery = $conn->prepare('SELECT id, name FROM department');
$deptQuery->execute();


if (false === $deptQuery) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "department query failed";  
    $output['data'] = [];

    echo json_encode($output); 
    mysqli_close($conn);
    exit;
}

$deptResult = $deptQuery->get_result();

while ($row = mysqli_fetch_assoc($deptResult)) {
    array_push($departments, $row);
}

// Fetch locations
$locations = [];
$locQuery = $conn->prepare('SELECT id, name FROM location');
$locQuery->execute();

if (false === $locQuery) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "location query failed";  
    $output['data'] = [];

    echo json_encode($output); 
    mysqli_close($conn);
    exit;
}

$locResult = $locQuery->get_result();

while ($row = mysqli_fetch_assoc($locResult)) {
    array_push($locations, $row);
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = [
    'departments' => $departments,
    'locations' => $locations
];

echo json_encode($output);

mysqli_close($conn);

?>
