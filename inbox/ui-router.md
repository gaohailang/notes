# AngularUI Router
http://angular-ui.github.io/ui-router/site/

## Summary
理念阐述，开始使用，特性（nested states & views, multi-named templates 等）

## Todo
application's state tree can be loaded at Runtime. ？！
更优雅的 ng-class="{'active': $state.includes('mq')}" vs ui-sref-active?!
切换 routeChangeStart, routeChangeSuccess 来加入切入 loading 等
默认的 child state abstract parent state?!
利用多个 multi-ui-view 来实现 master template
管理好页面间状态保存

## de-facto solution to flexible routing with nested views
angularui router is a routing framework for angularjs, which allow you to `organize the parts of your interface into a state machine`. Difference with $route service in ngRoute module, which is organized around URL routes, UI-Router is organized around `states`, which may optional have routes, as well as other behavior, attached.

states are bound to named, nested, and parallel views.

## Get Started

- `bower install angular-ui-router`
- include js file in html
- var myApp = angular.module('myApp', ['ui.router']);


### Nested States & Views
The majority of UI-Router's power is in its ability to nest states & views.

```js
$stateProvider
  .state('state1', {
    url: "/state1",
    templateUrl: "partials/state1.html"
  })
  .state('state1.list', {
    url: "/list",
    templateUrl: "partials/state1.list.html",
    controller: function($scope) {
      $scope.items = ["A", "List", "Of", "Items"];
    }
  })
```

```html
<!-- index.html -->
<body>
    <div ui-view></div>
    <!-- We'll also add some navigation: -->
    <a ui-sref="state1">State 1</a>
    <a ui-sref="state2">State 2</a>
</body>

<!-- partials/state1.html -->
<h1>State 1</h1>
<hr/>
<a ui-sref="state1.list">Show List</a>
<div ui-view></div>

<!-- partials/state1.list.html -->
<h3>List of State 1 Items</h3>
<ul>
  <li ng-repeat="item in items">{{ item }}</li>
</ul>

```


### Multiple & Named Views
the ability to have multiple ui-views view per template.

```js
$stateProvider
    .state('index', {
      url: "",
      views: {
        "viewA": { template: "index.viewA" },
        "viewB": { template: "index.viewB" }
      }
    });
```

### 代码结构


### API 文档

[module] ui-router
- [module] ui-router-router
    - [service] $urlRouter
- [module] ui-router-state
    - [directive] ui-sref
    - [directive] ui-sref-active
    - [directive] ui-sref-active-eq
    - [directive] ui-view
    - [filter] includedByState
    - [filter] isState
    - [service] $state
    - [service] $stateProvider: state(name, stateConfig)
- [module] ui-router-util

stateConfig:



### Sample 学习

named views @views section:

```
''
hint@
menutip
@contacts.detail
```

其他常用的： `resolve`, `templateProvider`

