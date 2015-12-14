#Angular 1 Decorators

This is a small angular decorator collection to easily separate your code from angular

```bash
npm install --save ng1-decorators
```

## Setup
 
Add Babel stage-1 to your babelrc as preset

## Filters

```javascript
const Pipe = require('ng1-decorators').Pipe;

@Pipe
class CustomPipe {
    constructor(dep1, dep2) {
        this._dep1 = dep1;
        this._dep2 = dep2;
        this.transform = this.transform.bind(this;
    }

    transform(input) {
        return this._input + this._dep1 + this._dep2;
    }

}

angular
    .module('test', [])
    .filter('customer', CustomPipe.create());
```

## Services

```javascript
const Service = require('ng1-decorators').Service;

@Service
class CustomService {
    constructor(dep1) {
        this._dep1 = dep1;
    }

    method() {
        return this._dep1 + 'yo!';
    }

}

angular
    .module('test', [])
    .service('custom', CustomService.create());
```

## Services

```javascript
const Directive = require('ng1-decorators').Directive;

@Directive({
    scope: {
        input1: '@',
        input2: '@'
    },
    link: (element, scope, attributes, ctrl) => {
        ctrl.addElement(element);
    }
}
})
class CustomDirective {
    constructor(dep1) {
        this._dep1 = dep1;
        this._element = null;
    }


    addElement(element) {
        this._element = element;
    }

    method() {
        return this._dep1 + 'yo!';
    }

}

angular
    .module('test', [])
    .directive('custom', CustomDirective.create());
```

##Defaults
```javascript
{
  restrict: 'E',
  replace: false,
  bindToController: true,
  controllerAs: 'ctrl'
}
```
