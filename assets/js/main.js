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
window.getBoxes = function () {
  let boxes = document.querySelectorAll(".query-filter:checked");
  let query = {
    where: [],
    limit: null,
  };

  boxes.forEach((box) => {
    let field = box.dataset.field;
    let value = box.dataset.value;
    let op = box.dataset.op;

    query.limit = box.dataset.limit;

    let cond = {
      field: field,
      value: value,
      op: op,
    };
    query.where.push(cond);
  });

  if (query.where.length == 0 && !query.limit) {
    query.limit = 25;
  }

  //console.log(boxes);
  contactQuery(query); 
};

//search query checkboxes
function whichBox(e) {
  var target = e.target;
  if (target.classList.contains("query-filter")) {
    getBoxes();
  }
}

document.addEventListener("click", handleEvent, true);
document.addEventListener("click", whichBox, true);

let query1 = {
  where: [{ field: "Name", value: "Thad Higgins" }],
  limit: 10,
};
let query2 = {
  where: null,
  limit: 25,
};
window.contactQuery = function (qb) {
  // Construct a config object.
  let config = {
    name: "search",
    label: "search",
    markerLabel: "SE",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-black.png",
    datasource: function () {
      return "";
    }
  };

  let searchFeature = new MapFeature(config);

  //check if ran before
  if (!myMap.getFeature("search")) {
    myMap.addFeature(searchFeature);
  } else {
    searchFeature = myMap.getFeature("search");
  }

  function doSearch(qb) {
    let body = JSON.stringify(qb);
    console.log(body);

    // $search = cache["custom"];
    let $search = fetch("/maps/search", {
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
    }).then((resp) => {
      return resp.json();
    });

    let $members = $search.then((members) => {
      return members.map((member) => {
        let newMember = new Member(member);
        return newMember;
      });
    });

    return $members;
  }

  searchFeature.setDatasource(doSearch.bind(null, qb));

  // Load the feature's data.
  searchFeature.loadData();

  // Load the feature's markers.
  searchFeature.loadMarkers().then(() => {
      //show the feature

      let boxes = document.querySelectorAll(".query-filter:checked");
      if (myMap.isVisible('search')) {
        boxes.forEach((box) => {
            box.classList.remove("feature-active");
        });

        myMap.hideFeature('search');
      } else {
        myMap.showFeature('search');
        boxes.forEach((box) => {
            box.classList.add("feature-active");
        });
      }
  });
      //shows all search results after 1 box, currently the search query is only added to
  searchFeature.data = null;
};

const SQL_EQ = "=";
const SQL_LIKE = "LIKE";
const SQL_GT = ">";
const SQL_LT = "<";

let inputs = [];
let checkboxes = [];
let c1 = { field: "LastName", value: "Smith", op: SQL_EQ, limit: 10 };
//limiting to reduce data
let c2 = { field: "Ocdla_Member_Status__c", value: "R", op: SQL_EQ, limit: 20 };

inputs = [c1, c2];

inputs.forEach((input) => {
  // Create li elements; each li will have a <label> and <input type="checkbox"> element as "children."
  let myLi = document.createElement("li");
  let label = document.createElement("label");
  label.innerHTML = " " + input.field + " : " + input.value;
  let box = document.createElement("input");
  box.setAttribute("type", "checkbox");
  box.setAttribute("class", "query-filter");
  box.setAttribute("data-field", input.field);
  box.setAttribute("data-value", input.value);
  box.setAttribute("data-op", input.op);
  box.setAttribute("data-limit", input.limit);
  box.setAttribute("data-feature-name", "search");

  myLi.appendChild(box);
  myLi.appendChild(label);
  checkboxes.push(myLi);
});

// Add the created li's (from above) to the current document.
checkboxes.forEach((checkbox) => {
  let container = document.getElementById("custom");
  container.appendChild(checkbox);
});

export default contactQuery;
