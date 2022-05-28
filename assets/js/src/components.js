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



const MapLegend = function(props) {

    console.log(props);
    let features = props.features;
    // let controls = features.map(<MapControl />);

    return (
        <nav id="toolbar" class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow">
            <div class="x-container">
                <div class="navbar-collapse d-sm-inline-flex flex-sm-row-reverse">

                    <ul id="toolbarOptions" class="navbar-nav flex-grow-1">
                        <div id="filters">

                            <li class="nav-item dropdown">
                                <a class="nav-link text-dark" data-toggle="dropdown">Members</a>
                                <ul class="dropdown-menu">
                                    { features.map((feature) =>
                                        <MapControl displayName={feature.label} name={feature.name} />
                                    ) }
                                </ul>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};




const MapControl = function(feature) {
    return (
        <li>My Feature Label</li>
    )
};


export default MapLegend;