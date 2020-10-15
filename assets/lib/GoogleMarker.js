const GoogleMarker = (function () {

    // Used for creating a standard google marker, config = {labelText, labelColor, position}
    function GoogleMarker(config) {
        this.markers = [];
        this.label = {
            text: config.label.text || null,
            color: config.label.color || null
        };
        this.position = config.position;
    }

    function createMarker() {
        let marker = new google.maps.Marker({
            map: null,
            animation: google.maps.Animation.DROP, // Animation options - BOUNCE
            position: this.position,
            label: {
                text: this.label.text,
                color: this.label.color
            }
        });

        return marker;
    }

    GoogleMarker.prototype = {
        createMarker: createMarker
    };

    return GoogleMarker;
})();