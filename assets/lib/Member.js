const Member = (function () {
    // Set up needed variables
    let lifeMember = {
        firstName: "Jane",
        lastName: "Doe",
        company: "Jacob Accurso Investigations",
        pNumber: "(541) 444-1234",
        email: "jdoe@example.com",
        occupation: "Investigator",
        interests: "Death Penalty, Mental Illness, DUII, Spanish Language, Traffic Issues",
        address: {
            streetAddress: "PO Box 123",
            city: "Siletz",
            state: "OR",
            zipcode: "97380",
        },
        memberStatus: "L"
    };

    let sustainingMember = {
        firstName: "John",
        lastName: "Doe",
        company: "Deschutes Defenders A Public Defense Nonprofit",
        pNumber: "(541) 389-7723 ext. 208",
        email: "jdoe@example.com",
        occupation: "Public Defender",
        interests: "",
        address: {
            streetAddress: "215 NW Greenwood Ave Ste 200",
            city: "Bend",
            state: "OR",
            zipcode: "97703",
        },
        memberStatus: "S"
    };

    let honoredMember = {
        firstName: "Josh",
        lastName: "Doe",
        company: "	Public Defender of Marion Co., Inc.",
        pNumber: "(503) 480-0521",
        email: "jdoe@example.com",
        occupation: "Public Defender",
        interests: "",
        address: {
            streetAddress: "198 Commercial St SE Ste 240",
            city: "Salem",
            state: "OR",
            zipcode: " 97301-3496",
        },
        memberStatus: "H"
    };

    function Member(contact) {
        this.type = "member";
        
				this.position = { lat: contact.MailingLatitude, lng: contact.MailingLongitude };
				this.memberStatus = contact.Member_Status__c;
				this.name = contact.Name;
				this.email = contact.Email;
				this.phone = contact.Phone;
				this.mailingAddress = contact.MailingAddress || "";
    }
    

		// Leave for posterity.
    Member.fromSalesforceContact = function(contact) {

    	
    	// let new Member(position,status);
    };
    

    var prototype = {};
    Member.prototype = prototype;

    return Member;
})();