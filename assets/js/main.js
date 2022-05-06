/**
 * Main entry point to initialize a MapApplication.
 *
 * MapApplication will consume one or more datasources/Callouts from
 *  the MapDatasource repository and one or more MapFeatures.
 */
//import { config, mapinit, features } from "./config";
import MapApplication from '../../node_modules/@ocdladefense/google-maps/MapApplication.js';
import MapFeature from '../../node_modules/@ocdladefense/google-maps/MapFeature.js';
import UrlMarker  from '../../node_modules/@ocdladefense/google-maps/UrlMarker.js';

// Instantiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config);


// Render the map to the page
// After the map finished initializing, get and set the users 

let init = myMap.init(mapinit).then(function () {
	//Hides the filters until data is loaded
	myMap.hideFilters();
	//console.log("map loaded");
	
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

window.query1 = {
	where:[{field:"Name",value:"Thad Higgins"}],
	limit:null
};
let query2 = {
	where:null,
	limit:25
};
window.contactQuery = function(qb) {
	// Construct a config object.
    let config = {
		name: "search",
		label: "search",
		markerLabel: "SE",
		markerStyle: "/modules/maps/assets/markers/members/member-marker-round-black.png"
	};

	let f = new MapFeature(config);

	myMap.addFeature(f);

	function doSearch(qb) {

		let body = JSON.stringify(qb);
		console.log(body);

		// $search = cache["custom"];
	  let $search = fetch("/maps/search",{
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached	
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		  'Content-Type': 'application/json',
		  'Accept': 'text/html'
		  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: body
	  }).then(resp => {
		return resp.json();
	  });
	
	  let $members = $search.then(members => {
		return members.map(member => {
		  let newMember = new Member(member);
		  return newMember;
		});
	  });
	
	  return $members;
	}

	f.setDatasource(doSearch.bind(null,qb));
	
	
	// Load the feature's data.
	f.loadData();

	// Load the feature's markers.
	f.loadMarkers();
};


export default contactQuery;