const MapConfiguration = (function () {


    function MapConfiguration(initial) {
			this.apiKey = initial.apiKey;
			this.target = initial.target;
			this.repository = initial.repository;
			this.theme = initial.theme;
			this.enableHighAccuracy = initial.enableHighAccuracy;
			this.start = initial.start;
			this.theme = initial.theme;
			this.zoom = initial.zoom;
			this.styles = [
				{
						featureType: "poi",
						elementType: "labels",
						stylers: [{
								visibility: "off"
						}]
				}
			];
			
    }

    
    function getGoogleMapConfiguration() {
    	return {
					zoom: this.zoom,
					center: { lat: this.start.latitude, lng: this.start.longitude },
					styles: this.styles
			};
    }



    MapConfiguration.prototype = {
        getConfig: getGoogleMapConfiguration
    };


    return MapConfiguration;
})();