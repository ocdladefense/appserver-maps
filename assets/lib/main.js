/**
 * Main entry point to initialize a MapApplication.
 *
 * MapApplication will consume one or more datasources/Callouts from
 *  the MapDatasource repository and one or more MapFeatures.
 */


// Instatiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config);
const mapTheme = new OCDLATheme();

// myMap.setConfig(config);
//myMap.setTheme(mapTheme);


// myMap.setRepository(repository)
myMap.loadFeatures(features);

// Render the map to the page
// After the map finished initializing, get and set the users 
// location to the center point of the map
let init = myMap.init().then(function () {
	// initOCDLAHome();
	// const marker = new CustomMarker("url");
	// myMap.render(marker);
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

