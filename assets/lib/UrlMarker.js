const UrlMarker = (function () {

    // Currently being used for testing
    function UrlMarker(data) {
        this.data = data;
        this.url = data.markerUrl || null
        this.position = data.position;

        if (this.url === null) {
            console.log(data);
        }
    }

    function createMarker() {
        let marker = new google.maps.Marker({
            map: null,
            animation: google.maps.Animation.DROP, // Animation options - BOUNCE & DROP
            position: this.position,
            icon: {
                url: this.url || null,
                scaledSize: new google.maps.Size(30, 33)
            },
            data: this.data
        });

        // Add a click event listener for the info window
        marker.addListener("click", function () {

            // Close any open info windows before creating a new one
            if (window.infoWindow !== undefined) {
                window.infoWindow.close();
            }
            // Set up the info window when clicked
            initInfoWindow(marker);
            window.infoWindow.open(map, marker);
        });

        return marker;
    }

    function initInfoWindow(marker) {
        // Info window for marker, showing marker details
        // Currently only set up for members
        window.infoWindow = new google.maps.InfoWindow({
            content:
                `<div id="infoWindow">
                    <div>
                        <label style="text-align:center;"><b>${marker.data.name || ""}</b></label><br><br>
                    </div>
                    <div>
                        <label>${marker.data.phone || ""}</label><br>
                        <label>${marker.data.email || ""} </label><br>
                    </div><br>
                    <address>
                        <label>${marker.data.mailingAddress.street}</label><br>
                        <label>
                            ${marker.data.mailingAddress.city || ""}, ${marker.data.mailingAddress.state || marker.data.mailingAddress.country || ""} ${marker.data.mailingAddress.postalCode || ""}
                        </label><br>
                    </address><br>
                </div>`
        });

    }

    UrlMarker.prototype = {
        createMarker: createMarker,
        initInfoWindow: initInfoWindow
    };

    return UrlMarker;
})();