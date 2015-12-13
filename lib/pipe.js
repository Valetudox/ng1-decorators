'use strict';

const getParameterNames = require('get-parameter-names');

const Decorator = function(Pipe) {

  const dependencies = getParameterNames(Pipe);

  Pipe.create = () => {
    return dependencies.concat((...dependencies) => {
      let pipe = new Pipe(...dependencies);
      pipe.transform = pipe.transform.bind(pipe);
      return pipe.transform;
    });
  };

};

module.exports = Decorator;
