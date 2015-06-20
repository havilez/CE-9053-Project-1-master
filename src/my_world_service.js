

//FIX-ME: mov all lodash usage from spec to service


var MyWorldService = function(people,things)
{
    this.people = people,
    this.things = things


};





MyWorldService.prototype.getPeople = function(active){

    var myPeople;
    if ( active == true)
       myPeople =  _.filter(this.people, 'active');
    else
      myPeople = this.people;

    return myPeople;

};

MyWorldService.prototype.getPerson = function( name ){
    var foundPerson = {};

    // change to use lodash....


    for ( var i=0; i< this.people.length; i++)
    {
        if ( this.people[i].name !== name )
        {

        }
        else
        {
            foundPerson = this.people[i];
        }

    }
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

        }
        else
        {
            foundThing = this.things[i];
        }

    }
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



    }
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
        msg = 'Person ' + person + 'does not own a ' + thing + 'to return';
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
        }
    }


    return true;


};


MyWorldService.prototype.getPeopleWhoOwnNothing = function () {

    // get all people
    var allPeople = this.people;
    var nonOwners = [];

    // find list of people who have specified thing
    // if person has thing then add person name to list
    for (var i=0;i< allPeople.length; i++)
    {
        // chk if people own specified thing
        if ( allPeople[i].things.length == 0 )
        {
            var name = allPeople[i];
            nonOwners.push( allPeople[i]);
        }
    }
    return nonOwners;



};


MyWorldService.prototype.getPeopleWhoOwnThing = function (thingName) {

    // get all people
    var allPeople = this.people;
    var owners =[];

    // find list of people who have specified thing
    // if person has thing then add person name to list
    for (var i=0;i< allPeople.length; i++)
    {
        // chk if people own specified thing
        if (allPeople[i].hasThing(thingName))
        {
            owners.push(allPeople[i]);
        }

    }

    return owners;

};


MyWorldService.prototype.getThingsNotOwned = function () {

    var allThings = this.things;
    var thingsNotOwned = [];

    for ( var i=0; i < allThings.length; i++)
    {
        if (( allThings[i].numberOwned == 0) || ( allThings[i].numberOwned == undefined)) {

            thingsNotOwned.push(allThings[i]);
        }
    }

    return thingsNotOwned;
};

MyWorldService.prototype.getThingsOwned = function () {

    var allThings = this.things;
    var thingsOwned = [];

    for ( var i=0; i < allThings.length; i++)
    {
        if ( allThings[i].numberOwned ) {

            thingsOwned.push(allThings[i]);
        }
    }

    return thingsOwned;
};