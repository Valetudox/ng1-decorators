'use strict';

const Service = require('../lib/service');
const expect = require('chai').expect;

@Service
class DummyClass {

  constructor(first, second, third) {
    this._values = [first, second, third];
  }


  get deps() {
    return this._values;
  }

}

describe('Service', function() {

  it('should decorate the class with a static create', function() {
    expect(DummyClass).itself.to.respondTo('create');
  });


  describe('decorated #create', function() {

    it('should give back an array', function() {
      expect(DummyClass.create()).to.be.instanceof(Array);
    });


    it('should give back the constructor parameter names as the first items', function() {
      expect(DummyClass.create().slice(0, -1)).to.eql(['first', 'second', 'third']);
    });


    it(`should give back the class as the last item`, function() {
      let FactoredClass = DummyClass.create().pop();
      expect(FactoredClass).to.equal(DummyClass);
    });


    it(`should give back the class which always got the original dependencies in the constructor`, function() {
      let FactoredClass = DummyClass.create().pop();
      let cl = new FactoredClass('1', '2', '3');
      expect(cl.deps).to.eql(['1', '2', '3']);
    });

  });

});
