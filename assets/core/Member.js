const Member = (function () {


    function Member(contact) {


				this.status = contact.Member_Status__c;
				this.name = contact.Name;
				this.email = contact.Email;
				this.phone = contact.Phone;
				this.mailingAddress = contact.MailingAddress || "";
				this.position = { lat: contact.MailingLatitude, lng: contact.MailingLongitude };
    }
    
		function getInfo() {
		// Info window for marker, showing member details
			let contact = this;

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
				</div>`;
		}

    var prototype = {
    	getPosition: function() { return this.position; },
    	getInfo: getInfo
    };
    Member.prototype = prototype;

    return Member;
})();