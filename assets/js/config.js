/**
 * Config for OCDLA Map implementation.
 */

const mapKey = Keys.mapKey;

const cache = [];


// Get the initial styles (theme) for the map -- OCDLA theme
const startTheme = new OCDLATheme();

const ocdlaInfoWindow = {
  content: `<h1>OCDLA</h1>`
};


// Set up a MapConfiguration object
const config = {
  apiKey: mapKey,
  target: "map",
  mapOptions: {
    zoom: 6,
    center: {
      lat: 44.04457,
      lng: -123.09078,
    },
    styles: startTheme.getTheme(),
    defaultMarkerStyles: {
      icon: {
        scaledSize: {
          height: 70,
          width: 80,
        }
      }
    },
    ocdlaInfoWindow: ocdlaInfoWindow,
  },
  enableHighAccuracy: true
};


// This config is used to assist sorting all members into each perspective feature (feature.name.data)
const featureLabelConfig = {
  A: "Law Student",
  N: "Professional",
  R: "Regular",
  S: "Sustaining",
  L: "Lifetime",
  H: "Honored",
  W: "Expert Witnesses"
};







// By placing document.getElementById("toolbarOptions").style.display="block"; in the last fetch call you will not load the filters until the data is loaded
const mapinit = [
  function() {
    cache["contacts"] = fetch("/maps/contacts").then(resp => {
      return resp.json();
    });
  },
  function() {
    cache["witnesses"] = fetch("/maps/witnesses").then(resp => {    
 
      return resp.json();
    });
  },
  function() {
    cache["courts"] = fetch("/maps/courts").then(resp => {     
      document.getElementById("filters").style.display ="block";        
      return resp.json();
    });
  }
];


//populates features with data
function populateMemberData()
{
    //contacts no longer defined?
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
  $witness = cache["witnesses"];

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
    markerStyle: "/modules/maps/assets/markers/members/member-marker-round-purple.svg",
    datasource: populateMemberData
  },
  academic: {
    name: "academic",
    label: "Student",
    markerLabel: "A",
    status: "A",
    data: [],
    markerStyle: "/modules/maps/assets/markers/members/member-marker-round-orange.png",
    datasource: populateMemberData
  },

  // Classified as "regular", but needs a different name for now
  nonlawyer: {
    name: "nonlawyer/regular",
    label: "Professional",
    data: [],
    markerLabel: "N",
    status: "N",
    markerStyle: "/modules/maps/assets/markers/members/member-marker-round-green.svg",
    datasource: populateMemberData
  },

  regular: {
    name: "regular",
    label: "Regular",
    data: [],
    markerLabel: "R",
    status: "R",
    markerStyle: "/modules/maps/assets/markers/members/member-marker-round-red.svg",
    datasource: populateMemberData
  },

  lifetime: {
    name: "lifetime",
    label: "Lifetime",
    data: [],
    markerLabel: "L",
    status: "L",
    markerStyle: "/modules/maps/assets/markers/members/member-marker-round-blue.svg",
    datasource: populateMemberData
  },

  honored: {
    name: "honored",
    label: "Honored",
    data: [],
    markerLabel: "H",
    status: "H",
    markerStyle: "/modules/maps/assets/markers/members/member-marker-round-aqua.svg",
    datasource: populateMemberData
  },

    expertWitness: {
      name: "expertWitness",
      label: "ExpertWitness",
      data: [],
      markerLabel: "W",
      markerStyle: "/modules/maps/assets/markers/members/member-marker-round-yellow.png",
      datasource: populateWitnessData
    },

    court: {
      name: "circuitCourt",
      label: "CircuitCourt",
      data: [],
      markerLabel: "C",
      markerStyle: "/modules/maps/assets/markers/members/member-marker-round-black.png",
      datasource: populateCourtData
    }
};
