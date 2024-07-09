let locations = [];
let departments = [];

$(document).ready(function() {
    // Initial data loading
    loadPersonnelData();
    loadDepartmentsData();
    loadLocationsData();

    // Event listener for search input keyup
$("#searchInp").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        console.log(value);

        // Search personnel data if value is not empty, otherwise reload data
        if (value.length > 0) {
            searchPersonnelData(value);
            searchDepartmentData(value);
            searchLocationData(value);
        } else {
            loadPersonnelData();
            loadDepartmentsData();
            loadLocationsData();
        }
    });

    // REFRESH button click handler
    $("#refreshBtn").click(function () {
        if ($("#personnelBtn").hasClass("active")) {
            loadPersonnelData();
        } else if ($("#departmentsBtn").hasClass("active")) {
            loadDepartmentsData();
        } else {
            loadLocationsData();
        }
    });
});

// Function to load personnel data
function loadPersonnelData() {
    console.log('Loading personnel data...');
    $.ajax({
        url: "libs/php/getAll.php",
        type: 'GET',
        success: function(response) {
            console.log('Personnel data loaded:', response);
            if (response && response.status && response.status.code === '200') {
                updatePersonnelTable(response.data);
            } else {
                console.error('Failed to load personnel data:', response ? response.status.description : 'Invalid response structure');
                alert('Error: Unable to load personnel data.');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX error:', textStatus, errorThrown);
            alert('Error: Unable to load personnel data.');
        }
    });
}

// Function to update personnel table

// Function to update personnel table
function updatePersonnelTable(personnelData) {
    console.log('Updating table with data:', personnelData);
    var tableBody = $('#personnelTableBody');
    tableBody.empty(); // Clear existing data
    personnelData.forEach(function(person) {
        var row = '<tr>';
        row += '<td class="align-middle text-nowrap d-none"">' + person.id + '</td>';
        row += '<td class="align-middle text-nowrap">' + person.lastName + ', ' + person.firstName + '</td>';
        row += '<td class="align-middle text-nowrap d-none ">' + person.jobTitle + '</td>';
        row += '<td class="align-middle text-nowrap d-none d-md-table-cell">' + person.department + '</td>';
        row += '<td class="align-middle text-nowrap d-none d-md-table-cell">' + person.location + '</td>';
        row += '<td class="align-middle text-nowrap d-none d-md-table-cell">' + person.email + '</td>';

        row += '<td class="text-end text-nowrap">';
        row += '<button type="button" class="btn btn-primary btn-sm editPersonnelBtn" data-id="' + person.id + '" data-bs-toggle="modal" data-bs-target="#editPersonnelModal">';
        row += '<i class="fa-solid fa-pencil fa-fw"></i>';
        row += '</button>';
        row += '<button type="button" class="btn btn-primary btn-sm" data-id="' + person.id + '" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal">';
        row += '<i class="fa-solid fa-trash fa-fw"></i>';
        row += '</button>';
        row += '</td>';
        row += '</tr>';
        tableBody.append(row);
    });
}

// Function to load departments data
function loadDepartmentsData() {
    console.log('Loading departments data...');
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            console.log('Departments data loaded:', response.data);
            if (response && response.status && response.status.code === '200') {
                updateDepartmentTable(response.data);
            } else {
                console.error('Failed to load departments data:', response ? response.status.description : 'Invalid response structure');
                alert('Error: Unable to load departments data.');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX error:', textStatus, errorThrown);
            alert('Error: Unable to load departments data.');
        }
    });
}

