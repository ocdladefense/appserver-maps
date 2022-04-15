const Court = (function () {
  function Court(court) {
    this.judicialDistrict = court.Jusicial_District__c;
    this.District = court.District_Name__c;
    this.name = court.Name;
    this.mailingAddress = court.Address__c || "";
    this.city = court.City__c;
    this.state = court.State__c;
    this.zipcode = court.Zipcode__c;
    this.website = court.Website__c;
    this.position = { lat: court.Position__c.latitude, lng: court.Position__c.longitude };
  }

  function getInfo() {
    // Info window for marker, showing member details
    let court = this;

    return `<div id="infoWindow">
                <div>
                not yet implemented
                </div>`;
  }

  var prototype = {
    getPosition: function () {
      return this.position;
    },
    getInfo: getInfo
  };
  Court.prototype = prototype;

  return Court;
})();
