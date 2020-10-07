


const MapDatasources = (function () {

	// Example for future fetch
	//let callout = fetch('/member-map-data');

	/*
	Example member

	var member = {
			id: 1,
			firstName: "Jane",
			lastName: "Doe",
			company: "Jacob Accurso Investigations",
			pNumber: "(541) 444-1234",
			email: "jdoe@example.com",
			occupation: "Investigator",
			address: {
					streetAddress: "PO Box 123",
					city: "Siletz",
					state: "OR",
					zipcode: "97380"
			}
	};
	*/

	let positions = {
		lifetime: {
			lat: 44.719750,
			lng: -123.918090
		},
		honored: {
			lat: 44.939530,
			lng: -123.040300
		},
		regular: {
			lat: 44.939530,
			lng: -123.040300
		},
		sustaining: {
			lat: 44.059810,
			lng: -121.310770
		},
		courts: {
			lat: 44.95175,
			lng: -123.035270
		},
		W: {
			lat: 45.504793,
			lng: -122.628375
		},
		O: {
			lat: 44.0472607,
			lng: -123.0909169
		},
		D: {
			lat: 45.518927,
			lng: -122.677148
		}
	};




	/**
	 * Using a starting point, return a pseudo-randomized point 
	 *  within a given radius of `fromPoint`.
	 */
	function randomizeCoordinates(fromPoint, radius) {
		radius = radius || 2.5;
		let returnedPosition = null;

		var pt_angle = Math.random() * 2 * Math.PI;
		var pt_radius_sq = Math.random() * radius * radius;
		var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
		var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

		return {
			lat: fromPoint.lat + pt_x / 2,
			lng: fromPoint.lng + pt_y / 2,
		};
	}

	// Setting up call to get member data
	let phpMemberData = new Callout(function (feature) {
		$contacts = fetch("/maps/contacts").then(function (resp) {
			return resp.json();
		});

		// Contacts 'cause simple reminder this is from the Salesforce Contact object.
		$members = $contacts.then(function (contacts) {
			console.log(contacts);

			return contacts.records.map(function (contact) {
				let newMember = new Member(contact);

				//contact.records.position = { lat: contact.records.MailingAddress.latitude, lng: contact.records.MailingAddress.longitude };
				return newMember;
			});
		});

		return $members;
	});

	// @todo - make some notes about the shape of this Contact object.
	// c.Member_Type__c
	// c.Name, c.MailingXXX, c.Phone, c.Email, c.MailingLatitude, c.MailingLongitude
	let forceMemberData = new Callout(function (feature) {
		var callout = ForceRemoting.invokeAction(null);
		$contacts = callout("MapController", "getMembers", memberTypes[label]);
		console.log($contacts);

		// Contacts 'cause simple reminder this is from the Salesforce Contact object.
		$members = $contacts.then(function (contacts) {
			return contacts.map(function (contact) {
				contact.position = { lat: contact.MailingLatitude, lng: contact.MailingLongitude };
				return new Member(contact);
			});
		});

		return $members;
	});



	let mockMemberData = new Callout(function (feature) {
		let members = [];
		let start = positions[feature.name];

		console.log("Executing callout for feature: ", feature);

		for (let i = 0; i < feature.count; i++) {
			// Add a new member to the array
			var lat, lng;

			({ lat, lng } = randomizeCoordinates(start));

			let contact = {
				Member_Type__c: "R",
				Name: "John Doe",
				Email: "jdoe@gmail.com",
				Phone: "5412288481",
				MailingAddress: {
					street: "1234 Sandy Ln.",
					city: "Eugene",
					state: "Oregon",
					country: "United States",
					postalCode: "97401"
				},
				MailingLatitude: lat,
				MailingLongitude: lng
			};

			members[i] = new Member(contact);
		}

		return members;
	});



	let mockLocationData = new Callout(function (feature) {
		let locations = [];
		let position = positions["courts"];

		for (let i = 0; i < feature.count; i++) {
			// Add a new member to the array
			locations[i] = new Location(randomizeCoordinates(position));
		}

		return locations;
	});




	function MapDatasources() { }

	MapDatasources.index = function (fn) {
		let repo = new Repository();
		repo.add("mockLocationData", mockLocationData);
		repo.add("mockMemberData", mockMemberData);
		repo.add("forceMemberData", forceMemberData);
		repo.add("phpMemberData", phpMemberData);

		if (!!fn) repo.setIndex(fn);

		return repo;
	};


	return MapDatasources;
})();