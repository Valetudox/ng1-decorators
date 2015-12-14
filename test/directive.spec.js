'use strict';

const Directive = require('../lib/directive');
const expect = require('chai').expect;

@Directive({
  template: `<html>Star Wars</html>`,
  restrict: 'E',
  scope: { saber: 'red' },
  link: (input) => input + 1,
  replace: true
})
class DummyClass {

  constructor(first, second, third) {
    this._values = [first, second, third];
  }


  get deps() {
    return this._values;
  }

}

describe('Directive', function() {

  it('should decorate the class with a static create', function() {
    expect(DummyClass).itself.to.respondTo('create');
  });


  describe('decorated #create', function() {

    describe('response', function() {

      describe('@controllerAs', function() {

        it('should be `ctrl`', function() {
          expect(DummyClass.create()().controllerAs).to.eql('ctrl');
        });

      });

      describe('@bindToController', function() {

        it('should be true', function() {
          expect(DummyClass.create()().bindToController).to.be.true;
        });

      });

      describe('@restrict', function() {

        it('should be the given one', function() {
          expect(DummyClass.create()().restrict).to.eql('E');
        });

      });

      describe('@template', function() {

        it('should be the given one', function() {
          expect(DummyClass.create()().template).to.eql('<html>Star Wars</html>');
        });

      });

      describe('@scope', function() {

        it('should be the given one', function() {
          expect(DummyClass.create()().scope).to.eql({ saber: 'red' });
        });

      });

      describe('@link', function() {

        it('should be the given one', function() {
          expect(DummyClass.create()().link(1)).to.eql(2);
        });

      });

      describe('@replace', function() {

        it('should be the given one', function() {
          expect(DummyClass.create()().replace).to.be.true;
        });

      });

      describe('@controller', function() {

        let controller;

        beforeEach(function() {
          controller = DummyClass.create()().controller;
        });

        it('should give back the constructor parameter names as the first items', function() {
          expect(controller.slice(0, -1)).to.eql(['first', 'second', 'third']);
        });


        it(`should give back the class as the last item`, function() {
          let FactoredClass = controller.pop();
          expect(FactoredClass).to.equal(DummyClass);
        });


        it(`should give back the class which always got the original dependencies in the constructor`, function() {
          let FactoredClass = controller.pop();
          let cl = new FactoredClass('1', '2', '3');
          expect(cl.deps).to.eql(['1', '2', '3']);
        });

      });

    });

  });

});