```js
$stateProvider
  //////////////
  // Contacts //
  //////////////
  .state('contacts', {

    // With abstract set to true, that means this state can not be explicitly activated.
    // It can only be implicitly activated by activating one of its children.
    abstract: true,

    // This abstract state will prepend '/contacts' onto the urls of all its children.
    url: '/contacts',

    // Example of loading a template from a file. This is also a top level state,
    // so this template file will be loaded and then inserted into the ui-view
    // within index.html.
    templateUrl: 'app/contacts/contacts.html',

    // Use `resolve` to resolve any asynchronous controller dependencies
    // *before* the controller is instantiated. In this case, since contacts
    // returns a promise, the controller will wait until contacts.all() is
    // resolved before instantiation. Non-promise return values are considered
    // to be resolved immediately.
    resolve: {
      contacts: ['contacts',
        function( contacts){
          return contacts.all();
        }]
    },

    // You can pair a controller to your template. There *must* be a template to pair with.
    controller: ['$scope', '$state', 'contacts', 'utils',
      function (  $scope,   $state,   contacts,   utils) {

        // Add a 'contacts' field in this abstract parent's scope, so that all
        // child state views can access it in their scopes. Please note: scope
        // inheritance is not due to nesting of states, but rather choosing to
        // nest the templates of those states. It's normal scope inheritance.
        $scope.contacts = contacts;

        $scope.goToRandom = function () {
          var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

          // $state.go() can be used as a high level convenience method
          // for activating a state programmatically.
          $state.go('contacts.detail', { contactId: randId });
        };
      }]
  })

  /////////////////////
  // Contacts > List //
  /////////////////////

  // Using a '.' within a state name declares a child within a parent.
  // So you have a new state 'list' within the parent 'contacts' state.
  .state('contacts.list', {

    // Using an empty url means that this child state will become active
    // when its parent's url is navigated to. Urls of child states are
    // automatically appended to the urls of their parent. So this state's
    // url is '/contacts' (because '/contacts' + '').
    url: '',

    // IMPORTANT: Now we have a state that is not a top level state. Its
    // template will be inserted into the ui-view within this state's
    // parent's template; so the ui-view within contacts.html. This is the
    // most important thing to remember about templates.
    templateUrl: 'app/contacts/contacts.list.html'
  })

  ///////////////////////
  // Contacts > Detail //
  ///////////////////////

  // You can have unlimited children within a state. Here is a second child
  // state within the 'contacts' parent state.
  .state('contacts.detail', {

    // Urls can have parameters. They can be specified like :param or {param}.
    // If {} is used, then you can also specify a regex pattern that the param
    // must match. The regex is written after a colon (:). Note: Don't use capture
    // groups in your regex patterns, because the whole regex is wrapped again
    // behind the scenes. Our pattern below will only match numbers with a length
    // between 1 and 4.

    // Since this state is also a child of 'contacts' its url is appended as well.
    // So its url will end up being '/contacts/{contactId:[0-9]{1,4}}'. When the
    // url becomes something like '/contacts/42' then this state becomes active
    // and the $stateParams object becomes { contactId: 42 }.
    url: '/{contactId:[0-9]{1,4}}',

    // If there is more than a single ui-view in the parent template, or you would
    // like to target a ui-view from even higher up the state tree, you can use the
    // views object to configure multiple views. Each view can get its own template,
    // controller, and resolve data.

    // View names can be relative or absolute. Relative view names do not use an '@'
    // symbol. They always refer to views within this state's parent template.
    // Absolute view names use a '@' symbol to distinguish the view and the state.
    // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
    views: {

      // So this one is targeting the unnamed view within the parent state's template.
      '': {
        templateUrl: 'app/contacts/contacts.detail.html',
        controller: ['$scope', '$stateParams', 'utils',
          function (  $scope,   $stateParams,   utils) {
            $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
          }]
      },

      // This one is targeting the ui-view="hint" within the unnamed root, aka index.html.
      // This shows off how you could populate *any* view within *any* ancestor state.
      'hint@': {
        template: 'This is contacts.detail populating the "hint" ui-view'
      },

      // This one is targeting the ui-view="menuTip" within the parent state's template.
      'menuTip': {
        // templateProvider is the final method for supplying a template.
        // There is: template, templateUrl, and templateProvider.
        templateProvider: ['$stateParams',
          function ($stateParams) {
            // This is just to demonstrate that $stateParams injection works for templateProvider.
            // $stateParams are the parameters for the new state we're transitioning to, even
            // though the global '$stateParams' has not been updated yet.
            return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
          }]
      }
    }
  })

  //////////////////////////////
  // Contacts > Detail > Item //
  //////////////////////////////

  .state('contacts.detail.item', {

    // So following what we've learned, this state's full url will end up being
    // '/contacts/{contactId}/item/:itemId'. We are using both types of parameters
    // in the same url, but they behave identically.
    url: '/item/:itemId',
    views: {

      // This is targeting the unnamed ui-view within the parent state 'contact.detail'
      // We wouldn't have to do it this way if we didn't also want to set the 'hint' view below.
      // We could instead just set templateUrl and controller outside of the view obj.
      '': {
        templateUrl: 'app/contacts/contacts.detail.item.html',
        controller: ['$scope', '$stateParams', '$state', 'utils',
          function (  $scope,   $stateParams,   $state,   utils) {
            $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);

            $scope.edit = function () {
              // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
              // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
              // Here we are going down to the child state 'edit' (full name of 'contacts.detail.item.edit')
              $state.go('.edit', $stateParams);
            };
          }]
      },

      // Here we see we are overriding the template that was set by 'contacts.detail'
      'hint@': {
        template: ' This is contacts.detail.item overriding the "hint" ui-view'
      }
    }
  })

  /////////////////////////////////////
  // Contacts > Detail > Item > Edit //
  /////////////////////////////////////

  // Notice that this state has no 'url'. States do not require a url. You can use them
  // simply to organize your application into "places" where each "place" can configure
  // only what it needs. The only way to get to this state is via $state.go (or transitionTo)
  .state('contacts.detail.item.edit', {
    views: {

      // This is targeting the unnamed view within the 'contacts.detail' state
      // essentially swapping out the template that 'contacts.detail.item' had
      // inserted with this state's template.
      '@contacts.detail': {
        templateUrl: 'app/contacts/contacts.detail.item.edit.html',
        controller: ['$scope', '$stateParams', '$state', 'utils',
          function (  $scope,   $stateParams,   $state,   utils) {
            $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
            $scope.done = function () {
              // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
              $state.go('^', $stateParams);
            };
          }]
      }
    }
  });
```

