'use strict';

const getParameterNames = require('get-parameter-names');

const Decorator = function({ restrict, template, scope, link, replace, transclude }) {

  return function(Directive) {
    const dependencies = getParameterNames(Directive);

    Directive.create = () => {
      return () => {
        let controller = dependencies.concat(Directive);
        let bindToController = true;
        let controllerAs = 'ctrl';

        let properties = { restrict, scope, transclude, link, replace,
          bindToController, controllerAs, controller};
        if (template) properties.template = template;
        return properties;
      };
    };
  };

};

module.exports = Decorator;
