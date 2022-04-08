/**
 * Main entry point to initialize a MapApplication.
 *
 * MapApplication will consume one or more datasources/Callouts from
 *  the MapDatasource repository and one or more MapFeatures.
 */


// Instantiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config); // Where does config come from?
//---- config comes from init in map application
const mapTheme = new OCDLATheme();



// Render the map to the page
// After the map finished initializing, get and set the users 
let init = myMap.init(mapinit).then(function () {
	console.log("map loaded");
	
	// The OCDLA icon Info Window is currently being unused
	// 
	let ocdlaIcon = new UrlMarker('/modules/maps/assets/markers/ocdlaMarker/ocdla-marker-round-origLogo.svg');
	myMap.render(ocdlaIcon);

	// Set up the features and load in the data
	myMap.loadFeatures(features);
	myMap.loadFeatureData();
});



/**
 * Let the user turn features on and off.
 */
function handleEvent(e) {

	var target = e.target;

	var featureName = target.dataset && target.dataset.featureName;
	if (!featureName) return;

	//console.log(featureName);

	if (myMap.isVisible(featureName)) {
		target.classList.remove("feature-active");
		myMap.hideFeature(featureName);
	}
	else {
		myMap.showFeature(featureName);
		target.classList.add("feature-active");
	}

}


document.addEventListener("click", handleEvent, true);

