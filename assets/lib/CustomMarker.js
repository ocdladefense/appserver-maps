const CustomMarker = (function () {

    // Currently being used for testing
    // config = {fillColor, strokeColor, position}
    // Set up the icon for the marker
    // Create and push the new marker to the array
    function CustomMarker(config) {
        this.markers = [];
        this.icon = setMarkerStyle(config.fillColor, config.strokeColor);
        this.position = config.position;
    }

    function createMarker() {
        let marker = new google.maps.Marker({
            map: null,
            animation: google.maps.Animation.DROP, // Animation options - BOUNCE
            position: this.position,
            icon: this.icon
        });

        return marker;
    }

    // This function creates a custom colored marker
    function setMarkerStyle(fillColor, strokeColor) {
        return {
            path: 'M 0,0  C -0.7,-9 -3,-14 -5.5,-18.5 ' +
                'A 16,16 0 0,1 -11,-29 ' +
                'A 11,11 0 1,1 11,-29 ' +
                'A 16,16 0 0,1 5.5,-18.5 ' +
                'C 3,-14 0.7,-9 0,0 z ' +
                ['', 'M -2,-28 ' +
                    'a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0'],
            fillColor: fillColor,
            fillOpacity: 1,
            strokeColor: strokeColor,
            strokeWeight: 2,
            scale: 1,
        };
    }

    CustomMarker.prototype = {
        createMarker: createMarker
    };

    return CustomMarker;
})();