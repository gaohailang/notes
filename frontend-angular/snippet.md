
## $watch fighters
I wanted bindings that would work the same as native bindings, but that wouldn't trigger $watches. That would be $interpolated the first time, and would never move. 

```js
module
  .directive('setIf', [function () {
    return {
      transclude: 'element',
      priority: 1000,
      terminal: true,
      restrict: 'A',
      compile: function (element, attr, linker) { // return a post-link or directive object
        return function (scope, iterStartElement, attr) {
          iterStartElement[0].doNotMove = true;
          var expression = attr.setIf;
          var value = scope.$eval(expression);
          if (value) {
            linker(scope, function (clone) { // compile 的 linker 用于把？！ TODO
              iterStartElement.after(clone);
            });
          }
        };
      }
    };
  }])
  .directive('setHtml', function() {
    return {
      restrict: "A",
      priority: 100,
      link: function($scope, $el, $attr) {
        $($el).html($scope.$eval($attr.setHtml));
      }
    };
  })
```

## Controller as" Syntax ng-controller="otherCtrl as other
好处：是可以避免引入 scope, 可以指名到姓。 避免嵌套时隐式的引用和诡异的$parent
improved architecture, clearer scoping and smarter Controllers.
Controllers as we know them are class-like Objects that drive Model and View changes, but they all seem to revolve around this mystical $scope Object.
Declaring in $routeProvider/Directives/elsewhere: controllerAs 属性

```js
<div ng-app="app" ng-controller="RoomCtrl as room">
  <div class="button" ng-click="room.openDoor()">
      {{room.buttonTitle}}
  </div>
</div>

app.controller("RoomCtrl", function() {
    this.openDoor = function() {
        alert("creak");
    }
    this.buttonTitle = "I'm a button";
    // 改找 watchers
    $scope.$watch(angular.bind(this, function() {
    return this.title;
    }), function(newVal, oldVal) {
        // now we will pickup changes to newVal and oldVal
    });
});
```

## Minimal Angular module/syntax approach using IIFE
http://toddmotto.com/minimal-angular-module-syntax-approach-using-an-iife/
How i should be extending modules, from variable or getter mehtod(and chaining our methods)

```js
// variable
var app = angular.module('app', []);

app.controller('MainCtrl', function MainCtrl ($scope, SomeFactory) {
  this.doSometing = function () {
    SomeFactory.doSomething();
  };
});

// getter and chain
// set the module
angular.module('app', []);

// get the module
angular.module('app').controller('MainCtrl', function MainCtrl ($scope, SomeFactory) {
  this.doSometing = function () {
    SomeFactory.doSomething();
  };
});

```

```js
(function () {

  'use strict';

  /**
   * @class MainCtrl
   * @classdesc Main Controller for doing awesome things
   * @ngInject
   */
   /* @ngInject */
  function MainCtrl ($scope, SomeFactory) {
    this.doSometing = function () {
      SomeFactory.doSomething();
    };
  }
  
  MainCtrl.$inject = ['$scope', 'SomeFactory']; // by ng-annotate

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

})();
```

## Differences between the observe and watch methods
http://stackoverflow.com/questions/14876112/difference-between-the-observe-and-watch-methods

