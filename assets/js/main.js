/**
 * Main entry point to initialize a MapApplication.
 *
 * MapApplication will consume one or more datasources/Callouts from
 *  the MapDatasource repository and one or more MapFeatures.
 */
//import { config, mapinit, features } from "./config";
import MapApplication from "../../node_modules/@ocdladefense/google-maps/MapApplication.js";
import MapFeature from "../../node_modules/@ocdladefense/google-maps/MapFeature.js";
import UrlMarker from "../../node_modules/@ocdladefense/google-maps/UrlMarker.js";

// Instantiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config);
window.myMap = myMap;
// Render the map to the page
// After the map finished initializing, get and set the users
const SQL_EQ = "=";
const SQL_LIKE = "LIKE";
const SQL_GT = ">";
const SQL_LT = "<";

let c1 = { field: "LastName", value: "Smith", op: SQL_EQ };
//limiting to reduce data
let c2 = { field: "Ocdla_Member_Status__c", value: "R", op: SQL_EQ };
let c3 = { field: "FirstName", value: "Gerry"};

const userQuery = {
  object: "Contact",
  fields: [],
  where: [c1,c2],
  limit: 20,
};
let init = myMap.init(mapinit).then(function () {
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

  features.search = config;  
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
//search query checkboxes
function whichBox(e) {
    var target = e.target;
    if (target.classList.contains("query-filter")) {
      getBox(target);
    }
  }
  
  document.addEventListener("click", handleEvent, true);
  document.addEventListener("click", whichBox, true);

//query building


window.getBox = function(box) {
    console.log(box);

    let field = box.dataset.field;
    let value = box.dataset.value;
    let op = box.dataset.op || SQL_EQ;

    let cond = {
      field: field,
      value: value,
      op: op,
    };


    if (box.checked == true) {
        userQuery.where.push(cond);
    }
    else {
        let newWhere = userQuery.where.filter((c) => 
        {
            //unchecked
            if (c.field == cond.field && c.value == cond.value) {

                return false;
            }
            return true;
        });
        userQuery.where = newWhere;
    }
    console.log(userQuery);
  contactQuery(userQuery);
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

window.contactQuery = function (qb) {
  // Get a config object.
  let searchFeature = myMap.getFeature("search");
  //need to clear markers
  searchFeature.setDatasource(doSearch.bind(null, qb));

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


//new module

let checkboxes = [];
checkboxes = userQuery.where.map(conditionToCheckbox);
checkboxes.push(limitToCheckbox(userQuery.limit));

function conditionToCheckbox(c) {
        // Create li elements; each li will have a <label> and <input type="checkbox"> element as "children."
        let myLi = document.createElement("li");
        let myOp = c.op || SQL_EQ;
        let label = document.createElement("label");
        label.innerHTML = " " + c.field + "  " + myOp + " " + c.value;
        let box = document.createElement("input");
        box.setAttribute("type", "checkbox");
        box.setAttribute("class", "query-filter");
        box.setAttribute("data-field", c.field);
        box.setAttribute("data-value", c.value);
        box.setAttribute("data-op", myOp);
        box.setAttribute("data-feature-name", "search");
        box.setAttribute("checked", "checked");
      
        myLi.appendChild(box);
        myLi.appendChild(label);
        return myLi;   
}
function limitToCheckbox(limit) {
        // Create li elements; each li will have a <label> and <input type="checkbox"> element as "children."
        let myLi = document.createElement("li");
        let label = document.createElement("label");
        label.innerHTML = " Limit = " + limit;
        let box = document.createElement("input");
        box.setAttribute("type", "checkbox");
        box.setAttribute("class", "query-filter");
        box.setAttribute("data-limit", limit);
        box.setAttribute("checked", "checked");
        box.setAttribute("disabled", true);
      
        myLi.appendChild(box);
        myLi.appendChild(label);
        return myLi; 
}


// Add the created li's (from above) to the current document.
checkboxes.forEach((checkbox) => {
  let container = document.getElementById("custom");
  container.appendChild(checkbox);
});

export default contactQuery;
