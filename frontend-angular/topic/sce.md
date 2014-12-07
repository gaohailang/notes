## Strict Contextual Escaping

### Overview
$sce 是angular中提供『严格上下文转义』服务的模块

a mode in which AngularJS requires binding in certain contexts to result in a value that is marked as safe to use for the context.

Impact on loading templates
by default, angular only loads templates from the same domina and protocol as the application document. - 可以通过$sce.getTrustedResourceUrl on the template url 设置白黑名单

If your expressions are constant literals, they're automatically trusted and you don't need to call $sce.trustAs on them (remember to include the ngSanitize module) (e.g. <div ng-bind-html="'<b>implicitly trusted</b>'"></div>) just works.

Additionally, a[href] and img[src] automatically sanitize their URLs and do not pass them through $sce.getTrusted. SCE doesn't play a role here.

By default, HTML that isn't explicitly trusted (e.g. Alice's comment) is sanitized when
  $sanitize is available.  If $sanitize isn't available, this results in an error instead of an
  exploit.

```html
  <div ng-controller="myAppController as myCtrl">
    <i ng-bind-html="myCtrl.explicitlyTrustedHtml" id="explicitlyTrustedHtml"></i><br><br>
    <b>User comments</b><br>
    By default, HTML that isn't explicitly trusted (e.g. Alice's comment) is sanitized when
    $sanitize is available.  If $sanitize isn't available, this results in an error instead of an
    exploit.
    <div class="well">
      <div ng-repeat="userComment in myCtrl.userComments">
        <b>{{userComment.name}}</b>:
        <span ng-bind-html="userComment.htmlComment" class="htmlComment"></span>
        <br>
      </div>
    </div>
  </div>
```

```js
var mySceApp = angular.module('mySceApp', ['ngSanitize']);
 
mySceApp.controller("myAppController", function myAppController($http, $templateCache, $sce) {
  var self = this;
  $http.get("test_data.json", {cache: $templateCache}).success(function(userComments) {
    self.userComments = userComments;
  });
  self.explicitlyTrustedHtml = $sce.trustAsHtml(
      '<span onmouseover="this.textContent="Explicitly trusted HTML bypasses ' +
      'sanitization."">Hover over this text.</span>');
});
```