// Function to update departments table
// Function to update departments table
function updateDepartmentTable(departmentData) {
    console.log('Updating table with data:', departmentData);
    var tableBody = $('#departmentTableBody');
    tableBody.empty(); // Clear existing data
    departmentData.forEach(function(dep) {
        var row = '<tr>';
        row += '<td class="align-middle text-nowrap d-none d-md-table-cell">' + dep.name + '</td>';
        row += '<td class="align-middle text-nowrap d-none d-md-table-cell">' + dep.location + '</td>';
        row += '<td class="align-middle text-nowrap d-none ">' + dep.empCount + '</td>';
        row += '<td class="text-end text-nowrap">';
        row += '<button type="button" class="btn btn-primary btn-sm updateDepartmentForm" data-bs-toggle="modal" data-bs-target="#updateDepartmentModal" data-id="' + dep.id + '" data-name="' + dep.name + '">';
        row += '<i class="fa-solid fa-pencil fa-fw"></i>';
        row += '</button> ';
        row += '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="' + dep.id + '" data-name="' + dep.name + '">';
        row += '<i class="fa-solid fa-trash fa-fw"></i>';
        row += '</button>';
        row += '</td>';
        row += '</tr>';
        tableBody.append(row);
    });
}


// Function to load locations data
function loadLocationsData() {
    console.log('Loading locations data...');
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'GET',
        success: function(response) {
            console.log('Locations data loaded:', response);
            if (response && response.status && response.status.code === '200') {
                updateLocationTable(response.data);
            } else {
                console.error('Failed to load locations data:', response ? response.status.description : 'Invalid response structure');
                alert('Error: Unable to load locations data.');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX error:', textStatus, errorThrown);
            alert('Error: Unable to load locations data.');
        }
    });
}

function updateLocationTable(locationData) {
    console.log('Updating table with data:', locationData);
    var tableBody = $('#locationTableBody');
    tableBody.empty(); // Clear existing data

    locationData.forEach(function(loc) {
        var row = '<tr>';
        row += '<td class="align-middle text-nowrap d-none ">' + loc.id + '</td>';
        row += '<td class="align-middle text-nowrap d-none d-md-table-cell">' + loc.name + '</td>';
        row += '<td class="text-end text-nowrap">';
        row += '<button type="button" class="btn btn-primary btn-sm updateLocationForm" data-bs-toggle="modal" data-bs-target="#updateLocationModal" data-id="' + loc.id + '">';
        row += '<i class="fa-solid fa-pencil fa-fw"></i>';
        row += '</button>';
        row += '<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteLocationModal" data-id="' + loc.id + '">';
        row += '<i class="fa-solid fa-trash fa-fw"></i>';
        row += '</button>';
        row += '</td>';
        row += '</tr>';

        tableBody.append(row);
    });
}


