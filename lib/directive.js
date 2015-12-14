'use strict';

const getParameterNames = require('get-parameter-names');

const Decorator = function({ restrict, template, scope, link, replace }) {

  return function(Directive) {
    const dependencies = getParameterNames(Directive);

    Directive.create = () => {
      return () => ({
        restrict: restrict,
        template: template,
        scope: scope,
        link: link,
        replace: replace,
        bindToController: true,
        controllerAs: 'ctrl',
        controller: dependencies.concat(Directive)
      });
    };
  };

};

module.exports = Decorator;
