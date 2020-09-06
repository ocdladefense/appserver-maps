const Marker = (function() {



    function Marker(data) {
    	this.animation = google.maps.Animation.DROP;
    }
    

		function setIcon(icon) {
			this.icon = icon;
		}
		
		function setLabel(label) {
			this.label = label;
		}
		
		function setColor(color) {
			this.color = color;
		}
		
		function setPosition(pos) {
			this.position = pos;
		}

    
    function getVendorObject(vendor) {        
      	vendor = vendor || "google.maps.Marker";
      	
				let marker = new google.maps.Marker({
						map: null,
						animation: google.maps.Animation.DROP,
						position: this.position,
						/* icon: this.icon, */
						label: {
							text: "R",
							color: "rgba(255,255,255,1.0)"
						}
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
    	setPosition: setPosition,
    	getVendorObject: getVendorObject
    };
    
    
    return Marker;
})();