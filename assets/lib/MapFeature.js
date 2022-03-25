const MapFeature = (function () {

	// This config is used to assist sorting all members into each 
	// 	perspective feature (used in loadMarkers())
	const featureLabelConfig = {
		null: "academic",
		ADMIN: "administration",
		admin: "administration",
		A: "exec_investigator", // Need to change this name 
		N: "nonlawyer/regular",
		R: "regular",
		S: "sustaining",
		L: "lifetime",
		LL: "library",
		H: "honored",
		T: "teamMember"
	};


	function MapFeature(feature) {
		this.isInitialized = false;
		this.name = feature.name;
		this.label = feature.label;
		this.data = feature.data || [];
		this.markers = [];
		this.markerStyle = feature.markerStyle;
		this.datasource = feature.datasource || null;

		// For testing...
		//console.log("Marker config for feature, ", this.name, " is: ", this.marker);
	}

	function setDatasource(callout) {
		this.datasource = callout;
	}

	/**
	 * Consistently returns Promises for use with .then().
	 */
	function loadData() {
		console.log(this);
		//send method lives in Callout.js
		this.data = this.datasource.send(this);
	}

	function loadCourts() {
		const courts = new Courts();
		return courts.getCourts();
	}

	function initialize() {
		this.isInitialized = true;
		//this.loadData();
		this.markers = this.loadMarkers();
		console.log(this);
	}


	function render(targetMap) {
		this.markers.forEach(function (marker) { marker.setMap(targetMap); });
	}

	function clone() {
		return new MapFeature(this.config)
	}

	function hide() {
		this.markers.forEach(function (marker) {
			marker.setMap(null);
		});
	}


	function getMarkers() {
		return this.markers;
	}

	// Creates the marker then passes the marker to the map
	function loadMemberMarkers(features) {
		// Handle the response from getMarkerData()
		return this.data.then((sources) => {
			let markers = [];

			// Console logging errors for now
			let errors = [];

			// create the markers
			for (let i = 0; i < sources.length; i++) {
				// Get the member
				let member = sources[i];

				// Get the feature based on the members status
				let featureName = featureLabelConfig[member.status];

				let feature = features.find(element => element.name == featureName);

				// Some members may not have a mailing address on file
				if (member.mailingAddress.latitude !== null) {

					// Set the source for the marker URL
					member.markerUrl = feature.markerStyle;


					let urlMarker = new UrlMarker(member);
					let newMarker = urlMarker.createMarker();

					/**
					 * Push the new marker to the appropriate arrays
					 * 	One to the specific feature, then one that will get
					 * 	returned to the allMembers feature
					 */
					markers.push(newMarker);
					feature.markers.push(newMarker);
				}
				else {
					// Push the member to the error array if any issues occur
					errors.push(member);
				}

			}

			// console log the errors array if needed
			if (errors.length > 0) {
				console.log("Some members do not have an available address:");
				// console log members without addresses
				console.log(errors);
			}


			console.log(features);
			// Return the markers array to fill the allMembers feature
			return markers;
		});
	}

	function loadCourtMarkers(courts) {
		var markers = []
		for (var i = 0; i < courts.data.length; i++) {
			let court = courts.data[i];

			// Set up the marker style for the court
			court.markerUrl = courts.markerStyle;

			let urlMarker = new UrlMarker(court);
			let newMarker = urlMarker.createMarker();
			markers.push(newMarker);
		}

		return markers;
	}



	var prototype = {
		loadData: loadData,
		loadCourts: loadCourts,
		loadMemberMarkers: loadMemberMarkers,
		loadCourtMarkers: loadCourtMarkers,
		getMarkers: getMarkers,
		render: render,
		hide: hide,
		setDatasource: setDatasource,
		initialize: initialize
	};

	MapFeature.prototype = prototype;

	return MapFeature;
})();