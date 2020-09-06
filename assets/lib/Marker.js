const Marker = (function() {



    function Marker(data) {
    	this.icon = new MarkerStyle();
    	this.animation = google.maps.Animation.DROP;
    	this.position = data.position;
    	this.data = data.data;
    }
    

    
    function getAsMarker() {        
            
				let marker = new google.maps.Marker({
						map: null,
						animation: google.maps.Animation.DROP,
						position: this.position,
						icon: this.icon,
						data: this.data
				});
       
       	/*
        // Add a click event listener for the info window
        marker.addListener("click", function () {
            // Set up the info window when clicked
            initMapInfoWindow(marker);
            window.markerInfoWindow.open(map, marker);
        });
				*/
				
        return marker;
    }
    
    /**
     * Add an infoWindow to the marker.
     */
    // This needs to be adjusted
    function getInfo() {
        // Info window for marker, showing member details
        let contact = this.contact;
        
				return `<div id="infoWindow">
					<div>
						<label style="text-align:center;"><b>${contact.name}</b></label><br><br>
							</div>
							<div>
									<label>${contact.phone}</label><br>
									<label><a href="mailto:${marker.email}">${contact.email}</a></label><br>
							</div><br>
							<address>
									<label>${contact.mailingAddress.street}</label><br>
									<label>
											${contact.mailingAddress.city}, ${contact.mailingAddress.state} ${contact.mailingAddress.postalCode}
									</label><br>
							</address><br>
							<div>
									<label><b>Occupation:</b> Need to update</label><br>
							</div>
					</div>`
    }
    

    Marker.prototype = {
    	getAsMapMarker: getAsMarker
    };
    
    
    return Marker;
})();