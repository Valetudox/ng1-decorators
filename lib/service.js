'use strict';

const getParameterNames = require('get-parameter-names');

let Decorator = function(Target) {

  let dependencies = getParameterNames(Target);

  Target.create = () => {
    return dependencies.concat(Target);
  };

};

module.exports = Decorator;
