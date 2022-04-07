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
		T: "teamMember",
		W: "witness"
	};


	function MapFeature(feature) {
		this.isInitialized = false;
		this.name = feature.name;
		this.label = feature.label;
		this.data = feature.data || [];
		this.markers = [];
		this.markerStyle = feature.markerStyle;
		this.status = feature.status;
		this.datasource = feature.datasource.bind(this);

		// For testing...
		//console.log("Marker config for feature, ", this.name, " is: ", this.marker);
	}


	/**
	 * Consistently returns Promises for use with .then().
	 */
	function loadData() {
		//send method lives in Callout.js
		this.data = this.datasource();
		//return this.data;
	}

	function loadCourts() {
		const courts = new Courts();
		return courts.getCourts();
	}

	function loadWitnesses() {
		const witnesses = new Witnesses();
		return witnesses.getWitnesses();
	}

	function initialize() {
		this.isInitialized = true;
		this.loadData();
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

	function loadMarkers(){
        return this.data.then((sources) =>{
			let errors =[];

			for (let i = 0; i < sources.length; i++) {
				// Get the dataset
				let item = sources[i];
				let label = this.getLabel();
				if (item.position.lat == null) continue;
					
				// Set the source for the marker URL
				item.markerUrl = this.markerStyle;


				let urlMarker = new UrlMarker(item);
				let googleMarker = urlMarker.createMarker();

				/**
				 * Push the new marker to the appropriate arrays
				 * 	One to the specific feature, then one that will get
				 * 	returned to the allMembers feature
				 */
				this.markers.push(googleMarker);
			}
		});
	}

	function getLabel()
	{
		return this.markerLabel;
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
	/*function loadWitnessMarkers(witnesses) {
		var markers = []
		for (var i = 0; i < witnesses.data.length; i++) {
			let witness = witnesses.data[i];

			// Set up the marker style for the court
			witness.markerUrl = witnesses.markerStyle;

			let urlMarker = new UrlMarker(witness);
			let newMarker = urlMarker.createMarker();
			markers.push(newMarker);
		}

		return markers;
	}*/

	function loadWitnessMarkers(features) {
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

	var prototype = {
		loadData: loadData,
		loadCourts: loadCourts,
		loadWitnesses: loadWitnesses,
		loadMarkers: loadMarkers,
		getLabel: getLabel,
		loadMemberMarkers: loadMemberMarkers,
		loadCourtMarkers: loadCourtMarkers,
		loadWitnessMarkers: loadWitnessMarkers,
		getMarkers: getMarkers,
		render: render,
		hide: hide,
		initialize: initialize
	};

	MapFeature.prototype = prototype;

	return MapFeature;
})();