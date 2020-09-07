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
			latitude: 42.633331,
			longitude: -122.599998
    },
    zoom: 6
};



/**
 * Describe MapFeatures that can be layered 
 *  onto the map.
 */
const features = {

	regular: {
		name: "regular",
		label: "Regular",
		count: 5,
		markerStyle: new MarkerStyle("R","#660066")
	},
	
	regular: {
		name: "nonlawyer",
		label: "Professional",
		count: 5,
		markerStyle: new MarkerStyle("N","#660066")
	},
	

	sustaining: {
		name: "sustaining",
		label: "Sustaining",
		count: 5,
		markerStyle: new MarkerStyle("S","#660066")
	},
	
	honored: {
		name: "honored",
		label: "Honored",
		count: 5,
		color: "#660066",
		markerStyle: new MarkerStyle("H","#660066")
	},
	
	lifetime: {
		name: "lifetime",
		label: "Lifetime",
		count: 5,
		markerStyle: new MarkerStyle("L","rgba(255,255,255,1.0)")
	},
	
	courts: {
		name: "courts",
		label: "Circuit Courts",
		count: 5,
		markerStyle: new MarkerStyle("C","#660066")
	}
};

