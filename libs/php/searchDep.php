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

	// SQL statement accepts parameters and is prepared to avoid SQL injection.
	// $_REQUEST used for development / debugging. Remember to change to $_POST for production

    $query = $conn->prepare('
        SELECT 
            d.id AS departmentID,
            d.name AS departmentName,
            COUNT(p.id) AS empCount,
            l.id AS locationID,
            l.name AS locationName
        FROM department d
        LEFT JOIN personnel p ON d.id = p.departmentID
        LEFT JOIN location l ON d.locationID = l.id
        WHERE d.id LIKE ? OR d.name LIKE ? OR l.name LIKE ?
        GROUP BY d.id, d.name, l.id, l.name
        ORDER BY d.id, d.name, l.name
    ');

    $likeText = "%" . $_REQUEST['txt'] . "%";

    $query->bind_param("sss", $likeText, $likeText, $likeText);

	$query->execute();
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
    
	$result = $query->get_result();

    $found = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($found, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['found'] = $found;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>
