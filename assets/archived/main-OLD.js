// Init a theme variable to access the current theme
let mapTheme = new CustomMapTheme();

// Set up a config object
// Colors = marker color, based on member status
// Map center set to Vancouver, WA by default
// Styles will remove ALL point of interest labels from the map
const config = {
    googleApiKey: "AIzaSyB7xT16UiXsYTLS5_LaGLswFCPmA5tNVK8",
    layouts: {
        colors: {
            L: "#660066",
            S: "rgb(86,101,138)",
            H: "#ccaa39",
        },
    },
    mapOptions: {
        zoom: 9,
        center: null,
        styles: mapTheme.getTheme()
    },
    enableHighAccuracy: true,
};
// Set up the feature variable
let feature;

// Array to hold features
let features = [];

// Set up the mapConfig and pass in the config
const mapConfig = new MapConfiguration(config);

// Default coords for center point of the map
// Set to Vancouver, WA
let defaultCoordinates = {
    latitude: 45.633331,
    longitude: -122.599998,
}

// Instantiate the user variable
const user = new User(defaultCoordinates);

// Set the maps center position to the default 
mapConfig.setLocation(defaultCoordinates);

// Instatiate the app and pass in the mapConfig obj
const myApp = new MapApplication(mapConfig);

// Set up the Promise to get the current users coordinates
var locationProcess = new Promise(function (resolve, reject) {
    window.navigator.geolocation.getCurrentPosition(resolve);
});

// Render the map to the page
// After the map finished initializing, get and set the users 
// location to the center point of the map
myApp.init().then(function () {
    locationProcess.then(function (position) {
        user.setUserLocation(position.coords);
        myApp.pan(user.getCoordinates());
    });
    initOCDLAHome();
});

/*
 Needs to test whether the feature has been created or not. If 
 feature hasn't been created, create a NEW feature. 
*/
function initFeature(featureName, label) {
    // Get the feature, if future does not exist, feature = undefined
    feature = features.find(element => element.name == featureName);

    // Testing here to see if the feature has been created
    if (feature == undefined) {
        let featureConfig = {
            name: featureName,
            label: label,
            color: config.layouts.colors[label] || null,
            map: myApp.getMap()
            // forgot what to add here from thursday
        };

        // Set up the new feature
        feature = new MapFeature(featureConfig);
    }
    // Render the feature to the map
    feature.render();

    // Update the features array
    features = feature.getFeatures();

    // Console.log the features array to see new features as they're created
    console.log(features);
}

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