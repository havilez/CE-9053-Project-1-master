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
    foundThing = false;
    var personHasThing = _.forEach(this.things, function(name){
        if (thingName  === name)
            return false;
    });

    if  ( personHasThing.length !== 0)
        foundThing = true;
    /**
     for (var i=0;i<this.things.length; i++)
     {
         if (thingName != this.things[i])
         {

         }
         else {
             foundThing = true;
         }
     }

     **/


    return foundThing;

};