<?php

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

// Prepare the SQL statement
$query = $conn->prepare('UPDATE personnel SET firstName=?, lastName=?, email=?, departmentID=? WHERE id=?');

// Check if preparing the statement failed
if (!$query) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query preparation failed";
    $output['data'] = [];

    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

// Bind parameters
$query->bind_param("ssssi", $_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['departmentID'], $_POST['id']);

// Execute the query
$query->execute();

// Check if execution failed
if ($query->errno) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query execution failed";
    $output['data'] = [];

    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

// If everything executed successfully
$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = [];

mysqli_close($conn);

echo json_encode($output);

?>
