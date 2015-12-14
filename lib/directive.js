'use strict';

const getParameterNames = require('get-parameter-names');

const Decorator = function({ restrict, template, scope, link, replace, transclude, require, controllerAs }) {

  return function(Directive) {
    const dependencies = getParameterNames(Directive);

    Directive.create = () => {
      return () => {
        let controller = dependencies.concat(Directive);
        let bindToController = true;
        controllerAs = controllerAs || 'ctrl';

        let properties = { restrict, scope, transclude, link, replace,
          bindToController, controllerAs, controller};
        if (template) properties.template = template;
        if (require) properties.require = require;
        return properties;
      };
    };
  };

};

module.exports = Decorator;
