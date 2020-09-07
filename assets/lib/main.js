/**
 * Main entry point to initialize a MapApplication.
 *
 * MapApplication will consume one or more datasources/Callouts from
 *  the MapDatasource repository and one or more MapFeatures.
 */









// Instatiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config);
myMap.loadFeatures(features);

// Render the map to the page
// After the map finished initializing, get and set the users 
// location to the center point of the map
let init = myMap.init().then(function() {
    // initOCDLAHome();
});






/*
 Needs to test whether the feature has been created or not. If 
 feature hasn't been created, create a NEW feature. 
*/


function handleEvent(e) {
	var target = e.target;
	var featureName = target.dataset && target.dataset.featureName;
	if(!featureName) return;
	

	
	if(myMap.isVisible(featureName)) {
		target.classList.remove("feature-active");
		myMap.hideFeature(featureName);
	} else {
		myMap.showFeature(featureName);
		target.classList.add("feature-active");
	}
	
}






document.addEventListener("click", handleEvent, true);

