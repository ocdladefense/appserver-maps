const MapFeature = (function () {



	function MapFeature(feature) {
		this.isInitialized = false;
		this.name = feature.name;
		this.label = feature.label;
		this.data = feature.data || [];
		this.markers = [];
		//this.count = feature.count;
		this.markerStyle = feature.markerStyle;
		console.log("Marker config for feature, ", this.name, " is: ", this.marker);
	}


	function getInfoWindow(content) {
		window.markerInfoWindow = new google.maps.InfoWindow({
			content: content
		});
	}

	function setDatasource(callout) {
		this.datasource = callout;
	}

	/**
	 * Consistently returns Promises for use with .then().
	 */
	function loadData() {
		console.log(this.datasource);
		this.data = this.datasource.send(this);
	}

	function initialize() {
		this.isInitialized = true;
		this.loadData();
		this.markers = this.loadMarkers();
	}


	/**
	 * Keep in mind this iteration actually hides the other features
	 *  before render the selected feature.
	 */
	function render(targetMap) {
		// Hide any currently open feature before rendering a new one
		// hideFeatures();

		// Make sure the feature has not been initialized 
		// if (!this.isInitialized) {
		// 	// Cache data for later use.
		// 	// Especially in case this MapFeature is cloned.
		// 	this.loadData();
		// 	console.log(this.data);
		// 	this.loadMarkers();

		// 	this.isInitialized = true;
		// }



		this.markers.then(function (markers) {
			markers.forEach(function (marker) { marker.setMap(targetMap); });
		});
	}

	function clone() {
		return new MapFeature(this.config)
	}

	function hide(targetMap) {
		this.markers.forEach(function (marker) {
			marker.setMap(null);
		});
	}


	function getMarkers() {
		return this.markers;
	}

	// Creates the marker then passes the marker to the map
	function loadMarkers() {
		let marker = null;
		//this.datasource.send(this);

		// Handle the response from getMarkerData()
		return this.data.then((sources) => {
			let markers = [];
			// create the markers
			for (let i = 0; i < sources.length; i++) {
				let member = sources[i];

				// Some members may not have a mailing address on file
				if (member.mailingAddress.latitude !== null) {
					// Set the source for the marker URL
					member.markerUrl = this.markerStyle;

					let urlMarker = new UrlMarker(member);
					let newMarker = urlMarker.createMarker();

					// Get the Google Map Marker format.
					markers.push(newMarker);
				}
			}
			return markers;
		});
	}



	var prototype = {
		loadData: loadData,
		loadMarkers: loadMarkers,
		getMarkers: getMarkers,
		render: render,
		setDatasource: setDatasource,
		initialize: initialize
	};

	MapFeature.prototype = prototype;

	return MapFeature;
})();