// const USE_MOCK_DATASOURCES = true;
const USE_MOCK_DATASOURCES = false;

import MapDatasources from "./node_modules/custom-google-map/MapDatasources.js";

const repository = MapDatasources.index(function (feature) {
  let key = null;
  // Must return an instance of Callout to be consumed by a MapFeature.
  if (
    [
      "academic",
      "regular",
      "nonlawyer",
      "sustaining",
      "lifetime",
      "honored",
      "expertWitness",
      "circuitCourt"
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
  N: "nonlawyer",
  R: "regular",
  S: "sustaining",
  L: "lifetime",
  H: "honored",
  W: "expertWitness",
};

const cache = [];


//By placing document.getElementById("toolbarOptions").style.display="block"; in the last fetch call you will not load the filters until the data is loaded
const mapinit = [
  function() {
      cache["contacts"] = fetch("/maps/contacts").then(resp => {
        return resp.json();
      });
  },
  function() {
    cache["witness"] = fetch("/maps/witnesses").then(resp => {    
      document.getElementById("filters").style.display ="block";   
      return resp.json();
    });
},
function() {
  cache["courts"] = fetch("/maps/courts").then(resp => {      
    return resp.json();
  });
},
];


//populates features with data
function populateMemberData()
{
  $contacts = cache["contacts"];

  $members = $contacts.then(contacts => {
    let results = contacts.filter(contact => {return contact.Ocdla_Member_Status__c == this.status;});

    return results.map(contact => {
      let newMember = new Member(contact);

      return newMember;
    });
  });
  return $members;
};

function populateWitnessData()
{ 
  $witness = cache["witness"];

  $members = $witness.then(witnesses => {
    return witnesses.map(witness => {
      let newMember = new Member(witness);
      return newMember;
    });
  });
  return $members;
};

function populateCourtData()
{ 
  $court = cache["courts"];

  $courts = $court.then(courts => {
    return courts.map(court => {
      let newCourt = new Court(court);
      return newCourt;
    });
  });
  return $courts;
};
//custom datasources
const features = {
  sustaining: {
    name: "sustaining",
    label: "Sustaining",
    markerLabel: "S",
    data: [],
    status: "S",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-purple.svg",
    datasource: populateMemberData,
  },
  academic: {
    name: "academic",
    label: "Student",
    markerLabel: "A",
    status: "A",
    data: [],
    markerStyle:
    "/modules/maps/assets/markers/members/member-marker-round-orange.png",
    datasource: populateMemberData,
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
    datasource: populateMemberData,
  },

  regular: {
    name: "regular",
    label: "Regular",
    data: [],
    markerLabel: "R",
    status: "R",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-red.svg",
    datasource: populateMemberData,
  },

  lifetime: {
    name: "lifetime",
    label: "Lifetime",
    data: [],
    markerLabel: "L",
    status: "L",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-blue.svg",
    datasource: populateMemberData,
  },

  honored: {
    name: "honored",
    label: "Honored",
    data: [],
    markerLabel: "H",
    status: "H",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-aqua.svg",
    datasource: populateMemberData,
  },

    expertWitness: {
      name: "expertWitness",
      label: "ExpertWitness",
      data: [],
      markerLabel: "W",
      markerStyle:
        "/modules/maps/assets/markers/members/member-marker-round-yellow.png",
      datasource: populateWitnessData,
    },

    court: {
      name: "circuitCourt",
      label: "CircuitCourt",
      data: [],
      markerLabel: "C",
      markerStyle:
        "/modules/maps/assets/markers/members/member-marker-round-black.png",
      datasource: populateCourtData,
    },
};

export {config, mapinit, features};