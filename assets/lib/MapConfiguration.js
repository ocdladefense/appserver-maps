const MapConfiguration = (function () {


	function MapConfiguration(initial) {
		this.apiKey = initial.apiKey;
		this.target = initial.target;
		this.repository = initial.repository;
		this.mapOptions = initial.mapOptions;
		this.enableHighAccuracy = initial.enableHighAccuracy;
	}


	function getGoogleMapConfiguration() {
		return {
			zoom: this.mapOptions.zoom,
			center: { lat: this.mapOptions.center.lat, lng: this.mapOptions.center.lng },
			styles: this.mapOptions.styles,
			disableDefaultUI: true
		};
	}



	MapConfiguration.prototype = {
		getConfig: getGoogleMapConfiguration
	};


	return MapConfiguration;
})();