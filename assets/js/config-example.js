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
		count: 5,
		config: {
			marker: {
				label: "L",
				color: "#660066",
				style: new CustomMarkerStyle()
			}
		}
	},
	sustaining: {
		name: "sustaining",
		label: "Sustaining",
		count: 5,
		config: {
			marker: {
				label: "S",
				color: "#660066",
				style: new CustomMarkerStyle()
			}
		}
	},
	
	honored: {
		name: "honored",
		label: "Honored",
		count: 5,
		color: "#660066",
		config: {
			marker: {
				label: "S",
				color: "#660066",
				style: new CustomMarkerStyle()
			}
		}
	},
	
	regular: {
		name: "regular",
		label: "Regular",
		count: 5,
		config: {
			marker: {
				label: "R",
				color: "#660066",
				style: new CustomMarkerStyle()
			}
		}
	},
	
	courts: {
		name: "courts",
		label: "Circuit Courts",
		count: 5,
		config: {
			marker: {
				label: "C",
				color: "#660066",
				style: new CustomMarkerStyle()
			}
		}
	}
};

