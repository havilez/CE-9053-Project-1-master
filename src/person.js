var Person = function(parms) {
    this.name = parms.name,
        this.active = parms.active,
        this.things= parms.things;

    if ( parms.things === undefined)
    {
        this.things = [];
    }

};


Person.prototype.hasThing = function(thingName)
{
    // change to use lodash....
    var foundThing = false;
    var personHasThing = _.forEach(this.things, function(name){
        if (thingName  === name)
            return false;
    });

    if  ( personHasThing.length !== 0)
        foundThing = true;



    return foundThing;

};