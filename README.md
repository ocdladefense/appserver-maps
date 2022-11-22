# appserver-maps
Module to display and interact with a Google map.

## Installation
- Run <code>npm update --save-dev</code> to update packages and install any development packages.
- Run <code>npm run build</code> to transpile any JSX to JavaScript.

## Next round of work:


## For Tuesday

### QueryBuilder library
You'll be constructing a new QueryBuilder library and class in the [node-query-builder repository](https://github.com/ocdladefense/node-query-builder). This repository should be cloned into your <code>maps/node_modules/@ocdladefense/</code> folder. The new QueryBuilder class will have <code>addCondition()</code>, <code>removeCondition()</code> and <code>render()</code> methods.  Our existing code should be encapsulated into these methods. QueryBuilder can also issue <code>querychange</code> events using JavaScript's [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) class.

### Main.js
Our main JavaScript file will look very different.  Main.js will need to import at least one additional identifier from the new QueryBuilder library.

### jsdoc
We will begin generating documentation for our Google Maps and Query Builder libraries.  Documentation ensures that we understand what our code does and well-written documentation clearly communicates how our code can be used to solve a set of related problems.  There are several tools that can generate documentation.  We will be focusing on [jsdoc](https://jsdoc.app/index.html).  You'll need to install jsdoc first to begin using it.  Installation instructions can be found on the [jsdoc npm repository page](https://www.npmjs.com/package/jsdoc).  I recommend using the global installation option.
