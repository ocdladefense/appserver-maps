const Member = (function () {


    function Member(contact) {


				this.status = contact.Member_Status__c;
				this.name = contact.Name;
				this.email = contact.Email;
				this.phone = contact.Phone;
				this.mailingAddress = contact.MailingAddress || "";
				this.position = { lat: contact.MailingLatitude, lng: contact.MailingLongitude };
    }
    


    var prototype = {
    	getPosition: function() { return this.position; }
    };
    Member.prototype = prototype;

    return Member;
})();