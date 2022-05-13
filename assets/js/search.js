import MapFeature from "../../node_modules/@ocdladefense/google-maps/MapFeature.js";
//New class takes in a user query
//



function whichBox(e) {
    var target = e.target;
    if (target.classList.contains("query-filter")) {
      getBox(target);
    }
}
 function getBox(box) {
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
  //New custom event called queryChange triggers here
};

function render(id){
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
    let container = document.getElementById(id);
    container.appendChild(checkbox);
    });
    document.addEventListener("click", whichBox, true);
};
export{doSearch,getBox};