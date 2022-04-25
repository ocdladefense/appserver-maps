const UrlMarker = (function () {

    // Currently being used for testing
    function UrlMarker(data) {
        this.data = !!data.position ? data : null;
        this.url = !!data.markerUrl ? data.markerUrl : data;
        this.position = !!data.position ? data.position : { lat: null, lng: null };

        if (this.url === null) {
            console.log(data);
        }
    }

    function setPosition(position) {
        this.position = position;
    }


    function setIconSize(size) {
        this.size = { height: size.height, width: size.width };
    }


    function createMarker() {
        // Check to see if the marker has a default size property
        let defaultMarkerSize = !!this.size ? this.size : null;

        let marker = new google.maps.Marker({
            map: null,
            animation: google.maps.Animation.DROP, // Animation options - BOUNCE & DROP
            position: this.position,
            icon: {
                url: this.url || null,
                scaledSize: !!defaultMarkerSize ? new google.maps.Size(defaultMarkerSize.height, defaultMarkerSize.width) : new google.maps.Size(30, 33)
            },
            title: !!defaultMarkerSize ? "OCDLA" : null,
            data: this.data
        });

        // Add a click event listener for the info window
        marker.addListener("click", function () {

            // Close any open info windows before creating a new one
            if (window.infoWindow !== undefined) {
                window.infoWindow.close();
            }

            /**
             * If the marker doesn't have data to show the user, do not open an info window
             *  Currently the only marker without data is the OCDLA icon 
             */
            if (marker.data != null) {
                // Set up the info window when clicked
                window.infoWindow = initInfoWindow(marker.data);
                window.infoWindow.open(map, marker);
            }
        });

        return marker;
    }

    function initInfoWindow(marker) {

        // Check the marker type (contact or court)
        if (marker.type == "Member") {
            // Info window for contact marker, showing marker details
            return new google.maps.InfoWindow({
                content:
                    `<div id="infoWindow">
                        <div>
                            <label style="text-align:center;"><b>${marker.name || ""}</b></label><br><br>
                        </div>
                        <div>
                        <label>${marker.primary || ""}</label><br>
                        </div>
                        <div>
                            <label>${marker.phone || ""}</label><br>
                            <label>${marker.email || ""} </label><br>
                        </div><br>
                        <address>
                            <label>${marker.mailingAddress.street}</label><br>
                            <label>
                                ${marker.mailingAddress.city || ""}, ${marker.mailingAddress.state || marker.mailingAddress.country || ""} ${marker.mailingAddress.postalCode || ""}
                            </label>
                        </address>
                    </div>`
            });
        }

        return new google.maps.InfoWindow({
            // Info window for circuit court locations
            content:
                `<div id="infoWindow" style="text-align:center;">
                    <div>
                        <strong><label style="text-align:center;">${marker.name}</label><br></strong>
                    </div>
                    <div>
                     Court info not yet implemented
                    </div>
                    <!--
                    <div>
                        <label>${marker.mailingAddress}</label><br>
                        <label>${marker.city}, ${marker.state} ${marker.zipcode}</label><br>
                    </div><br>  
                    <div>
                        <label>${marker.district}<br>
                            <a href="https://${marker.website}">${marker.website}</a>   
                        </label>
                    </div> 
                    -->
                </div>`
        });


    }

    UrlMarker.prototype = {
        createMarker: createMarker,
        initInfoWindow: initInfoWindow,
        setPosition: setPosition,
        setIconSize: setIconSize
    };

    return UrlMarker;
})();

export default UrlMarker;