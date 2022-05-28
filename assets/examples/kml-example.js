


// https://developers.google.com/maps/documentation/javascript/kml
let src = "https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml";


var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
});
kmlLayer.addListener('click', function(event) {
    var content = event.featureData.infoWindowHtml;
    var testimonial = document.getElementById('capture');
    testimonial.innerHTML = content;
});

