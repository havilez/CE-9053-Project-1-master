var Thing = function(parms){

    var defParms = { 'name': 'Rock', 'numberInStock' : 0, 'numberOwned' : 0};

    var values = _.assign(defParms,parms);
    this.name = values.name,
        this.numberInStock = values.numberInStock,
        this.numberOwned= values.numberOwned;  // by a person

};

Thing.prototype.isAvailable = function () {
    return this.numberInStock ? true : false;
};

Thing.prototype.isOwned = function () {
    return this.numberOwned ? true : false;
};