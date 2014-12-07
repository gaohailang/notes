# protoshop-web 项目代码还不错

每一部分的代码都清晰简洁！命名也是。注释很清楚


目录结构
partials - 模版层

pg-{about, login, pkgedit, pkglist, register}
scene-element-{content, edit, handler, view}
scene-stage

sidebar-libs
dialog-share
navbar
notify

```html
<!-- navbar -->
<!-- 通过精简的方法去查询是否可以显示 -->
<nav class="navbar">
    <notify />
    <div class="navbar-header">
        <a href="" class="navbar-brand"></a>
        <button ng-show="isEditing()" ng-click="savePackage()">Save</button>
    </div>
    <button class="btn-logout"
        ng-show="isLoggedIn()" ng-click="logout($event)">
        <span>Logout</span>
    </button>
</nav>

<!-- notify -->
<ul class="notify">
    <li ng-repeat="item in items" class="notify-item {{'notify-item-'+item.type}}">
        item.message
    </li>
</ul>

<!-- page-about -->
<navbar />
<div class="layout-container">
    <div class="about-box"></div>
    <div class="about-box"></div>
    <div class="about-box"></div>
    <div class="about-box"></div>
</div>
```

Services - 服务层

目录结构：

- account.js
- backend.js (模块业务相关的数据资源)
- edit.js
- env


```js

// backend.js

app.factory('loadingIndicator', function() {
    var html = '';

    return function(show, info) {

    }; // 返回一个可以被调用的方法 show 就显示 append, 否着 remove spinner element
});

app.factory('backendService', function($http, ENV, notifySerivce, laodingIndicator, accountService) {
    // get token sync invoke 同步调用
    
    // 基础方法
    var errorLogger = function() {
        // console.log
        // notifySerice.error
    };

    var makeReuqest = function(data, url, callback, errCallback) {
        loadingIndicator(true, url);

        if (data) {
          // Make 'POST'
          $http.post(url, data)
          .success(function (res) {
            loadingIndicator(false, url);
            if (res.status === 0) {
              callback && callback(res.result);
            } else {
              notifyService.error(res.message);
              errCallback && errCallback(res);
            }
          })
          .error(httpErrLogger);
        } else {
          // Make 'GET'
          $http.get(url)
          .success(function (res) {
            loadingIndicator(false, url);
            if (res.status === 0) {
              callback && callback(res.result);
            } else {
              notifyService.error(res.message);
              errCallback && errCallback(res);
            }
          })
          .error(httpErrLogger);
        }
    };

    // 数据接口方法
    return {

        createProject: function (data, callback) {
          var url = ENV.apiHost + 'createPoject/';
          makeRequest(data, url, callback);
        }
    }

});
// 借鉴上面的 makeReuqest(backendSerive.xxx)，改造现有的 devcenter
base->bizModule


// account.js
// PS: 
// 在 pmt 中在 base module run [http 403] 的时候，去检查 isLogin 并且对授权页面直接调起
// 或者在 ctrl 中，检查 if(!accountService.isLogin()) return; // ensureLogin etc


// uilib.js - 调取配置数据等
app.factory('uilib', function($http) {
    return $http.get('scripts/asset/components.json');
});
// 使用 - elementContentEditor - controller init
uiprops.then(function(props) {
    $scope.props = props.data;
});

// notify service 和 notify directive 相互结合
// notify 实现的不错， timeout->shift item, closure with getItems method etc
app.factory('notifyService', ['$timeout', function(){
    var items = []; // colsure variable to store notify items

    function create(msg, type, timeout) {
        
        // 加入后，可以定时显示或者
        $timeout(function() {
            items.shift();
        }, timeout);

        return notifyService; // chain invoke
    }

    return notifyService = {
        // getItems, notify, info, done, warn, error etc
    };
}]);


```


```js
// login.js
function login() {
    if(account.isLoggedIn()) {
        return $location.path('list/');
    }
    $scope.doLogin = function() {
        var userData = {};
        account.login(userData, function() {
            $location.path('list/');
        });
    };
    $scope.sso = /ctripqa\.com\:9999/.test(window.location.href);
}

// 表单验证， 在 http 层统一处理


```