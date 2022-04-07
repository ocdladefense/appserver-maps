// const USE_MOCK_DATASOURCES = true;
const USE_MOCK_DATASOURCES = false;

const repository = MapDatasources.index(function (feature) {
  let key = null;
  // Must return an instance of Callout to be consumed by a MapFeature.
  if (
    [
      "regular",
      "nonlawyer",
      "sustaining",
      "lifetime",
      "honored",
      "libraries",
      "expertWitness",
      "allMembers",
      "allWitnesses",
    ].includes(feature.name)
  ) {
    key = USE_MOCK_DATASOURCES ? "mockMemberData" : "phpMemberData";
  } else if (["courts", "libraries", "colleges", "W"].includes(feature.name)) {
    key = USE_MOCK_DATASOURCES ? "mockLocationData" : "mockLocationData";
  }

  console.log("Found repository key ", key, " when searching using: ", feature);

  return key;
});

// Get the initial styles (theme) for the map -- OCDLA theme
const startTheme = new OCDLATheme();

const ocdlaInfoWindow = {
  content: `
        <h1>OCDLA</h1>
    `,
};

// Starting/default position for the center of the map (Vancouver, WA)
const startingMapPosition = {
  latitude: 44.04457,
  longitude: -123.09078,
};

// Set up a MapConfiguration object
const config = {
  apiKey: "AIzaSyCfWNi-jamfXgtp5iPBLn63XV_3u5RJK0c",
  target: "map",
  repository: repository, // Where to get data consumed by the Map.
  mapOptions: {
    zoom: 6,
    center: {
      lat: startingMapPosition.latitude,
      lng: startingMapPosition.longitude,
    },
    styles: startTheme.getTheme(),
    defaultMarkerStyles: {
      icon: {
        scaledSize: {
          height: 70,
          width: 80,
        },
      },
    },
    ocdlaInfoWindow: ocdlaInfoWindow,
  },
  enableHighAccuracy: true,
};

/*
	  memberTypes = "null", A", "N", "R", "S", "L", "LL",
	null = Academic Members (typically law students),
	A = Admin/Exec/Private Investigator (licensed)
	N = NonLawyer (Professional Member)
	R = Regular Members (practicing lawyers)
	S = Sustaining Members (paid extra fee for annual perks)
	L = Lifetime Members (paid extra fee for lifetime membership)
	LL = Law Library (could have a membership)
*/
// This config is used to assist sorting all members into each perspective feature (feature.name.data)
const featureLabelConfig = {
  null: "academic",
  ADMIN: "administration",
  admin: "administration",
  A: "exec_investigator", // Need to change this name to reflect "Admin/Exec/Private Investigator (licensed)"
  N: "nonlawyer",
  R: "regular",
  S: "sustaining",
  L: "lifetime",
  LL: "library",
  H: "honored",
  T: "teamMember",
  W: "expertWitness",
};

const cache = [];

const mapinit = [
  function() {
      cache["contacts"] = fetch("/maps/contacts").then(resp => {
        return resp.json();
      });
  },
  /*
  fn2,
  fn3,
  fn4,
  */
];


/*
*
*/
function populateData()
{
  //console.log(this);
  //This is the next step to make it not 
  $contacts = cache["contacts"];

  // Contacts 'cause simple reminder this is from the Salesforce Contact object.
  $members = $contacts.then(contacts => {
    //console.log("contacts:"+contacts);
    let results = contacts.filter(contact => {return contact.Ocdla_Member_Status__c == this.status;});

    return results.map(contact => {
      let newMember = new Member(contact);

      // console log any members that may cause issues
    //   try {
    //     this.data.push(newMember);
    //   } catch {
    //     console.log(newMember);
    //   }

      return newMember;
    });
  });
  return $members;
};

