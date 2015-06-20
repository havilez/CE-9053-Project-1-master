/*globals describe beforeEach it expect Thing MyWorldService Person */
// using closure to access variables in describe function
describe("MyWorldService", function() {

  var rock, paper, scissors;
  var moe, larry, curly, shep;
  var service;

  beforeEach(function() {
    rock = new Thing({
      name: "Rock",
      numberInStock: 2,
      numberOwned: 1 // owned by a person????
    });
    paper = new Thing({
      name: "Paper",
      numberInStock: 3
    });
    scissors = new Thing({
      name: "Scissors",
      numberInStock: 3
    });

    moe = new Person({
      name: "Moe",
      active: true,
    });
    larry = new Person({
      name: "Larry",
      active: true
    });
    curly = new Person({
      name: "Curly",
      active: true,
      things: ["Rock"]
    });
    shep = new Person({
      name: "Shep"
    });

    // initial set of person's and things in service
    // where each thing contains its inventory
    var people = [moe, larry, curly, shep];
    var things = [rock, paper, scissors];
    service = new MyWorldService(people, things);
  });

  describe("rock", function() {
    it("name is rock", function() {
      expect(rock.name).toEqual("Rock");
    });
  });
  
  describe("paper", function() {
    it("name is paper", function() {
      expect(paper.name).toEqual("Paper");
    });
  });
  describe("moe", function() {
    it("name is moe", function() {
      expect(moe.name).toEqual("Moe");
    });
  });
  describe("curly", function() {
    it("name is curly", function() {
      expect(curly.name).toEqual("Curly");
    });
  });

  describe("#getPeople", function() {
    var allPeople, activePeople;
    beforeEach(function() {
      var people = [moe, larry, curly, shep];
      var things = [rock, paper, scissors];
      var service = new MyWorldService(people, things);
      activePeople = service.getPeople(true);
      allPeople = service.getPeople();


    });
    it("returns people in alpha order", function() {


      expect(allPeople).toEqual([curly, larry, moe, shep]);
    });
    describe("passing in true for active", function() {
      it("returns only active people", function() {

        expect(activePeople).toEqual([curly, larry, moe]);
      });
    });
  });

  describe("#getPerson", function() {
    var _moe, _shep;
    beforeEach(function() {

      _moe = service.getPerson("Moe");

      _shep = service.getPerson("Shep");
    });
    describe("when passing in Moe", function() {
      it("returns Moe", function() {
        expect(_moe).toEqual(moe);
      });
    });
    describe("when passing in Shep", function() {
      it("returns Shep", function() {
        expect(_shep).toEqual(shep);
      });
    });
  });

  describe("#getThings", function() {
    var _things;
    beforeEach(function() {
      _things = service.getThings();
    });
    it("returns Paper, Rock, Scissors", function() {

      expect(_things).toEqual([paper, rock, scissors]);
    });
  });

  describe("#getThing", function() {
    var _rock;
    beforeEach(function() {
      _rock = service.getThing("Rock");
    });
    describe("with 'Rock'", function() {
      it("returns a Rock", function() {
        expect(_rock).toEqual(rock);
      });
    });
  });

  // Does person have things
  describe("things", function() {
    var _things;
    beforeEach(function() {
      var moe = service.getPerson("Moe");
      _things = moe.things;
    });
    it("Moe has no things", function() {
      expect(_things).toEqual([]);
    });
  });

  describe("#acquireThing()", function() {
    describe("Giving Moe a Rock", function() {
      var numberOfRocksOwnedBefore,
        numberOfRocksInStockBefore,
        numberOfThingsMoeHasBefore,
        numberOfThingsMoeHasAfter,
        returnValue,
        numberOfRocksInStockAfter,
        moeHasARock,
        numberOfRocksOwnedAfter;

      beforeEach(function() {
        // service has set of all persons and set of all things
        var rock = service.getThing("Rock");
        var moe = service.getPerson("Moe");
        numberOfRocksOwnedBefore = rock.numberOwned;
        numberOfRocksInStockBefore = rock.numberInStock;
        numberOfThingsMoeHasBefore = moe.things.length;

        returnValue = service.acquireThing("Moe", "Rock"); // new acquireThings Method
        numberOfThingsMoeHasAfter = moe.things.length;
        numberOfRocksInStockAfter = rock.numberInStock;
        moeHasARock = moe.hasThing("Rock");                 // hasThing method
        numberOfRocksOwnedAfter = rock.numberOwned;
      });
      it("returns true", function() {
        expect(returnValue).toEqual(true);
      });
      it("there is one less Rock in Stock", function() {
        expect(numberOfRocksInStockAfter).toEqual(numberOfRocksInStockBefore - 1);
      });
      it("Moe has one more thing", function() {
        expect(numberOfThingsMoeHasAfter).toEqual(numberOfThingsMoeHasBefore + 1);
      });
      it("Moe has a rock", function() {
        expect(moeHasARock).toEqual(true);
      });
      it("There is one more rocked owned", function() {
        expect(numberOfRocksOwnedAfter).toEqual(numberOfRocksOwnedBefore + 1);
      });
    });

    describe("Giving Moe too many Rocks", function() {
      beforeEach(function() {
        service.acquireThing("Moe", "Rock");
        service.acquireThing("Moe", "Rock");
      });
      it("there are no more Rocks available", function() {
        expect(service.getThing("Rock").available()).toEqual(false); // available method on thing
      });
      it("throws an exception", function() {
        expect(function() {
          service.acquireThing("Moe", "Rock");
        }).toThrow();
      });
    });
  });

  describe("#returnThing()", function() {
    describe("Moe returns a Rock", function() {
      var numberOfRocksOwnedBefore,
        numberOfRocksOwnedAfter,
        numberOfRocksInStockBefore,
        numberOfRocksInStockAfter,
        returnValue,
        moeHasARockBefore,
        moeHasARockAfter;

      beforeEach(function() {
        var rock = service.getThing("Rock");
        var moe = service.getPerson("Moe");
        service.acquireThing("Moe", "Rock");
        moeHasARockBefore = moe.hasThing("Rock");
        numberOfRocksOwnedBefore = rock.numberOwned;
        numberOfRocksInStockBefore = rock.numberInStock;

        returnValue = service.returnThing("Moe", "Rock");
        numberOfRocksOwnedAfter = rock.numberOwned;
        numberOfRocksInStockAfter = rock.numberInStock;
        moeHasARockAfter = moe.hasThing("Rock");
      });
      it("moe can give back a rock", function() {
        expect(returnValue).toEqual(true);
      });
      it("numberOfRocksOwnedBefore is 1", function() {
        expect(numberOfRocksOwnedBefore).toEqual(2);
      });
      it("numberOfRocksInStockBefore is 2", function() {
        expect(numberOfRocksInStockBefore).toEqual(1);
      });
      it("numberOfRocksOwnedAfter is 0", function() {
        expect(numberOfRocksOwnedAfter).toEqual(1);
      });
      it("numberOfRocksInStockAfter is 3", function() {
        expect(numberOfRocksInStockAfter).toEqual(2);
      });
      it("Moe has a rock before is true", function() {
        expect(moeHasARockBefore).toEqual(true);
      });
      it("Moe has a rock after is false", function() {
        expect(moeHasARockAfter).toEqual(false);
      });

      describe("returning a thing you do not own", function() {
        it("throws an exception", function() {
          expect(function() {
            service.returnThing("Moe", "Rock")
          }).toThrow();
        });
      });
    });

    describe("No more rocks in stock", function() {
      var rockAvailable;
      beforeEach(function() {
        service.acquireThing("Moe", "Rock");
        service.acquireThing("Moe", "Rock");
        var rock = service.getThing("Rock");
        rockAvailable = rock.available();
      });
      it("there are no more Rocks available", function() {
        expect(rockAvailable).toEqual(false);
      });
      it("throws an exception", function() {
        expect(function() {
          service.acquireThing("Moe", "Rock");
        }).toThrow();
      });
    });
  });
  describe("getPeopleWhoOwnThing", function() {
    describe("After Moe and Curly have acquired a Rocks", function() {
      var peopleWhoOwnRocks;
      var peopleWhoOwnNothing;
      beforeEach(function() {
        service.acquireThing("Moe", "Rock");
        service.acquireThing("Curly", "Rock");
        peopleWhoOwnRocks = service.getPeopleWhoOwnThing("Rock");
        peopleWhoOwnNothing = service.getPeopleWhoOwnNothing();
      });
      it("Moe and Curly own Rocks", function() {
        expect(peopleWhoOwnRocks).toEqual([moe, curly]);
      });
      it("Larry and Shep own nothing", function() {
        expect(peopleWhoOwnNothing).toEqual([larry, shep]);
      });
    });
  });
  describe("getThingsNotOwned", function() {
    describe("After Moe and Curly have acquired a Rocks", function() {
      var thingsNotOwned;
      beforeEach(function() {
        service.acquireThing("Moe", "Rock");
        service.acquireThing("Curly", "Rock");
        thingsNotOwned = service.getThingsNotOwned();
      });
      it("Paper and Scissors are not owned", function() {
        expect(thingsNotOwned).toEqual([paper, scissors]);
      });
    });
  });
  describe("getThingsOwned", function() {
    describe("After Moe and Curly acquire a Rocks", function() {
      var thingsOwned;
      var rockIsOwned;
      beforeEach(function() {
        service.acquireThing("Moe", "Rock");
        service.acquireThing("Curly", "Rock");
        thingsOwned = service.getThingsOwned();
        rockIsOwned = service.getThing("Rock").isOwned();
      });
      it("Rock is owned", function() {
        expect(thingsOwned).toEqual([rock]);
      });
      it("rock.isOwned() is true", function() {
        expect(rockIsOwned).toEqual(true);
      });
    });
  });
});