// Searching Funtion  in:
// Personnel data
function searchPersonnelData(searchText) {
    $.ajax({
        url: 'libs/php/SearchAll.php',
        type: 'GET',
        data: { txt: searchText },
        dataType: 'json',
        success: function(response) {
            console.log(response);
            if (response.status.code === "200") {
                updatePersonnelTable(response.data.found);
            } else {
                alert('No results found.');
                loadPersonnelData();
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
}
//Department Data

function searchDepartmentData(searchText) {
    console.log('Initiating search with text:', searchText); // Log the search text
    
    $.ajax({
        url: 'libs/php/searchDep.php',
        type: 'GET',
        data: { txt: searchText },
        dataType: 'json',
        success: function(response) {
            console.log('Search request successful');
            console.log('Full response:', response.data.found); // Log the full response
            
            if (response.status.code === "200") { // Ensure status exists and code is 200
                console.log('Search results found:', response.data.found); // Log the found data
                updateDepartmentTable(response.data.found); // Assuming response.data.found is the correct path to the data
            } else {
                console.warn('No results found'); // Warn if no results found
                alert('No results found.');
                loadDepartmentsData(); // Reload department data
            }
        },
        error: function(xhr, status, error) {
            console.error('Search request failed'); // Log error details
            console.error('Status:', status);
            console.error('Error:', error);
            alert('Error: ' + error);
        }
    });
}
//Location Data
function searchLocationData(searchText) {
    $.ajax({
        url: 'libs/php/searchLoc.php',
        type: 'GET',
        data: { txt: searchText },
        dataType: 'json',
        success: function(response) {
            console.log(response);
            if (response.status.code === "200") { 
                console.log(response.data.found) ;          
                updateLocationTable(response.data.found);
            } else {
                alert('No results found.');
                loadLocationsData();
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
}
//Adding personnel, data ,location
$("#addBtn").click(function () {

    if ($('#personnelBtn').hasClass('active')) {
        $('#addPersonnelModal').modal('show');
    }

    if ($('#departmentsBtn').hasClass('active')) {
        $('#addDepartmentModal').modal('show');
    }

    if ($('#locationsBtn').hasClass('active')) {
        $('#addLocationModal').modal('show');
    }
});

//Adding personnel-  Event listener for personnel form submission
$("#addPersonnel").on("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var jobTitle = $("#jobTitle").val();
    var departmentId = $("#department").val();

    $.ajax({
        url: 'libs/php/insertPersonnel.php',
        type: 'POST',
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            jobTitle: jobTitle,
            departmentID: departmentId
        },
        success: function(response) {
            if (response.status.code === '200') {
                loadPersonnelData();
                $("#insertPersonnel")[0].reset(); // Reset the form
                $("#addPersonnelModal").modal('hide'); // Close the modal
            } else {
                alert('Error: Unable to add personnel.');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
});
//Adding department-  Event listener for department form submission
$("#addDepartment").on("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    var departmentName = $("#departmentName").val();
    var locationId = $("#departmentLocation").val();

    $.ajax({
        url: 'libs/php/insertDepartment.php',
        type: 'POST',
        data: { name: departmentName, locationID: locationId },
        success: function(response) {
            if (response.status.code === '200') {
                loadDepartmentsData();
                $("#departmentForm")[0].reset(); // Reset the form
                $("#addDepartmentModal").modal('hide'); // Close the modal
            } else {
                alert('Error: Unable to add department.');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
});
//Adding location-  Event listener for location form submission
$("#addLocation").on("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    var locationName = $("#locationName").val();

    $.ajax({
        url: 'libs/php/insertLocation.php',
        type: 'POST',
        data: { name: locationName },
        success: function(response) {
            if (response.status.code === '200') {
                loadLocationsData();
                $("#addLocation")[0].reset(); // Reset the form
                $("#addLocationModal").modal('hide'); // Close the modal
            } else {
                alert('Error: Unable to add location.');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
});

//Loading Data when the tabs are clicked

$("#personnelBtn").click(function () {
    loadPersonnelData();
});

$("#departmentsBtn").click(function () {
    loadDepartmentsData();
});

$("#locationsBtn").click(function () {
    loadLocationsData();
});

//EDIT FEATURES

//Personnel 

function fetchPersonnelDetails(personnelId) {
    $.ajax({
        url: 'libs/php/getPersonnelByID.php',
        type: 'GET',
        data: { id: personnelId },
        success: function(response) {
            console.log(response);  // Log the entire response to understand its structure
            if (response.status.code === '200') {
                if (Array.isArray(response.data.personnel) && response.data.personnel.length > 0) {
                    var personnel = response.data.personnel.find(person => person.id == personnelId);
                    if (personnel) {
                        console.log('Fetched personnel:', personnel);
                        var departments = response.data.department;
                        console.log(departments);
                        var department = departments.find(dept => dept.id == personnel.departmentID);
                        var departmentName = department ? department.name : '';
                        console.log(departmentName);
                        populatePersonnelForm(personnel, departmentName); // Pass personnel and department name
                    } else {
                        alert('Error: No personnel details found.');
                    }
                } else {
                    alert('Error: No personnel details found.');
                }
            } else {
                alert('Error: Unable to fetch personnel details.');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
}

// Function to populate the personnel form with the fetched data
function populatePersonnelForm(personnel, departmentName) {
    $('#editPersonnelFirstName').val(personnel.firstName);
    $('#editPersonnelLastName').val(personnel.lastName);
    $('#editPersonnelEmailAddress').val(personnel.email);
    $('#editPersonnelDepartment').val(departmentName); // Set the department name
    $('#editPersonnelEmployeeID').val(personnel.id); // Use the personnel.id here
}

// Event listener for showing the edit personnel modal
$('#editPersonnelModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var personnelId = button.data('id'); // Extract info from data-* attributes
    fetchPersonnelDetails(personnelId);  // Use the personnel ID to fetch details

});

// Event listener for form submission
$("#editPersonnelForm").on("submit", function(event) {
    event.preventDefault();
    updatePersonnel();
});
// Function to update personnel details
function updatePersonnel() {
    var formData = {
        id: $("#editPersonnelEmployeeID").val(),
        firstName: $("#editPersonnelFirstName").val(),
        lastName: $("#editPersonnelLastName").val(),
        email: $("#editPersonnelEmailAddress").val(),        
        departmentID: $("#editPersonnelDepartment").val()
    };

    $.ajax({
        url: 'libs/php/updatePersonnel.php',
        type: 'POST',
        data: formData,
        success: function(response) {
            if (response.status.code === '200') {
                loadPersonnelData(); // This function should reload your personnel list
                $("#editPersonnelModal").modal('hide');
            } else {
                alert('Error: Unable to update personnel.');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
}
//Departments

// Event listener for showing the edit department modal
$('#updateDepartmentModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var deptId = button.data('id'); // Extract info from data-* attributes
    console.log('Department ID:', deptId); // Log the department ID to verify
    fetchDepartmentDetails(deptId); // Fetch department details
});

// Fetch department details and populate the modal fields
function fetchDepartmentDetails(deptId) {
    $.ajax({
        url: 'libs/php/getDepartmentByID.php',
        type: 'GET',
        data: { id: deptId },
        success: function(response) {
            if (response.status.code === "200") {
                var department = response.data;
                var department = response.data;
                console.log(department);
                $('#updateDepartmentName').val(department.name);
                $('#updateDepartmentLocation').val(department.location);
                $('#updateDepartmentID').val(department.departmentId); 
                populateDepartmentForm(department)
            } else {
                        alert('Error: Department with ID ' + deptId + ' not found.');
                   
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
}

// Function to populate the department form with the fetched data
function  populateDepartmentForm(department) {  
      $('#updateDepartmentID').val(department.departmentId);
      $('#updateDepartmentLocation').val(department.location)
      $('#updateDepartmentName').val(department.name);       
    
    
}

// Function to update department data
function updateDepartment(departmentId, name, locationId) {
    $.ajax({
        url: 'libs/php/updateDepartment.php',
        type: 'POST',
        data: {
            departmentId: departmentId,
            name: name,
            locationId: locationId
        },
        success: function(response) {
            if (response.status.code === 200) {
                console.log('Department updated successfully');
                loadDepartmentsData();
                $("#updateDepartmentModal").modal('hide');
            } else {
                alert('Error: Unable to update department.');
                console.error('Response status:', response.status);
            }
        },
        error: function(xhr, status, error) {
            console.log("Update error: ", error);
            alert('Error: ' + error);
        }
    });
}

// Event listener for updating department
$("#updateDepartmentForm").on("submit", function(event) {
    event.preventDefault();
    var departmentId = $("#updateDepartmentId").val();
    var departmentName = $("#updateDepartmentName").val();
    var locationId = $("#updateDepartmentLocationId").val();

    updateDepartment(departmentId, departmentName, locationId);
});

// Event listener for showing the update department modal
$('#updateDepartmentModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var departmentId = button.data('id'); // Extract info from data-* attributes
    var departmentName = button.data('name');
    var locationId = button.data('location-id');

    $("#updateDepartmentId").val(departmentId);
    $("#updateDepartmentName").val(departmentName);
    $("#updateDepartmentLocationId").val(locationId);
});

 // Event listener for editing location
 $('#updateLocationModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var locationId = button.data('id');

    $.ajax({
        url: 'libs/php/getLocationByID.php',
        type: 'GET',
        data: { id: locationId },
        success: function(response) {
            console.log(response);
            if (response.status.code === '200') {
                var location = response.data;
                console.log(location);
                $('#updateLocationCity').val(location.name);
                $('#updateLocationId').val(location.id); // Add the location ID to a hidden field
            } else {
                alert('Error: Unable to fetch location details.');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
});

// Event listener for saving edited location
$("#updateLocationForm").on("submit", function(event) {
    event.preventDefault();
    var locationId = $("#updateLocationId").val(); // Get the location ID from the hidden field
    var locationName = $("#updateLocationCity").val();

    $.ajax({
        url: 'libs/php/location.php',
        type: 'POST',
        data: {
            id: locationId, // Include the location ID in the request
            name: locationName
        },
        success: function(response) {
            if (response.status.code === '200') {
                loadLocationsData();
                $("#updateLocationModal").modal('hide'); // Close the modal
            } else {
                alert('Error: Unable to update location.');
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });

});

//DELETE:

// Event listener for showing the delete personnel modal and setting the ID
$('#deletePersonnelModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var personnelId = button.data('id');
    var personnelName = button.data('name');
    
    var modal = $(this);
    modal.find('#deletePersonnelId').val(personnelId);
    modal.find('#areYouSurePersonnelName').text(personnelName);
    console.log("Personnel ID to delete: " + personnelId); // Debug: Check the personnel ID
});

// Event listener for confirming personnel deletion
$("#deletePersonalBtn").on("click", function(event) {
    var personnelId = $("#deletePersonnelId").val();
    console.log("Deleting Personnel ID: " + personnelId);  // Debug: Check the personnel ID

    $.ajax({
        url: 'libs/php/delPersonnel.php',
        type: 'POST',
        data: { 
            id: personnelId 
        },
        success: function(response) {
            console.log("Delete response: ", response);  // Debug: Check the response from server
            if (response.status.code === "200") {
                loadPersonnelData();  // Function to reload personnel data
                $("#deletePersonnelModal").modal('hide');
            } else {
                alert('Error: Unable to delete personnel. ' + response.status.description);
                console.error('Response status:', response.status);  // Additional debug information
            }
        },
        error: function(xhr, status, error) {
            console.log("Delete error: ", error);  // Debug: Check any error during the request
            alert('Error: ' + error);
        }
    });
});

// Event listener for showing the delete department modal and setting the ID
$('#deleteDepartmentModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var departmentId = button.data('id');
    var departmentName = button.data('name');
    
    var modal = $(this);
    modal.find('#deleteDepartmentId').val(departmentId);
    modal.find('#areYouSureDepartmentName').text(departmentName);
    console.log("Department ID to delete: " + departmentId); // Debug: Check the department ID
});

// Event listener for confirming department deletion
$("#deleteDepartmentBtn").on("click", function(event) {
    var departmentId = $("#deleteDepartmentId").val();
    console.log("Deleting Department ID: " + departmentId);  // Debug: Check the department ID

    $.ajax({
        url: 'libs/php/deleteDepartment.php',
        type: 'POST',
        data: { 
            id: departmentId 
        },
        success: function(response) {
            console.log("Delete response: ", response);  // Debug: Check the response from server
            if (response.status.code === "200") {
                loadDepartmentsData();  // Function to reload department data
                $("#deleteDepartmentModal").modal('hide');
            } else {
                alert('Error: Unable to delete department. ' + response.status.description);
                console.error('Response status:', response.status);  // Additional debug information
            }
        },
        error: function(xhr, status, error) {
            console.log("Delete error: ", error);  // Debug: Check any error during the request
            alert('Error: ' + error);
        }
    });
});

// Event listener for showing the delete location modal
$('#deleteLocationModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var locationId = button.data('id');
    var locationName = button.data('name');
    
    $('#deleteLocationId').val(locationId); // Add the location ID to a hidden field
    $('#deleteLocationName').text(locationName); // Display the location name in the modal
});

// Event listener for confirming location deletion
$("#deleteLocBtn").on("click", function(event) {
    var locationId = $("#deleteLocationId").val(); // Get the location ID from the hidden field

    console.log("Deleting Location ID: " + locationId); // Debugging: Ensure the correct ID is being sent

    $.ajax({
        url: 'libs/php/delLocation.php',
        type: 'POST',
        data: { id: locationId },
        success: function(response) {
            console.log("Delete response: ", response); // Debugging: Check the response from the server
            if (response.status.code === '200') {
                loadLocationsData();
                $("#deleteLocationModal").modal('hide'); // Close the modal
            } else {
                alert('Error: Unable to delete location.');
                console.error('Response:', response); // Debugging: Log the response for further investigation
            }
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
});

//FILTERING:
//personnel:

$("#filterBtn").click(function () {

    if ($('#personnelBtn').hasClass('active')) {
        //for dept
        var departmentDropdown = $("#filterPersonnelModal #filterPersonnelByDepartment");
        departmentDropdown.html(""); // Have to clear existing options

        departmentDropdown.append(
            $("<option>", {
                value: "",
                text: "All",
            })
        );
        // Populate the "Select Department" dropdown with relevant options
        $.each(departments, function () {
            departmentDropdown.append(
                $("<option>", {
                    value: this.id,
                    text: this.name,
                })
            );
        }); ``
        // for loc
        var locationDropdown = $("#filterPersonnelModal #filterPersonnelByLocation");
        locationDropdown.html(""); // Clear existing options

        locationDropdown.append(
            $("<option>", {
                value: "",
                text: "All",
            })
        );

        // Populate the "Select Location" dropdown with relevant options
        $.each(locations, function () {
            locationDropdown.append(
                $("<option>", {
                    value: this.id,
                    text: this.name,
                })
            );
        });

        $('#filterPersonnelModal').modal('show');
    }

    if ($('#departmentsBtn').hasClass('active')) {

        var locationDropdown = $("#filterDepartmentModal #filterDepartmentByLocation");
        locationDropdown.html(""); // Clear existing options

        locationDropdown.append(
            $("<option>", {
                value: "",
                text: "All",
            })
        );

        // Populate the "Select Location" dropdown with relevant options
        $.each(locations, function () {
            locationDropdown.append(
                $("<option>", {
                    value: this.id,
                    text: this.name,
                })
            );
        });

        $('#filterDepartmentModal').modal('show');
    }

});
$("#filterPersonnelByDepartment").change(function () {
    $("#filterPersonnelByLocation").val('')
    // Get the selected department and location values from the dropdowns
    let requestModal = {
        departmentId: $("#filterPersonnelByDepartment").val()
    }
    $.ajax({
        url: "libs/php/filter_personnel.php", // Replace with the actual endpoint to fetch filtered data
        type: 'POST',
        data: requestModal,
        success: function (data) {
            // Update the "personnelTable" with the filtered data
            let response = JSON.parse(data);
            console.log(response);
            loadPersonalData(responseArray);
        },
        error: function () {
            alert('Error: Unable to fetch filtered data.');
        }

    });
});

$("#filterPersonnelByLocation").change(function () {
    $("#filterPersonnelByDepartment").val('');
    // Get the selected department and location values from the dropdowns
    let requestModal = {
        locationId: $("#filterPersonnelByLocation").val()
    }
    $.ajax({
        url: "libs/php/filter_personnel.php", // Replace with the actual endpoint to fetch filtered data
        type: 'POST',
        data: requestModal,
        success: function (data) {
            // Update the "personnelTable" with the filtered data
            let response = JSON.parse(data);
            console.log(response);
            loadPersonalData(responseArray);
        },
        error: function () {
            alert('Error: Unable to fetch filtered data.');
        }

    });
});

$("#filterDepartmentByLocation").change(function () {
    // Get the selected department and location values from the dropdowns
    let requestModal = {
        locationId: $("#filterDepartmentByLocation").val()
    }
    $.ajax({
        url: "libs/php/filter_department.php", // Replace with the actual endpoint to fetch filtered data
        type: 'POST',
        data: requestModal,
        success: function (data) {
            // Update the "personnelTable" with the filtered data
            let response = JSON.parse(data);
            console.log(response);
            loadDepartmentsData(responseArray);
        },
        error: function () {
            alert('Error: Unable to fetch filtered data.');
        }

    });
});
