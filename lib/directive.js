'use strict';

const getParameterNames = require('get-parameter-names');
const extend = require('deep-extend');

const DEFAULTS = {
  restrict: 'E',
  replace: false,
  bindToController: true,
  controllerAs: 'ctrl'
};

const Decorator = function(options) {

  return function(Directive) {
    const dependencies = getParameterNames(Directive);

    Directive.create = () => {
      return () => {
        let controller = dependencies.concat(Directive);
        return extend({}, DEFAULTS, { controller }, options);
      };
    };
  };

};

module.exports = Decorator;
