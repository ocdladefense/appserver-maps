const Marker = (function() {


		/**
		 * Marker - represent a wrapper object that 
		 *   links a map marker to
		 *   a related object.
		 *  The related object is used, for example,
		 *   to display the map marker.
		 */
    function Marker(data) {
    	this.relatedTo = data;
    }
    
		function setIcon(icon) {
			this.icon = icon;
		}
		
		function setLabel(label) {
			this.label = label;
		}
		
		function setRelated(obj) {
			this.relatedTo = obj;
		}
		
		function setColor(color) {
			this.color = color;
		}
		
		function setPosition(pos) {
			this.position = pos;
		}
		
		function setStyle(style) {
			if(!style) throw new Error("INVALID_DATA_ERROR: The given style is invalid.");
			this.style = style.getVendorObject();
		}

    
    function getVendorObject(vendor) {        
      	vendor = vendor || "google.maps.Marker";
      	
				let marker = new google.maps.Marker({
						map: null,
						animation: google.maps.Animation.DROP,
						position: this.position,
						icon: this.style
						// label: this.style
				});
     
     		return marker;  
    }  	
    
    function addEventListener() {
        /* Add a click event listener for the info window
        marker.addListener("click", () => {
            // Set up the info window when clicked
        		window.markerInfoWindow = new google.maps.InfoWindow({
        			content: this.relatedTo.getInfo()
        		});
            window.markerInfoWindow.open(map, marker);
        });
            // initMapInfoWindow(marker);
            // window.markerInfoWindow.open(map, marker);
        });
				
				
        return marker;
        */
    }
    
    /**
     * Add an infoWindow to the marker.
     */
    // This needs to be adjusted
    function getInfo() {
        return this.related.getInfo();
    }
    

    Marker.prototype = {
    	setPosition: setPosition,
    	setStyle: setStyle,
    	getVendorObject: getVendorObject
    };
    
    
    return Marker;
})();