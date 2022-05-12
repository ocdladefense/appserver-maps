/** @jsx vNode */

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
import { vNode, addEvent, getMainContainer, changeMainContainer, myAppEventHandler, render } from '../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../node_modules/@ocdladefense/view/cache.js';
import { MapLayersWidget } from "./components/MapLayerWidget.js";

// Instantiate the app and pass in the map's config.
const myMap = new MapApplication(config);
window.myMap = myMap;


// Our sample query.
// This query can be used to ad-hoc create a search feature on the Map.
let c1 = { field: "LastName", value: "Smith", op: QueryBuilder.SQL_EQ };
let c2 = { field: "Ocdla_Member_Status__c", value: "R", op: QueryBuilder.SQL_EQ };
let c3 = { field: "FirstName", value: "Gerry"};

const userQuery = {
  object: "Contact",
  fields: [],
  where: [c1, c2, c3],
  limit: 20,
};


// Render the map to the page
// After the map has initialized, get and set users.
let init = myMap.init(mapinit).then(function () {
  // Hides the filters until data is loaded.
  myMap.hideFilters();

  // The OCDLA icon Info Window is currently being unused
  let ocdlaIcon = new UrlMarker(
    "/modules/maps/assets/markers/ocdlaMarker/ocdla-marker-round-origLogo.svg"
  );
  myMap.render(ocdlaIcon);

  myMap.loadFeatures(features);
  myMap.loadFeatureData();
});


// Instantiate a QueryBuilder object.
// Library code should handle everything else.
let qb = new QueryBuilder(userQuery);
qb.onQueryUpdate(contactQuery);

document.addEventListener("click", handleEvent, true);


changeMainContainer("main");
// let initTree = <HomeFullNode orders={data[0]} />;
// HISTORY.clear();
// HISTORY.set(0, initTree);
render(<MapLayerWidget />,"#widget");
// 
document.addEventListener("click", myAppEventHandler);





function contactQuery(qb) {
  // Construct a config object.
  let config = {
    name: "search",
    label: "search",
    markerLabel: "SE",
    markerStyle:
      "/modules/maps/assets/markers/members/member-marker-round-black.png",
    datasource: function () {
      return "";
    },
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
    //console.log(body);

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

    if (myMap.isVisible("search")) {
      myMap.hideFeature("search");
    } else {
      myMap.showFeature("search");
      boxes.forEach((box) => {
        box.classList.add("feature-active");
      });
    }

  });

};




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