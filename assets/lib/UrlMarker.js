const UrlMarker = (function () {

    // Currently being used for testing
    function UrlMarker(data) {
        this.data = data;
        this.url = data.markerUrl || null
        this.position = data.position;
    }

    function createMarker() {
        let marker = new google.maps.Marker({
            map: null,
            animation: google.maps.Animation.DROP, // Animation options - BOUNCE & DROP
            position: this.position,
            icon: {
                url: this.url,
                scaledSize: new google.maps.Size(30, 42)
            },
            data: this.data
        });

        return marker;
    }

    UrlMarker.prototype = {
        createMarker: createMarker
    };

    return UrlMarker;
})();