const Location = (function () {
    /*
    Location examples (not currently being used)

    var office = {
        address: {
            name: "Lane County Public Defender",
            streetAddress: "1143 Oak St",
            city: "Eugene",
            state: "OR",
            zipcode: "97401"
        }
    }

    var defender = {
        address: {
            fname: "Dawn",
            lName: "Andrews",
            streetAddress: "630 SW 5th Ave Ste 50",
            city: "Portland",
            state: "OR",
            zipcode: "97204"
        }
    }

    var witness = {
        address: {
            name: "Batman",
            streetAddress: "3547-3501 SE Division St",
            city: "Portland",
            state: "OR",
            zipcode: "97202"
        }
    }

    var courthouse = {
        address: {
            name: "Court of Appeals",
            streetAddress: "1163 State Street NE",
            city: "Salem",
            state: "OR",
            zipcode: "97403"
        }
    }
    */

    function Location(position) {
        this.type = "location";
        this.position = position;
        this.label = "C";
    }

    var prototype = {};
    Location.prototype = prototype;

    return Location;
})();