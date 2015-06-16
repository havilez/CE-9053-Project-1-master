var Thing = function(parms){
    this.name = parms.name,
    this.numberInStock = parms.numberInStock,
    this.numberOwned= parms.numberOwned  // by a person
    this.isAvailable = parms.numberInStock ? true : false;
};

Thing.prototype.available = function () {
    return this.isAvailable = this.numberInStock ? true : false;
}

var Person = function(parms) {
     this.name = parms.name,
    this.active = parms.active,
    this.things= parms.things

    if ( parms.things === undefined)
    {
        this.things = [];
    }

};


Person.prototype.hasThing = function(thingName)
{
    // change to use lodash....
    foundThing = false;
    var personHasThing = [];
  //  personHasThing = _.filter(this.things, thingName);

    for (var i=0;i<this.things.length; i++)
    {
        if (thingName != this.things[i])
        {
            continue;
        }
        else {
            foundThing = true;
        }
    }




    return foundThing;

};


var MyWorldService = function(people,things)
{
    this.people = people,
    this.things = things


};





MyWorldService.prototype.getPeople = function(active){
    activePeople = [];

    // change to use lodash....
    if ( active != undefined) {
        for (var i = 0; i < this.people.length; i++)
            if (this.people[i].active == active)
                activePeople.push(this.people[i]);
    }
    else
    {
        activePeople =this.people;
    }
    return activePeople;

};

MyWorldService.prototype.getPerson = function( name ){
    var foundPerson = {};

    // change to use lodash....
    for ( var i=0; i< this.people.length; i++)
    {
        if ( this.people[i].name !== name )
        {
            continue;
        }
        else
        {
            foundPerson = this.people[i];
        }

    };

   return foundPerson;

};

MyWorldService.prototype.getThings = function () {
    return this.things;
};

MyWorldService.prototype.getThing = function( name ){
    var foundThing = {};

    // change to use lodash....


    for ( var i=0; i< this.things.length; i++)
    {
        if ( this.things[i].name !== name )
        {
            continue;
        }
        else
        {
            foundThing = this.things[i];
        }

    };

    return foundThing;

};

// add Thing to person's inventory of things
MyWorldService.prototype.acquireThing = function (person,thing) {

    // TODO: validate parameters here

    var foundThing, personHasThing;
    var foundPerson = this.getPerson( person );


    // Does service have any remaining inventory of that thing.
    var serviceThingObj = this.getThing( thing );
    if (serviceThingObj.numberInStock === 0)
        throw new Error("No Remaining Inventory for ", thing);



    //this.numberInStock = parms.numberInStock,
    // this.numberOwned= parms.numberOwned



    // Does person have any things

    if ( ( Object.getOwnPropertyNames(foundPerson).length === 0) || (foundPerson === undefined)) {
        return false;
    }
    else {
        // get thing from service and give to person
        serviceThingObj.numberOwned++;
        serviceThingObj.numberInStock--;

        // update person's things
        var foundThings = foundPerson.things;

        if ( foundThings.length === 0 ){
                foundThings.push(serviceThingObj.name);
            }
        else {
             // foundPerson.getThing(thing.name);
            // personHasThing = _.find(foundThings, thing);
            personHasThing=_.forEach(foundThings, function(name){
                if ( name === thing)
                  return false;

            });

             // update person's things -- allow duplicates in list
         //    if (Object.getOwnPropertyNames(personHasThing).length === 0) {
                 foundThings.push(thing);
         //    }




         }



    };

    return true;
};

MyWorldService.prototype.returnThing = function (person,thing) {


    //this.numberInStock = parms.numberInStock,
    // this.numberOwned= parms.numberOwned

    var foundPerson = this.getPerson( person );
    var msg;

    // check if person own's the thing you want returned to service
    var personHasThing = _.forEach(foundPerson.things, function(name){
        if ( name === thing)
            return false;

    });

    if (personHasThing.length === 0) {
        msg = 'Person ' + person + 'does not own a ' + thing + 'to return'
        throw new Error(msg);
    }

    if ( ( Object.getOwnPropertyNames(foundPerson).length === 0) || (foundPerson === undefined)) {
        return false;
    }
    else {
        // return  thing from Person to service
        var serviceThingObj = this.getThing( thing );
        if (serviceThingObj.numberOwned === 0)
            return false;

        // add thing to service
        serviceThingObj.numberOwned--;
        serviceThingObj.numberInStock++;

        // remove thing from person's list
        // Find and remove item from an array
        var i = foundPerson.things.indexOf(thing);
        if(i != -1) {
            foundPerson.things.splice(i, 1);
        };



    }


    return true;


};


MyWorldService.prototype.getPeopleWhoOwnThing = function (thingName) {

    // get all people
    var allPeople = this.getPeople();

    // find list of people who have specified thing
    // if person has thing then add person name to list

};