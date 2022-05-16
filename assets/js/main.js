/**
 * Main entry point to initialize a MapApplication.
 *
 * MapApplication will consume one or more datasources/Callouts from
 *  the MapDatasource repository and one or more MapFeatures.
 */
//import { config, mapinit, features } from "./config";
import MapApplication from "../../node_modules/@ocdladefense/google-maps/MapApplication.js";
import QueryBuilder from "../../node_modules/@ashirk94/query-builder/QueryBuilder.js"
import UrlMarker from "../../node_modules/@ocdladefense/google-maps/UrlMarker.js";
//import MapFeature

// Instantiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config);
window.myMap = myMap;
// Render the map to the page
// After the map finished initializing, get and set the users

//mock soql query components
const SQL_EQ = "=";
const SQL_LIKE = "LIKE";
const SQL_GT = ">";
const SQL_LT = "<";

let c1 = { field: "LastName", value: "Smith", op: SQL_EQ };
let c2 = { field: "Ocdla_Member_Status__c", value: "R", op: SQL_EQ };
//let c3 = { field: "FirstName", value: "Gerry"};

const userQuery = {
  object: "Contact",
  fields: [],
  where: [c1,c2],
  limit: 20,
};
//Query building with npm package
let qb = new QueryBuilder(userQuery);
qb.render("custom");
let box = document.querySelector('.query-filter');
let query = qb.getObject();
qb.addCondition(c1);
qb.removeCondition(c2);
let newQuery = qb.getObject();
console.log(query);
console.log(newQuery);

let boxes = document.querySelectorAll('.query-filter');


myMap.init(mapinit).then(function () {
  //Hides the filters until data is loaded
  
  myMap.hideFilters();
  //console.log("map loaded");

  // The OCDLA icon Info Window is currently being unused
  //
  let ocdlaIcon = new UrlMarker(
    "/modules/maps/assets/markers/ocdlaMarker/ocdla-marker-round-origLogo.svg"
  );
  myMap.render(ocdlaIcon);

  // Set up the features and load in the data

  let config = {
    name: "search",
    label: "search",
    markerLabel: "SE",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-black.png",
    datasource: doSearch.bind(null, userQuery)
    
  };

//qb.onQueryUpdate(contactQuery);
  features["search"] = config;  
  myMap.loadFeatures(features);
  myMap.loadFeatureData();

});

/**
 * Let the user turn features on and off.
 */
function handleEvent(e) {
  var target = e.target;

  var featureName = target.dataset && target.dataset.featureName;
  if (!featureName || target.classList.contains("query-filter")) return;

  //console.log(featureName);

  if (myMap.isVisible(featureName)) {
    target.classList.remove("feature-active");
    myMap.hideFeature(featureName);
  } else {
    myMap.showFeature(featureName);
    target.classList.add("feature-active");
  }
}



function contactQuery() {
  // Get a config object.
  console.log(qb);
  let searchFeature = new Promise( () => {
      myMap.getFeature("search")
  }).then(() => {
      console.log(searchFeature);
  });

  //need to clear markers
  searchFeature.setDatasource(doSearch.bind(null, qb.GetObject()));

  // Load the feature's data.
  searchFeature.loadData();

  // Load the feature's markers.
  searchFeature.loadMarkers().then(() => {
    //show the feature

    let boxes = document.querySelectorAll(
      ".query-filter:checked",
      ".feature-active"
    );
    if (myMap.isVisible("search")) {
      boxes.forEach((box) => {
        box.classList.remove("feature-active");
      });
      //myMap.removeFeature('search');

      myMap.hideFeature("search");
    } else {
      myMap.showFeature("search");
      boxes.forEach((box) => {
        box.classList.add("feature-active");
      });
    }
    //searchFeature.markers = [];
  });
  //shows all search results after 1 box, currently the search query is only added to
};


function doSearch(qb) {
  let body = JSON.stringify(qb);
  console.log(body);

  return fetch("/maps/search", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Accept: "text/html",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  })
  .then((resp) => {
    return resp.json();
  })
  .then((queryAndResults) => { 
    console.log(queryAndResults["query"]);
    console.log(queryAndResults["results"]);
    let members = queryAndResults.results;
    return members.map((member) => {
      let newMember = new Member(member);
      return newMember;
    });
  });
}

//Add event listener
document.addEventListener("click", handleEvent, true);


boxes.addEventListener('click', qb.onQueryUpdate(contactQuery), true);