const features = {
  //custom datasources through populateData
  sustaining: {
    name: "sustaining",
    label: "Sustaining",
    markerLabel: "S",
    data: [],
    status: "S",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-purple.svg",
    datasource: populateData,
  },
  //TODO: add the checkbox
  academic: {
    name: "academic",
    label: "Student",
    markerLabel: null,
    status: null,
    data: [],
    markerStyle:
      "https://ocdla.s3-us-west-2.amazonaws.com/member-marker-round-purple.svg",
    datasource: populateData,
  },

  // Classified as "regular", but needs a different name for now
  nonlawyer: {
    name: "nonlawyer/regular",
    label: "Professional",
    data: [],
    markerLabel: "N",
    status: "N",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-green.svg",
    datasource: populateData,
  },

  regular: {
    name: "regular",
    label: "Regular",
    data: [],
    markerLabel: "R",
    status: "R",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-red.svg",
    datasource: populateData,
  },

  lifetime: {
    name: "lifetime",
    label: "Lifetime",
    data: [],
    markerLabel: "L",
    status: "L",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-blue.svg",
    datasource: populateData,
  },

  honored: {
    name: "honored",
    label: "Honored",
    data: [],
    markerLabel: "H",
    status: "H",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-aqua.svg",
    datasource: populateData,
  },
  //expertwitness
  //   expertWitness: {
  //     name: "expertWitness",
  //     label: "ExpertWitness",
  //     data: [],
  //     markerLabel: "W",
  //     markerStyle:
  //       "/modules/maps/assets/markers/members/member-marker-round-aqua.svg",
  //     datasource: new Callout(function (feature) {
  //       $contacts = fetch("/maps/witnesses").then(function (resp) {
  //         return resp.json();
  //       });

  //       // Contacts 'cause simple reminder this is from the Salesforce Contact object.
  //       $members = $contacts.then(function (contacts) {
  //         //console.log(contacts);

  //         return contacts.map(function (contact) {
  //           let newMember = new Member(contact);

  //           // console log any members that may cause issues
  //           try {
  //             expertWitness.data.push(newMember);
  //           } catch {
  //             console.log(featureName);
  //             console.log(newMember);
  //           }

  //           return newMember;
  //         });
  //       });

  //       return $members;
  //     }),
  //   },
  //   court: {
  //     name: "courts",
  //     label: "Circuit Court",
  //     data: [],
  //     markerLabel: "C",
  //     markerStyle:
  //       "/modules/maps/assets/markers/courthouse/courthouse-marker-round-white-black.svg",
  //     //Get the circuit courts json file -- not implemented yet
  //     datasource: new Callout(function (feature) {
  //       $courts = fetch("/maps/courts").then(function (resp) {
  //         return resp.json();
  //       });
  //       $courts = $courts.then(function (courts) {
  //       console.log(courts);

  //         return courts.map(function (court) {
  //           let newCourt = new Court(court);

  //           // console log any members that may cause issues
  //           try {
  //             court.data.push(newCourt);
  //           } catch {
  //             console.log(featureName);
  //             console.log(newCourt);
  //           }

  //           return newMember;
  //         });
  //       });
  //     }),
  //   },

  /**
   * The all members feature is never used, instead it is responsible
   *  for getting and sorting data to the other features
   */

  // allMembers: {
  //   name: "allMembers",
  //   label: "Member",
  //   data: [],
  //   // Setting up call to get member data
  //   datasource: new Callout(function (feature) {
  //     $contacts = fetch("/maps/contacts").then(function (resp) {
  //       return resp.json();
  //     });

  //     // Contacts 'cause simple reminder this is from the Salesforce Contact object.
  //     $members = $contacts.then(function (contacts) {
  //       //console.log(contacts);

  //       return contacts.map(function (contact) {
  //         let newMember = new Member(contact);

  //         // Push to the features array
  //         features.allMembers.data.push(newMember);

  //         // Testing member sort here
  //         let featureName = featureLabelConfig[newMember.status];

  //         // console log any members that may cause issues
  //         try {
  //           features[featureName].data.push(newMember);
  //         } catch {
  //           console.log(featureName);
  //           console.log(newMember);
  //         }

  //         return newMember;
  //       });
  //     });

  //     return $members;
  //   }),

  // },
};
