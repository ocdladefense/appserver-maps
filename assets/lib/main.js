/**
 * Main entry point to initialize a MapApplication.
 *
 * MapApplication will consume one or more datasources/Callouts from
 *  the MapDatasource repository and one or more MapFeatures.
 */
const USE_MOCK_DATASOURCES = true;

const repository = MapDatasources.index(function(feature) {

	let key = null;
	// Must return an instance of Callout to be consumed by a MapFeature.
	if (["regular","nonlawyer","sustaining","lifetime", "honored", "libraries"].includes(feature.name)) {
			key = USE_MOCK_DATASOURCES ? "mockMemberData" : "realMemberData";
	}
	else if (["courts", "libraries", "colleges", "W"].includes(feature.name)) {
			key = USE_MOCK_DATASOURCES ? "mockLocationData" : "mockLocationData";
	}

	console.log("Found repository key ",key," when searching using: ",feature);
	
	
	return key;
});


// Set up a MapConfiguration object
const config = {
    apiKey: "AIzaSyCvKb3IYis6dF0y940d4Ffe_ngP-lTiGZI",
    target: "map",
    repository: repository, // Where to get data consumed by the Map.
		theme: new CustomMapTheme(),
    enableHighAccuracy: true,
    start: {
			latitude: 45.633331,
			longitude: -122.599998
    },
    zoom: 10
};



/**
 * Describe MapFeatures that can be layered 
 *  onto the map.
 */
let features = {
	lifetime: {
		name: "lifetime",
		label: "Lifetime",
		count: 20,
		config: {
			markers: {
				label: "L",
				color: "#660066"
			}
		}
	},
	sustaining: {
		name: "sustaining",
		label: "Sustaining",
		count: 100,
		config: {
			markers: {
				label: "S",
				color: "#660066"
			}
		}
	},
	
	honored: {
		name: "honored",
		label: "Honored",
		count: 20,
		color: "#660066",
		config: {
			markers: {
				label: "S",
				color: "#660066"
			}
		}
	},
	
	regular: {
		name: "regular",
		label: "Regular",
		count: 200,
		config: {
			markers: {
				label: "R",
				color: "#660066"
			}
		}
	},
	
	courts: {
		name: "courts",
		label: "Circuit Courts",
		count: 50,
		config: {
			markers: {
				label: "C",
				color: "#660066"
			}
		}
	}
};










// Instatiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config);
myMap.loadFeatures(features);

// Render the map to the page
// After the map finished initializing, get and set the users 
// location to the center point of the map
let init = myMap.init().then(function() {
    // initOCDLAHome();
});

function fullscreen() {
	document.body.classList.add("fullscreen");
}




/*
 Needs to test whether the feature has been created or not. If 
 feature hasn't been created, create a NEW feature. 
*/


function handleEvent(e) {
	var target = e.target;
	var featureName = target.dataset && target.dataset.featureName;
	if(!featureName) return;
	
	if(myMap.isVisible(featureName)) {
		myMap.hideFeature(featureName);
	} else {
		myMap.showFeature(featureName);
	}
	
}






document.addEventListener("click", handleEvent, true);



/*
init.then(function() {
    locationProcess.then(function (position) {
        user.setUserLocation(position.coords);
        myApp.pan(user.getCoordinates());
    });
});
*/

