# appserver-maps
Module to display and interact with a Google map.

## Next round of work:

### Dynamic checkbox creation based on JS conditions array.
Use <code>document.createElement()</code> to create additional checkbox elements.

```
const SQL_EQ = '=';
const SQL_LIKE = 'LIKE';
const SQL_GT = '>';
const SQL_LT = '<';


let inputs = [];
let checkboxes = [];
let c1 = {field:"LastName",value:"Smith",op:SQL_EQ};
let c2 = {field:"Ocdla_Member_Status__c",value:"R",op:SQL_EQ};

inputs = [c1,c2];

inputs.forEach((input) => {
 // Create div elements; each div will have a <label> and <input type="checkbox"> element as "children."
 let mydiv = document.createElement("div");
 ...
 checkboxes.push(mydiv);
});

// Add the created divs (from above) to the current document.
checkboxes.forEach((checkbox) => {
  let container = document.getElementById("whatever-checkbox-container");
  container.appendChild(checkbox);
});
```

### JS Event handling
Listen for <code>click</code> events and execute <code>contactQuery</code> when user ticks/unticks a checkbox.

