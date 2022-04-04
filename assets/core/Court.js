const Court = (function () {
  function Court(courts) {
    this.judicialDistrict = courts.judicialDistrict;
    this.District = courts.District;
    this.name = courts.courtName;
    this.mailingAddress = courts.streetAddress || "";
    this.city = courts.city;
    this.state = courts.state;
    this.zipcode = courts.zipcode;
    this.position = { lat: courts.position.lat, lng: courts.position.lng };
  }

  function getInfo() {
    // Info window for marker, showing member details
    let courts = this;

    return `<div id="infoWindow">
                <div>
                not yet implemented
                </div>`;
  }

  var prototype = {
    getPosition: function () {
      return this.position;
    },
    getInfo: getInfo,
  };
  Court.prototype = prototype;

  return Court;
})();
