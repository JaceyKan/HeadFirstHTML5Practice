window.onload = getMyLocation;

function getMyLocation() {
	if(navigator.geolocation) {
		//console.log(navigator.geolocation);
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert("Oops, no geolocation support");
	}
}

function displayLocation(position) {
	//console.log(position);
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "Your are at Latitude: " + latitude + ", Longitude: " + longitude;

	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
}

function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position is not available",
		3: "Request timed out"
	};

	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 1) {
		errorMessage = errorMessage + " " + error.message;
	}

	var div = document.getElementById("location");
	div.innerHTML = errorMessage + " " + error.message;

	showMap(position.coords);
}

function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	//console.log(startLatRads);
	var Radius = 6371;
	var distance = Math.acos(
					Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) * 
					Math.cos(startLongRads - destLongRads)
					) * Radius;

	//console.log( destCoords );
	return distance;
}

function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
}

var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
};

var map;

function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude,
													coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.mapTypeId.ROADMAP
	};

	console.log(googleLatAndLong);
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
}