
// Permanent marker for the OCDLA office location in Eugene, OR
function initOCDLAHome() {
    let iconUrl = 'https://ocdla.s3-us-west-2.amazonaws.com/ocdla-logo-soft-marker-black.svg';

    marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: {
            lat: 44.044570,
            lng: -123.090780
        },
        map: myApp.getMap(),
        icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(55, 70)
        }
    });
}



// Recenter map to the users position
function panToUserPosition() {
    // Get the users coordinates and pan to that position
    let position = user.getCoordinates();
    myApp.pan(position);

    // Info Window to show position
    window.userInfoWindow = new google.maps.InfoWindow({
        content: "User Found.",
        position: {
            lat: position.latitude,
            lng: position.longitude,
        },
    });
    // Open the info window
    window.userInfoWindow.open(myApp.getMap());
    myApp.getMap().setZoom(16);
}

// Example to show a users moving position
// Setting up an array of 10 coordinates
// This is just for testing, nothing to fancy here
function movingUserTest() {
    let positions = [];
    let lat = 45.633331;
    let lng = -122.599998;
    let randomNum;

    for (let i = 0; i < 10; i++) {
        randomNum = Math.random();
        positions[i] = {
            latitude: lat + randomNum,
            longitude: lng + randomNum,
        };
    }
    // Replay takes an array of coordinates
    myApp.replay(positions);
}