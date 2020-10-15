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

// Set up the features and load in the data
myMap.loadFeatures(features);
myMap.loadFeatureData();


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

