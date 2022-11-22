/** @jsx vNode */
import { vNode, View } from '/node_modules/@ocdladefense/view/view.js';
/*
class MapLegend  {

    render() {
        let blah, blah, blah;

        return (
            <div with some atrributes>
                { features.map((feature) =>
                    <MapControl displayName={feature.displayName} name={feature.name} />
                ) }
            </div>
        );
    }

}
*/

var MapLegend = function MapLegend(props) {
  console.log(props);
  var features = props.features; // let controls = features.map(<MapControl />);

  return vNode("nav", {
    id: "toolbar",
    "class": "navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow"
  }, vNode("div", {
    "class": "x-container"
  }, vNode("div", {
    "class": "navbar-collapse d-sm-inline-flex flex-sm-row-reverse"
  }, vNode("ul", {
    id: "toolbarOptions",
    "class": "navbar-nav flex-grow-1"
  }, vNode("div", {
    id: "filters"
  }, vNode("li", {
    "class": "nav-item dropdown"
  }, vNode("a", {
    "class": "nav-link text-dark",
    "data-toggle": "dropdown"
  }, "Members"), vNode("ul", {
    "class": "dropdown-menu"
  }, features.map(function (feature) {
    return vNode(MapControl, {
      displayName: feature.label,
      name: feature.name
    });
  }))))))));
};

var MapControl = function MapControl(feature) {
  return vNode("li", null, "My Feature Label");
};

export default MapLegend;