/** @jsx vNode */
import { vNode, View } from '../../node_modules/@ocdladefense/view/view.js';
var root = View.createRoot("#map");
root.render(vNode("h1", null, "Hello World!"));
console.log("loaded");