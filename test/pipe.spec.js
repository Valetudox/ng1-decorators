'use strict';

const Pipe = require('../lib/pipe');
const expect = require('chai').expect;

@Pipe
class DummyClass {

  constructor(first, second, third) {
    this._values = [first, second, third];
    this.transform = this.transform.bind(this);
  }


  transform(input) {
    return input + this._values.join('.');
  }

}

describe('Pipe', function() {

  it('should decorate the class with a static create', function() {
    expect(DummyClass).itself.to.respondTo('create');
  });


  describe('decorated @create', function() {

    it('should give back an array', function() {
      expect(DummyClass.create()).to.be.instanceof(Array);
    });


    it('should give back the constructor parameter names as the first items', function() {
      expect(DummyClass.create().slice(0, -1)).to.eql(['first', 'second', 'third']);
    });


    it(`should give back the class's transform method as the last item`, function() {
      let transformFactory = DummyClass.create().pop();
      let transform = transformFactory('1', '2', '3');
      expect(transform('abc')).to.have.string('abc');
    });


    it(`should give back the class's transform method which always got the original dependencies in the constructor`, function() {
      let transformFactory = DummyClass.create().pop();
      let transform = transformFactory('1', '2', '3');
      expect(transform('abc')).to.eql('abc1.2.3');
    });

  });

});
