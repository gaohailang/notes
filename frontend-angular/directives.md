


```js
$timeout 的运用（在初始化后（model 的值被传入后）后执行 - 结合 jQuery 插件等）

elm.bind("$destroy", function() {
  elm.select2("destroy");
});

// Update valid and dirty statuses
controller.$parsers.push(function (value) {
  var div = elm.prev();
  div
    .toggleClass('ng-invalid', !controller.$valid)
    .toggleClass('ng-valid', controller.$valid)
    .toggleClass('ng-invalid-required', !controller.$valid)
    .toggleClass('ng-valid-required', controller.$valid)
    .toggleClass('ng-dirty', controller.$dirty)
    .toggleClass('ng-pristine', controller.$pristine);
  return value;
});

// Set the view and model value and update the angular template manually for the ajax/multiple select2.
elm.bind("change", function () {
  if (scope.$$phase) {
    return;
  }
  scope.$apply(function () {
    controller.$setViewValue(
      convertToAngularModel(elm.select2('data')));
  });
```