$observe() is a method on the Attributes object. use it inside directives where you need to observe/watch DOM attribute that contains interpolation(i.e. {{}}'s)

$watch(), a method of Scope object(controller, or linking funciton). more complicated, it watch a expression(a string evaluted as an angular-expression by $parse(not contain {{}}) or a function called every digest cycle)

'@' syntax(in directive scope option) does the `interpolation` for us.

getting the values of these attributes is an asynchronous operation. (And this is why we need the $observe and $watch functions.)


## $parse, $interpolate, angular expression, $compile, $scope.$eval

$parse:
Converts Angular expression into a function.

$interpolate:
Compiles a string with markup into an interpolation function. This service is used by the HTML `$compile service` for data binding. See $interpolateProvider for configuring the interpolation markup.

var exp = $interpolate('Hello {{name | uppercase}}!');
expect(exp({name:'Angular'}).toEqual('Hello ANGULAR!');


## ui-select2
非常好的 demo, 对于一些高阶的 directive 应用

## signit

```html
<!-- Signature Pad -->
<div class="control-group">
  <sigpad ng-model='user.signature' clearBtn=".clearButton" name="signature" required></sigpad>
</div>

<tbody>
  <tr ng-repeat="signed in signatureList">
    <td>{{signed.get('firstName')}} {{signed.get('lastName')}}</td>
    <td>{{signed.get('email')}}</td>
    <td>
      <regensigpad sigdata={{signed.get('signature')}}></regensigpad>
    </td>
  </tr>
</tbody>

<div class="control sigPad">
  <div class="sig sigWrapper">
    <canvas class="pad" width="436" height="120" ng-mouseup="updateModel()"></canvas>
  </div>
</div>
```

```js
/**
 * Custom Directives
 */
angular.module('MyDirectives',[])
/**
 * HTML5 SignaturePad Directive
 * This directive is intended to place a convas within a form
 * which can then be drawn upon. Once it is drawn updon, it will be
 * considered 'valid'
 *
 * Thanks to Thomas J Bradley for the Signature Pad plugin for jQuery
 * http://thomasjbradley.ca/lab/signature-pad/
 * 
 */
.directive('sigpad', function($timeout){
  return {
    templateUrl: 'views/sigPad.html',   // Use a template in an external file
    restrict: 'E',                      // Must use <sigpad> element to invoke directive
    scope : true,                       // Create a new scope for the directive
    require: 'ngModel',                 // Require the ngModel controller for the linking function
    link: function (scope,element,attr,ctrl) {

      // Attach the Signature Pad plugin to the template and keep a reference to the signature pad as 'sigPadAPI'
      var sigPadAPI = $(element).signaturePad({
                                  drawOnly:true,
                                  lineColour: '#FFF'
                                });
      
      // Clear the canvas when the 'clear' button is clicked
      $(attr.clearbtn).on('click',function (e) {
        sigPadAPI.clearCanvas();
      });
      
      $(element).find('.pad').on('touchend',function (obj) {
        scope.updateModel();
      });

      // when the mouse is lifted from the canvas, set the signature pad data as the model value
      scope.updateModel = function() {
        $timeout(function() {
          ctrl.$setViewValue(sigPadAPI.getSignature());
        });
      };      
      
      // Render the signature data when the model has data. Otherwise clear the canvas.
      ctrl.$render = function() {
        if ( ctrl.$viewValue ) {
          sigPadAPI.regenerate(ctrl.$viewValue);
        } else {
          // This occurs when signatureData is set to null in the main controller
          sigPadAPI.clearCanvas();
        }
      };
      
      // Validate signature pad.
      // See http://docs.angularjs.org/guide/forms for more detail on how this works.
      ctrl.$parsers.unshift(function(viewValue) {
        if ( sigPadAPI.validateForm() ) {
          ctrl.$setValidity('sigpad', true);
          return viewValue;
        } else {
          ctrl.$setValidity('sigpad', false);
          return undefined;
        }
      });
      
    }
  };
})
/**
 * Regenerate Signature Pad data as Base64 encoded PNG data.
 * This uses the getSignatureImage() function of the Signature Pad API.
 * It only works in modern browsers, and is flaky in IE.
 */
.directive('regensigpad',function() {
  return {
    template: '<img ng-src="{{pic}}" />',
    restrict: 'E',
    scope: {sigdata:'@'},
    link: function (scope,element,attr,ctrl) {
      // When the sigdata attribute changes...
      attr.$observe('sigdata',function (val) {
        // ... create a blank canvas template and attach the signature pad plugin
        var sigPadAPI = $('<div class="sig sigWrapper"><canvas class="pad" width="436" height="120"></canvas></div>').signaturePad({
                          displayOnly: true
                        }); 
        // regenerate the signature onto the canvas
        sigPadAPI.regenerate(val);
        // convert the canvas to a PNG (Newer versions of Chrome, FF, and Safari only.)
        scope.pic = sigPadAPI.getSignatureImage();
      });
    }
  };
});
```