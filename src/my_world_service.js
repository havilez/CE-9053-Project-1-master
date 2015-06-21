
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

    return _.sortBy(myPeople,'name');
  //  return myPeople;

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
            break;
        }

    }
    return foundPerson;

};

MyWorldService.prototype.getThings = function () {
   // return this.things;
    return  _.sortBy(this.things,'name');
};

MyWorldService.prototype.getThing = function( thingName ){

    // change to use lodash....
    var thing, foundThing=false;

    /**
     foundThing = _.forEach(this.things, function(name) {
        if (name == thingName)
            return false;
    });

    if  ( foundThing.length !== 0)
        foundThing = true;
**/


    for ( var i=0; i< this.things.length; i++)
    {
        if ( this.things[i].name !== thingName )
        {
            continue;
        }
        else
        {
            foundThing = this.things[i];
            break;
        }

    }

    return foundThing;

};

// add Thing to person's inventory of things
MyWorldService.prototype.acquireThing = function (person,thing) {

    // TODO: validate parameters here

    var foundThings, personHasThing;
    var validPerson = this.getPerson( person );


    // Does service have any remaining inventory of that thing.
    var serviceThingObj = this.getThing( thing );
    if (serviceThingObj.numberInStock === 0)
        throw new Error("No Remaining Inventory for ", thing);


    if ( ( Object.getOwnPropertyNames(validPerson).length === 0) || (validPerson === undefined)) {
        return false;
    }
    else {
        // get thing from service and give to person
        serviceThingObj.numberOwned++;
        serviceThingObj.numberInStock--;

        // update person's things
        foundThings = validPerson.things;
        // allow duplicates??
        foundThings.push(thing);

    }
    return true;
};

MyWorldService.prototype.returnThing = function (person,thing) {


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