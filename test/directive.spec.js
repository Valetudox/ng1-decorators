'use strict';

const Directive = require('../lib/directive');
const expect = require('chai').expect;

describe('Directive', function() {

  let createDirective = function(options) {
    @Directive(options)
    class DummyClass {

      constructor(first, second, third) {
        this._values = [first, second, third];
      }


      get deps() {
        return this._values;
      }

    }

    return DummyClass;
  };

  it('should decorate the class with a static create', function() {
    expect(createDirective({})).itself.to.respondTo('create');
  });


  describe('decorated #create', function() {

    describe('response', function() {

      it('should gives back all the given options', function() {
        let Directive = createDirective({ test1: 't1', test2: 't2' });
        expect(Directive.create()().test1).to.eql('t1');
        expect(Directive.create()().test2).to.eql('t2');
      });

      describe('@controllerAs', function() {

        it('should be the given one', function() {
          let Directive = createDirective({ controllerAs: 'customerControllerAs' });
          expect(Directive.create()().controllerAs).to.eql('customerControllerAs');
        });

        it('should be `ctrl` by default', function() {
          let Directive = createDirective({});
          expect(Directive.create()().controllerAs).to.eql('ctrl');
        });

      });

      describe('@bindToController', function() {

        it('should be the given one', function() {
          let Directive = createDirective({ bindToController: false });
          expect(Directive.create()().bindToController).to.be.false;
        });

        it('should be true by default', function() {
          let Directive = createDirective({});
          expect(Directive.create()().bindToController).to.be.true;
        });

      });

      describe('@restrict', function() {

        it('should be the given one', function() {
          let Directive = createDirective({ restrict: 'A' });
          expect(Directive.create()().restrict).to.eql('A');
        });


        it('should be E by default', function() {
          let Directive = createDirective({});
          expect(Directive.create()().restrict).to.eql('E');
        });

      });

      describe('@replace', function() {

        it('should be the given one', function() {
          let Directive = createDirective({ replace: true });
          expect(Directive.create()().replace).to.be.true;
        });


        it('should be false by default', function() {
          let Directive = createDirective({});
          expect(Directive.create()().replace).to.be.false;
        });

      });

      describe('@controller', function() {

        let controller;
        let Directive;

        beforeEach(function() {
          Directive = createDirective({});
          controller = Directive.create()().controller;
        });

        it('should give back the constructor parameter names as the first items', function() {
          expect(controller.slice(0, -1)).to.eql(['first', 'second', 'third']);
        });


        it(`should give back the class as the last item`, function() {
          let FactoredClass = controller.pop();
          expect(FactoredClass).to.equal(Directive);
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

