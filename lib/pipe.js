'use strict';

const getParameterNames = require('get-parameter-names');

const Decorator = function(Pipe) {

  const dependencies = getParameterNames(Pipe);

  Pipe.create = () => {
    return dependencies.concat((...dependencies) => {
      return (new Pipe(...dependencies)).transform;
    });
  };

};

module.exports = Decorator;
