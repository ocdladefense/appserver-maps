const UrlMarker = (function () {

    // Currently being used for testing
    function UrlMarker(data) {
        this.data = data || null;
        this.url = !!data.markerUrl ? data.markerUrl : data;
        this.position = !!data.position ? data.position : { lat: null, lng: null };

        if (this.url === null) {
            console.log(data);
        }
    }

    function setPosition(position) {
        this.position = position;
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
            window.infoWindow = initInfoWindow(marker.data);
            window.infoWindow.open(map, marker);
        });

        return marker;
    }

    function initInfoWindow(contact) {
        // Info window for marker, showing marker details
        // Currently only set up for members
        return new google.maps.InfoWindow({
            content:
                `<div id="infoWindow">
                    <div>
                        <label style="text-align:center;"><b>${contact.name || ""}</b></label><br><br>
                    </div>
                    <div>
                        <label>${contact.phone || ""}</label><br>
                        <label>${contact.email || ""} </label><br>
                    </div><br>
                    <address>
                        <label>${contact.mailingAddress.street}</label><br>
                        <label>
                            ${contact.mailingAddress.city || ""}, ${contact.mailingAddress.state || contact.mailingAddress.country || ""} ${contact.mailingAddress.postalCode || ""}
                        </label><br>
                    </address><br>
                </div>`
        });

    }

    UrlMarker.prototype = {
        createMarker: createMarker,
        initInfoWindow: initInfoWindow,
        setPosition: setPosition
    };

    return UrlMarker;
})();