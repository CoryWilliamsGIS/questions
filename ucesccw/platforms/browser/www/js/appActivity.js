// Code adapted from: https://github.com/claireellul/cegeg077-week5app/blob/master/ucfscde/www/js/appActivity.js

// Assigns leaflet map 
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// Create global marker variables
var testMarkerDRed = L.AwesomeMarkers.icon({ 
	icon: 'play',
	markerColor: 'darkred'
	});
	
var testMarkerRed = L.AwesomeMarkers.icon({ 
	icon: 'play',
	markerColor: 'red'
	});
	
var testMarkerGreen = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'darkgreen'
	}); 
 
var testMarkerOrange = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'orange'
	}); 

// Load Leaflet map
function loadMap() {	// Load the tiles
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',{
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +	
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
}

// Get coordinate values when leaflet map is clicked
mymap.on('click', function(e) {
	document.getElementById("lat").value = e.latlng.lat;
	document.getElementById("lng").value = e.latlng.lng;
});

// Clear any populate fields in the form
function clearForm() {
	document.getElementById("location_name").value = "";
	document.getElementById("question").value = "";
	document.getElementById("answer_1").value = "";
	document.getElementById("answer_2").value = "";
	document.getElementById("answer_3").value = "";
	document.getElementById("answer_4").value = "";
	document.getElementById("lat").value = "";
	document.getElementById("lng").value = "";
}

// Variable that will hold the XMLHttpRequest() 
var client2;
	
// Variable to hold the points once retrieved
var questionPoints;

// create the code to get the question data using an XMLHttpRequest
function getQuestions() {
	client2 = new XMLHttpRequest();
	client2.open('GET','http://developer.cege.ucl.ac.uk:30289/getquestions');
	client2.onreadystatechange = questionResponse; 
	client2.send();
}

// Receive the response from the data server, and process it
function questionResponse() {
	// Wait until data is ready - i.e. readyState is 4
	if (client2.readyState == 4) {
		// Once the data is ready, process the data
		var qData = client2.responseText;
		loadQuestionPoints(qData);
	}
}

// Convert the received data - which is text - to JSON format and add it to the map
function loadQuestionPoints(qData) {
	// Convert the text to JSON
	var questionJSON = JSON.parse(qData);
	// Load the geoJSON layer
	var questionPoints = L.geoJson(questionJSON,
		{
		// Use point to layer to create the points
		pointToLayer: function (feature, latlng)
		{
			// Plot question as orange leaflet marker and put the location name and question in a pop up viewable on click
			return L.marker(latlng, {icon:testMarkerOrange}).bindPopup("<b>"+feature.properties.location_name +"</b>" + "<p>" + feature.properties.question + "</b>");
			},
		}).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(questionPoints.getBounds());
}