```html
<!-- index.html -->
<ul class="nav">
<!-- Here you can see ui-sref in action again. Also notice the use of $state.includes, which
     will set the links to 'active' if, for example on the first link, 'contacts' or any of
     its descendant states are activated. -->
  <li ng-class="{active: $state.includes('contacts')}"><a ui-sref="contacts.list">Contacts</a></li>
  <li ui-sref-active="active"><a ui-sref="about">About</a></li>
</ul>
// named ui-view, we'll populate this one form various different child states and need a name to help us target
<p ui-view="hint" class="navbar-text pull-right"></p>
// main ui-view (unnamed)
<div ui-view class="container slide" style="padding-top: 80px;"></div>
<script type="text/javascript">
  $state = {{$state.current.name}}
  $stateParams = {{$stateParams}}
  $state full url = {{ $state.$current.url.source }}
  <!-- $state.$current is not a public api, we are using it to
       display the full url for learning purposes-->
</script>

<!-- contacts.html -->
<ul class="nav nav-list">
  <li ng-class="{ active: $state.includes('contacts.list') }">
    <a ui-sref="contacts.list">All Contacts</a>
  </li>
  <li class="nav-header">Top Contacts</li>

  <!-- This <li> will only add the 'active' class if 'contacts.detail' or its descendants are active
       AND if it is the link for the active contact (aka contactId) -->
  <li ng-repeat="contact in contacts | limitTo:2" ui-sref-active="active">
    <!-- Here's a ui-sref that is also providing necessary parameters -->
    <a ui-sref="contacts.detail({contactId:contact.id})">{{contact.name}}</a>
  </li>
</ul>

<!-- Another named view -->
<div ui-view="menuTip" class="slide"></div>

<!-- Our unnamed main ui-view for this template -->
<div ui-view class="span9 slide"></div>


<!-- contacts.detail -->
<div>
  <h2>{{contact.name}}</h2>
  <ul>
    <li ng-repeat="item in contact.items">

      <!-- Here's another ui-sref except THIS time we are passing parameters
           AND inheriting parameters from active ancestor states. So we don't
           need to resupply the contactId parameter. -->
      <a ui-sref="contacts.detail.item({itemId:item.id})">{{item.type}}</a>
    </li>
  </ul>
  <div ui-view class="slide">
    <!-- Example of default content. This content will be replace as soon as
         this ui-view is populate with a template -->
    <small class="muted">Click on a contact item to view and/or edit it.</small>
  </div>
</div>

<!-- contacts.detail.item -->
<hr>
<h4>{{item.type}} <button class="btn" ng-click="edit()">Edit</button></h4>
<div>{{item.value}}</div>


<!-- contacts.detail.item.edit -->
<hr>
<h4>{{item.type}} <button class="btn" ng-click="done()">Done</button></h4>
<div><input type="text" ng-model="item.value" /></div>
```


### 内幕


```js
// Override the internal 'views' builder with a function that takes the state
// definition, and a reference to the internal function being overridden:
$stateProvider.decorator('views', function (state, parent) {
  var result = {},
      views = parent(state);
 
  angular.forEach(views, function (config, name) {
    var autoName = (state.name + '.' + name).replace('.', '/');
    config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
    result[name] = config;
  });
  return result;
});
```
