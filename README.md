#Angular 1 Decorators

This is a small angular decorator collection to easily separate your code from angular. On the given class creates 
a static factory method for angular. It gets the dependencies from the constructor and provide it to the angular injector. 

```bash
npm install --save ng1-decorators
```

## Setup
 
Add Babel stage-1 to your babelrc as preset

## Filters

A Filter (Pipe) class should have a transform function!

###Class

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
```

###Angular module

```javascript
angular
    .module('test', [])
    .filter('customer', CustomPipe.create());
```

###Created Factory Method
CustomPipe.create = () => {
    return ['dep1', 'dep2', (dep1, dep2) => {
      return (new Pipe(dep1, dep2)).transform;
    }];
};


##Services

###Class
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
```

###Angular module
```javascript
angular
    .module('test', [])
    .service('custom', CustomService.create());
```

###Created Factory Method
CustomService.create = () => {
    return ['dep1', 'dep2', CustomService];
};

##Directives

###Class
```javascript
const Directive = require('ng1-decorators').Directive;

@Directive({
    template: '<div>hello</div>',
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
```
###Defaults
```javascript
{
  restrict: 'E',
  replace: false,
  bindToController: true,
  controllerAs: 'ctrl'
}
```


###Angular module
```javascript
angular
    .module('test', [])
    .directive('custom', CustomDirective.create());
```

###Created Factory Method
CustomDirective.create = () => {
    return () => {
        restrict: 'E',
        replace: false,
        bindToController: true,
        controllerAs: 'ctrl',
        controller: ['dep1', CustomDirective], 
        template: '<div>hello</div>',
        scope: {
            input1: '@',
            input2: '@'
        },
        link: (element, scope, attributes, ctrl) => {
            ctrl.addElement(element);
        }
    };
};
