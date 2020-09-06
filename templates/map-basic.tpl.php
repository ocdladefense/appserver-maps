<?php
/**
 * 
 * Template to render a map.
 */
?>
		<style type="text/css">
			#map {
				height: 100%;
			}
			html, body {
				height: 100%;
				margin: 0;
				padding: 0;
			}
		</style>


		<script type="text/javascript">
			let map;

			function initMap() {
				// Set the styles for the map
				let mapStyles =
						[
								{
										featureType: "poi",
										elementType: "labels",
										stylers: [{
												visibility: "off"
										}]
								}
						];

				// Set options for google map, center = Vancouver
				let options = {
						zoom: 9,
						center: { lat: 45.633331, lng: -122.599998 },
						styles: mapStyles
				};

				// Create the map
				map = new google.maps.Map(document.getElementById("map"), options);
			}						
		</script>

		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB7xT16UiXsYTLS5_LaGLswFCPmA5tNVK8&amp;callback=initMap"></script>

<div id="map">
</div>