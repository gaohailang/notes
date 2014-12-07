## Intro


### Demo
https://github.com/htmlxprs/ionic-realtime-image-share

```js
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('event:new:image',function(data){
        socket.broadcast.emit('event:incoming:image',data);
    });
});

server.listen(8000,function(){
    console.log('Socket.io Running');
});


// client.js
angular.module('imageShare', ['ionic','com.htmlxprs.imageShare.controllers','com.htmlxprs.imageShare.services','com.htmlxprs.imageShare.directives'])
.run(function($ionicPlatform,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    $state.go('home');
  });
}).config(['$stateProvider',function($stateProvider){
        $stateProvider.state('home',{
            url:'/home',
            controller:'HomeController',
            templateUrl:'views/home.html'
        }).state('chat',{
            url:'/chat',
            controller:'ChatController',
            templateUrl:'views/chat.html'
        });
}]);


angular.module('com.htmlxprs.imageShare.controllers',[]).controller('HomeController',['$scope','USER','$state',function($scope,USER,$state){
    $scope.user={};
    $scope.next=function(){
        USER.name=$scope.user.name;
        $state.go('chat');
    }
}]).controller('ChatController',['$scope','$rootScope',function($scope,$rootScope){

    $rootScope.$on('event:file:selected',function(event,data){
        //console.log(data.image)
    });

}]);

angular.module('com.htmlxprs.imageShare.services',[]).value('USER',{}).value('SOCKET_URL','localhost:8000');



angular.module('com.htmlxprs.imageShare.directives',[]).directive('browseFile',['$rootScope','USER',function($rootScope,USER){
    return {
        scope:{},
        replace:true,
        restrict:'AE',
        link:function(scope,elem,attrs){

            scope.browseFile=function(){
                document.getElementById('browseBtn').click();
            }

            angular.element(document.getElementById('browseBtn')).on('change',function(e){
               var file=e.target.files[0];
               angular.element(document.getElementById('browseBtn')).val('');
               var fileReader=new FileReader();
               fileReader.onload=function(event){
                   $rootScope.$broadcast('event:file:selected',{image:event.target.result,sender:USER.name});
               }
               fileReader.readAsDataURL(file);
            });

        },
        templateUrl:'views/browse-file.html'
    }
}]).directive('chatList',['$rootScope','SOCKET_URL',function($rootScope,SOCKET_URL){
    return{
        replace:true,
        restrict:'AE',
        scope:{},
        link:function(scope,elem,attrs){
            var socket=io(SOCKET_URL);
            scope.messages=[];
            $rootScope.$on('event:file:selected',function(event,data){
                socket.emit('event:new:image',data);
                scope.$apply(function(){
                    scope.messages.unshift(data);
                });
            });

            socket.on('event:incoming:image',function(data){
                scope.$apply(function(){
                    scope.messages.unshift(data);
                });
            });
        },
        templateUrl:'views/chat-list.html'
    }
}]);


var fileReader=new FileReader();

fileReader.onload=function(event){
    $rootScope.$broadcast('event:file:selected'{image:event.target.result,sender:USER.name});
};

fileReader.readAsDataURL(file);
// we set the value of the file input to empty so that a change event will be fired if the user selects the same image again
angular.element(document.getElementById('browseBtn')).val('');

```

```html
<!-- your app's js -->
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<script src="js/services.js"></script>
<script src="js/directives.js"></script>

<body ng-app="imageShare">
<ion-nav-bar class="bar-positive">
    <ion-nav-back-button class="button button-icon icon ion-ios7-arrow-left">Back</ion-nav-back-button>
</ion-nav-bar>
<ion-nav-view animation="slide-left-right"></ion-nav-view>
</body>


<ion-view title="Just a Minute" >
    <ion-content has-header="true" padding="true">
        <div class="card">
            <div class="item item-divider">
                Enter a nickname
            </div>
            <div class="item item-text-wrap">
                <input type="text" placeholder="Select nickname" ng-model="user.name"/>
            </div>
        </div>
        <div class="content padding">
            <button class="button button-positive button-block" ng-click="next()">
                Next
            </button>
        </div>
    </ion-content>
</ion-view>

<ion-view title="Let's share some pics" >
    <ion-content has-header="true" padding="true">
        <browse-file></browse-file>
        <chat-list></chat-list>
    </ion-content>
</ion-view>

<!-- chat-list -->
<div class="list">
    <a class="item" href="#" ng-repeat="message in messages track by $index">
        <h2>{{message.sender}}</h2>
        <img ng-src="{{message.image}}">
    </a>
</div>

<!-- browse-file -->
<div class="content padding">
    <input type="file" id="browseBtn" accept="image/*"/>
    <button class="button button-block button-calm ion-paperclip uploadButton" ng-click="browseFile()">
        Select File
    </button>
</div>
```