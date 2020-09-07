const User = (function () {
    // Variable to hold the users location
    let currentLocation;
    let defaultLocation;

    // Constructor - assign default coordinates
    function User(coords) {
        defaultLocation = coords;
    }

    // Return the users current location
    function getCoordinates() {
        return currentLocation || defaultLocation;
    }

    function setUserLocation(coords) {
        currentLocation = coords;
    }

    // This function will get the device coordinates from the user while they're moving.
    function watchPosition() {

    }
    
    function getCurrentLocation() {
			// Set up the Promise to get the current users coordinates
			return new Promise(function (resolve, reject) {
					window.navigator.geolocation.getCurrentPosition(resolve);
			});
    }
    

		/*
		init.then(function() {
				locationProcess.then(function (position) {
						user.setUserLocation(position.coords);
						myApp.pan(user.getCoordinates());
				});
		});
		*/

    // Set up the prototype obj
    var prototype = {
        getCoordinates: getCoordinates,
        setUserLocation: setUserLocation,
        getCurrentLocation: getCurrentLocation
    };
    User.prototype = prototype;




    // Return the class
    return User;
})();

