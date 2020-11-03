const Courts = (function () {

    const CIRCUIT_COURTS = [
        {
            "judicialDistrict": "1",
            "district": "Jackson County",
            "courtName": "Jackson County Circuit Court",
            "streetAddress": "100 S. Oakdale Avenue",
            "city": "Medford",
            "state": "OR",
            "zipcode": "97501",
            "position": {
                "lat": 42.322270,
                "lng": -122.876380
            },
            "website": "www.courts.oregon.gov/courts/jackson"

        },
        {
            "judicialDistrict": "2",
            "district": "Lane County",
            "courtName": "Lane County Circuit Court",
            "streetAddress": "125 East 8th Avenue",
            "city": "Eugene",
            "state": "OR",
            "zipcode": "97401",
            "position": {
                "lat": 44.051570,
                "lng": -123.090440
            },
            "website": "www.courts.oregon.gov/courts/lane"
        },
        {
            "judicialDistrict": "3",
            "district": "Marion County",
            "courtName": "Marion County Circuit Court",
            "streetAddress": "100 High St. NE",
            "city": "Salem",
            "state": "OR",
            "zipcode": "97301",
            "position": {
                "lat": 44.939920,
                "lng": -123.036060
            },
            "website": "www.courts.oregon.gov/courts/marion"
        },
        {
            "judicialDistrict": "4",
            "district": "Multnomah County",
            "courtName": "Multnomah County Circuit Court",
            "streetAddress": "1021 SW Fourth",
            "city": "Portland",
            "state": "OR",
            "zipcode": "97204",
            "position": {
                "lat": 45.516080,
                "lng": -122.678490
            },
            "website": "www.courts.oregon.gov/courts/multnomah"
        },
        {
            "judicialDistrict": "5",
            "district": "Clackamas County",
            "courtName": "Clackamas County Circuit Court",
            "streetAddress": "807 Main Street",
            "city": "Oregon city",
            "state": "OR",
            "zipcode": "97045",
            "position": {
                "lat": 45.358800,
                "lng": -122.607310
            },
            "website": "www.courts.oregon.gov/courts/clackamas"
        },
        {
            "judicialDistrict": "6",
            "district": "Umatilla County",
            "courtName": "Umatilla County Circuit Court",
            "streetAddress": "216 SE Fourth Street",
            "city": "Pendleton",
            "state": "OR",
            "zipcode": "97801",
            "position": {
                "lat": 45.6730111079124,
                "lng": -118.783125408063
            },
            "website": "www.courts.oregon.gov/courts/umatilla"
        },
        {
            "judicialDistrict": "6",
            "district": "Umatilla County",
            "courtName": "Umatilla County Circuit Court",
            "streetAddress": "915 SE Columbia Drive",
            "city": "Hermiston",
            "state": "OR",
            "zipcode": "97838",
            "position": {
                "lat": 45.8282949320908,
                "lng": -119.27337610401
            },
            "website": "www.courts.oregon.gov/courts/umatilla"
        },
        {
            "judicialDistrict": "6",
            "district": "Morrow County",
            "courtName": "Morrow County Circuit Court",
            "streetAddress": "100 Court Street",
            "city": "Heppner",
            "state": "OR",
            "zipcode": "97836",
            "position": {
                "lat": 45.3535470692812,
                "lng": -119.550782043064
            },
            "website": "www.courts.oregon.gov/courts/umatilla"
        },
        {
            "judicialDistrict": "7",
            "district": "Sherman, Wasco, Gilliam, Wheeler and Hood River Counties",
            "courtName": "Hood River County Circuit Court",
            "streetAddress": "309 state St",
            "city": "Hood River",
            "state": "OR",
            "zipcode": "97031",
            "position": {
                "lat": 45.7080291124119,
                "lng": -121.515516419603
            },
            "website": "www.courts.oregon.gov/courts/hood_river"
        },
        {
            "judicialDistrict": "7",
            "district": "Sherman, Wasco, Gilliam, Wheeler and Hood River Counties",
            "courtName": "Wasco County Circuit Court",
            "streetAddress": "511 Washington Street",
            "city": "The Dalles",
            "state": "OR",
            "zipcode": "97058",
            "position": {
                "lat": 45.5994763618707,
                "lng": -121.183821874806
            },
            "website": "www.courts.oregon.gov/courts/wasco"
        },
        {
            "judicialDistrict": "8",
            "district": "Baker County",
            "courtName": "Jackson County Circuit Court",
            "streetAddress": "1995 Third Street, Suite #220",
            "city": "Baker city",
            "state": "OR",
            "zipcode": "97814",
            "position": {
                "lat": 44.7770754510289,
                "lng": -117.833331212532
            },
            "website": "www.courts.oregon.gov/courts/baker"
        },
        {
            "judicialDistrict": "9",
            "district": "Malheur County",
            "courtName": "Malheur County Circuit Court",
            "streetAddress": "251 B Street W #3",
            "city": "Vale",
            "state": "OR",
            "zipcode": "97918-1375",
            "position": {
                "lat": 43.9810970009129,
                "lng": -117.241642811034
            },
            "website": "www.courts.oregon.gov/courts/malheur"
        },
        {
            "judicialDistrict": "10",
            "district": "Union County",
            "courtName": "Union County Circuit Court",
            "streetAddress": "1005 K Ave.",
            "city": "La Grande",
            "state": "OR",
            "zipcode": "97850",
            "position": {
                "lat": 45.331036,
                "lng": -118.078078
            },
            "website": "www.courts.oregon.gov/courts/union"
        },
        {
            "judicialDistrict": "10",
            "district": "Wallowa County",
            "courtName": "Wallowa County Circuit Court",
            "streetAddress": "101 S River Street",
            "city": "Enterprise",
            "state": "OR",
            "zipcode": "97828",
            "position": {
                "lat": 45.4246525067634,
                "lng": -117.277474276277
            },
            "website": "www.courts.oregon.gov/courts/wallowa"
        },
        {
            "judicialDistrict": "11",
            "district": "Deschutes County",
            "courtName": "Deschutes County Circuit Court",
            "streetAddress": "1100 Bond NW",
            "city": "Bend",
            "state": "OR",
            "zipcode": "97703",
            "position": {
                "lat": 44.0600158217583,
                "lng": -121.310996599881
            },
            "website": "www.courts.oregon.gov/courts/deschutes"
        },
        {
            "judicialDistrict": "12",
            "district": "Polk County",
            "courtName": "Polk County Circuit Court",
            "streetAddress": "850 Main Street",
            "city": "Dallas",
            "state": "OR",
            "zipcode": "97338",
            "position": {
                "lat": 44.9210089755834,
                "lng": -123.315946087658
            },
            "website": "www.courts.oregon.gov/courts/polk"
        },
        {
            "judicialDistrict": "13",
            "district": "Klamath County",
            "courtName": "Klamath County Circuit Court",
            "streetAddress": "316 Main Street",
            "city": "Klamath Falls",
            "state": "OR",
            "zipcode": "97601",
            "position": {
                "lat": 42.2227161498131,
                "lng": -121.784625184829
            },
            "website": "www.courts.oregon.gov/courts/klamath"
        },
        {
            "judicialDistrict": "14",
            "district": "Josephine County",
            "courtName": "Josephine County Circuit Court",
            "streetAddress": "301 NW F St.",
            "city": "Grants Pass",
            "state": "OR",
            "zipcode": "97526",
            "position": {
                "lat": 42.4411311648969,
                "lng": -123.330149423526
            },
            "website": "www.courts.oregon.gov/courts/josephine"
        },
        {
            "judicialDistrict": 15,
            "district": "Coos Counties",
            "courtName": "Coos County Circuit Court",
            "streetAddress": "250 N Baxter St",
            "city": "Coquille",
            "state": "OR",
            "zipcode": "97423",
            "position": {
                "lat": 43.1764138912322,
                "lng": -124.18683876223
            },
            "website": "www.courts.oregon.gov/courts/coos"
        },
        {
            "judicialDistrict": "15",
            "district": "Curry Counties",
            "courtName": "Curry County Circuit Court",
            "streetAddress": "29821 Ellensburg Ave",
            "city": "Gold Beach",
            "state": "OR",
            "zipcode": "97444",
            "position": {
                "lat": 42.4192033299991,
                "lng": -124.418291828952
            },
            "website": "www.courts.oregon.gov/courts/coos"
        },
        {
            "judicialDistrict": "16",
            "district": "Douglas County",
            "courtName": "Douglas County Circuit Court",
            "streetAddress": "1036 SE Douglas",
            "city": "Roseburg",
            "state": "OR",
            "zipcode": "97470",
            "position": {
                "lat": 43.2101765417418,
                "lng": -123.341034924589
            },
            "website": "www.courts.oregon.gov/courts/douglas"
        },
        {
            "judicialDistrict": "17",
            "district": "Lincoln County",
            "courtName": "Lincoln County Circuit Court",
            "streetAddress": "225 West Olive Street",
            "city": "Newport",
            "state": "OR",
            "zipcode": "97365",
            "position": {
                "lat": 44.6364562528384,
                "lng": -124.054694429291
            },
            "website": "www.courts.oregon.gov/courts/lincoln"
        },
        {
            "judicialDistrict": "18",
            "district": "Clatsop County",
            "courtName": "Clatsop County Circuit Court",
            "streetAddress": "749 Commercial Street",
            "city": "Astoria",
            "state": "OR",
            "zipcode": "97103",
            "position": {
                "lat": 46.1889997241221,
                "lng": -123.835183018805
            },
            "website": "www.courts.oregon.gov/courts/clatsop"
        },
        {
            "judicialDistrict": "19",
            "district": "Columbia County",
            "courtName": "Columbia County Circuit Court",
            "streetAddress": "230 Strand Street",
            "city": "Saint Helens",
            "state": "OR",
            "zipcode": "97051",
            "position": {
                "lat": 45.8635344919615,
                "lng": -122.797200173102
            },
            "website": "www.courts.oregon.gov/courts/columbia"
        },
        {
            "judicialDistrict": "20",
            "district": "Washington County",
            "courtName": "Washington County Circuit Court",
            "streetAddress": "145 NE 2nd Avenue",
            "city": "Hillsboro",
            "state": "OR",
            "zipcode": "97124",
            "position": {
                "lat": 45.5232162082943,
                "lng": -122.988059037366
            },
            "website": "www.courts.oregon.gov/courts/washington"
        },
        {
            "judicialDistrict": "21",
            "district": "Benton County",
            "courtName": "Benton County Circuit Court",
            "streetAddress": "20 NW 4th Street",
            "city": "Corvallis",
            "state": "OR",
            "zipcode": "97330",
            "position": {
                "lat": 44.603787,
                "lng": -123.273273
            },
            "website": "www.courts.oregon.gov/courts/benton "
        },
        {
            "judicialDistrict": "22",
            "district": "Jefferson County",
            "courtName": "Jefferson County Circuit Court",
            "streetAddress": "129 SW E Street",
            "city": "Madras",
            "state": "OR",
            "zipcode": "97741",
            "position": {
                "lat": 44.6322611908933,
                "lng": -121.12690789466
            },
            "website": "www.courts.oregon.gov/courts/jefferson"
        },
        {
            "judicialDistrict": "22",
            "district": "Crook County",
            "courtName": "Crook County Circuit Court",
            "streetAddress": "300 NE Third Street, Room 21",
            "city": "Prineville",
            "state": "OR",
            "zipcode": "97754",
            "position": {
                "lat": 44.3028580055797,
                "lng": -120.8435436
            },
            "website": "www.courts.oregon.gov/courts/crook"
        },
        {
            "judicialDistrict": "23",
            "district": "Linn County",
            "courtName": "Linn County Circuit Court",
            "streetAddress": "300 SW Fourth Avenue",
            "city": "Albany",
            "state": "OR",
            "zipcode": "97321",
            "position": {
                "lat": 44.6345485700075,
                "lng": -123.10812874962
            },
            "website": "www.courts.oregon.gov/courts/linn"
        },
        {
            "judicialDistrict": "24",
            "district": "Grant County",
            "courtName": "Grant County Circuit Court",
            "streetAddress": "201 S. Humbolt Street",
            "city": "Canyon city",
            "state": "OR",
            "zipcode": "97820",
            "position": {
                "lat": 44.3871776873764,
                "lng": -118.950690908005
            },
            "website": "www.courts.oregon.gov/courts/grant"
        },
        {
            "judicialDistrict": "24",
            "district": "Harney County",
            "courtName": "Harney County Circuit Court",
            "streetAddress": "450 N. Buena Vista #16",
            "city": "Burns",
            "state": "OR",
            "zipcode": "97720",
            "position": {
                "lat": 43.524973,
                "lng": -118.762656
            },
            "website": "www.courts.oregon.gov/courts/grant"
        },
        {
            "judicialDistrict": "25",
            "district": "Yamhill County",
            "courtName": "Yamhill County Circuit Court",
            "streetAddress": "535 NE 5th Street",
            "city": "McMinnville",
            "state": "OR",
            "zipcode": "97128",
            "position": {
                "lat": 45.2115397289637,
                "lng": -123.192206260525
            },
            "website": "www.courts.oregon.gov/courts/yamhill"
        },
        {
            "judicialDistrict": "26",
            "district": "Lake County",
            "courtName": "Lake County Circuit Court",
            "streetAddress": "513 Center Street",
            "city": "Lakeview",
            "state": "OR",
            "zipcode": "97630",
            "position": {
                "lat": 42.1893967097103,
                "lng": -120.345021338546
            },
            "website": "www.courts.oregon.gov/courts/lake"
        },
        {
            "judicialDistrict": "27",
            "district": "Tillamook County",
            "courtName": "Tillamook County Circuit Court",
            "streetAddress": "201 Laurel Avenue",
            "city": "Tillamook",
            "state": "OR",
            "zipcode": "97141",
            "position": {
                "lat": 45.4570939093164,
                "lng": -123.841981542749
            },
            "website": "www.courts.oregon.gov/courts/tillamook"
        }
    ];

    function Courts() { }

    // Set up the prototype obj
    var prototype = {
        getCourts: function () { return CIRCUIT_COURTS; }
    };
    Courts.prototype = prototype;

    // Return the class
    return Courts;
})();

