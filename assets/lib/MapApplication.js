const MapApplication = (function () {

    function MapApplication(conf) {
        this.repo = conf.repository;
        this.config = new MapConfiguration(conf);
        this.features = []; // array of MapFeature objects.
        this.map = null;
    }


    function loadFeatures(config) {
        for (var name in config) {
            let f = new MapFeature(config[name]);
            f.setDatasource(this.repo.get(f));
            this.features.push(f);
        }
    }


    // Google maps requires "lat" & "lng" fields
    function setLocation(lat, lng) {
        let coords = null == lng ? lat : this.toCoordinates(lat, lng);

        return {
            lat: coords.latitude,
            lng: coords.longitude
        };
    }

    function toCoordinates(lat, lng) {
        return {
            lat: lat,
            lng: lng
        };
    }

    // Pan will set the center point for the map
    function pan(coordinates) {
        let pos = {
            lat: coordinates.latitude,
            lng: coordinates.longitude
        };

        // Set the new center position
        this.map.setCenter(pos);
    }

    function isVisible(feature) {
        return false;
    }


    function addFeature(feature, callout) {
        callout = callout || this.repository.from
        this.features.push(feature);
    }

    function removeFeature(feature) {
        // Remove something from this.features.
        // Once removed renderAll and hideAll won't have any effect on it.
        // However, removing a feature should probably also "hide" it from the map.
    }


    /**
     * Render any number of map features, layers, geometry or markers.
     */
    function showFeature(name) {
        let f = this.getFeature(name);

        if (!f) {
            console.error("Could not locate Feature, ", name);
            return;
        }

        f.render(this.map);
    }

    /**
     * Hide keeps the data and the feature is still yet initialized.
     */
    function hideFeature(name) {
        let f = this.getFeature(name);

        if (!f) {
            console.error("Could not locate Feature, ", name);
            return;
        }
        f.hide();
    }



    function getFeature(name) {
        console.log(this.features);
        return this.features.find(feature => feature.name == name);
    }

    // Hide multiple features, i.e., all of this map's features.
    function hideFeatures() {
        // Set the map for each marker to null
        for (let i = 0; i < this.features.length; i++) {
            this.features[i].hide();
        }
    }


    // Set up the maps script and initialize the map object
    // Return the Promise
    function init() {

        var apiKey = this.config.apiKey;


        var promise = new Promise(function (resolve, reject) {
            let mapElement = document.createElement("script");
            mapElement.async = true;
            mapElement.defer = true;
            mapElement.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB7xT16UiXsYTLS5_LaGLswFCPmA5tNVK8";
            // + apiKey
            ;// + "&callback=initMap";
            mapElement.onload = resolve;

            document.head.appendChild(mapElement);
        });


        var mapReady = promise.then(() => {
            // How do I extract data from the two params
            //this.map = new google.maps.Map(document.getElementById("map"), this.config.getConfig()); // This line renders the map to the screen
            this.map = new google.maps.Map(document.getElementById("map"), this.config.mapOptions);
        });

        return mapReady;
    }

    function getRoot() {
        return document.getElementById(this.config.get("target"));
    }


    // This will work through an array of coordinates and recenter the map to the coordinates
    // Meant to replicate a users moving position
    function replay(positions) {
        // Set up a counter and a timer to replicate user movements
        let counter = 0;
        let replayTimer = setInterval(function () {
            // Test to see if the end of the array has been met
            if (counter == positions.length - 1) {
                // Clear the timer, console log needed messages, and exit the function
                clearInterval(replayTimer);
                console.log(counter);
                console.log("User position tracking has finished");
                return;
            }

            // Close any currently open userInfoWindows, pan to the new position
            // Console.log the counter to keep track of positions and increment the counter
            window.userInfoWindow.close();
            pan(positions[counter]);
            console.log(counter);
            counter++;
        }, 5000);
    }

    // Testing render here using new marker classes
    function render(markers) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(this.map);
        }
    }


    var prototype = {
        init: init,
        replay: replay,
        pan: pan,
        getMap: function () { return this.map; },
        getRoot: getRoot,
        getFeature: getFeature,
        showFeature: showFeature,
        hideFeature: hideFeature,
        loadFeatures: loadFeatures,
        isVisible: isVisible,
        render: render
    };
    MapApplication.prototype = prototype;


    return MapApplication;
})();