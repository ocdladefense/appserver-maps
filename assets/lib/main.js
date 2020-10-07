/**
 * Main entry point to initialize a MapApplication.
 *
 * MapApplication will consume one or more datasources/Callouts from
 *  the MapDatasource repository and one or more MapFeatures.
 */


// Instatiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config);
const mapTheme = new OCDLATheme();


// myMap.setRepository(repository)
myMap.loadFeatures(features);

// Load data for members here


// Set up a config for the OCDLA home marker
let ocdlaConfig = {
	url: '/modules/maps/assets/markers/ocdlaMarker/ocdla-marker-round-origLogo.svg',
	position: {
		lat: 44.044570,
		lng: -123.090780
	}
};

// Render the map to the page
// After the map finished initializing, get and set the users 
// location to the center point of the map
let init = myMap.init().then(function () {
	/*

	// Init the OCDLA home icon
	let ocdlaMarker = new UrlMarker(ocdlaConfig);
	ocdlaMarker.markers.push(ocdlaMarker.createMarker());
	myMap.render(ocdlaMarker.markers);

	// Testing new UrlMarker class
	let urlConfig = {
		url: '/modules/maps/assets/markers/members/member-marker-round-white-green.svg',
		position: {
			lat: 44.059810,
			lng: -121.310770
		}
	};

	let urlMarker = new UrlMarker(urlConfig);
	urlMarker.markers.push(urlMarker.createMarker());
	myMap.render(urlMarker.markers);


	// Testing GoogleMarker Class -- pass in text for the label, and the color of the text
	let googleConfig = {
		label: {
			text: 'H',
			color: '#FFFFFF'
		},
		position: {
			lat: 45.518927,
			lng: -122.677148
		}
	};

	let googleMarker = new GoogleMarker(googleConfig);
	googleMarker.markers.push(googleMarker.createMarker());
	myMap.render(googleMarker.markers);


	// Testing new CustomMarker class -- pass in a fill and stroke color
	let customConfig = {
		fillColor: '#FF2D00',
		strokeColor: '#FFFFFF',
		position: {
			lat: 44.719750,
			lng: -123.918090
		}
	};

	let customMarker = new CustomMarker(customConfig);
	customMarker.markers.push(customMarker.createMarker());
	myMap.render(customMarker.markers);

	*/
});



/**
 * Let the user turn features on and off.
 */
function handleEvent(e) {
	var target = e.target;
	var featureName = target.dataset && target.dataset.featureName;
	if (!featureName) return;



	if (myMap.isVisible(featureName)) {
		target.classList.remove("feature-active");
		myMap.hideFeature(featureName);
	} else {
		myMap.showFeature(featureName);
		target.classList.add("feature-active");
	}

}


document.addEventListener("click", handleEvent, true);

