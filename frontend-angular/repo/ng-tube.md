## Markdown


### 模版层代码
```html
<!-- index.html -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ng-tube</title>
    <link rel="stylesheet" href="./assets/app.css">
</head>
<body nt-scroll-to-top nt-loading-indicators>
    <div id="wrapper">
        <header class="nt-header">
            <form ng-submit="search()" ng-controlle="SearchFormCtrl" class="nt-search-header">
                <section>
                    <a href="#/" class="fa fa-home nt-nav-icon"></a>
                    <span class="fa fa-search nt-nav-icon nt-search-icon" ng-click="search()"></span>
                    <input type="search" ng-model="q" class="nt-search-input">
                    <a ng-click="advanced=advanced?null:{}"></a>
                </section>
                <section class="nt-advanced-search-header row" ng-if="advanced">
                    <datalist ng-controller="CategoryListCtrl" id="categories">
                        <option value="{{category}}" ng-repeat="category in categories"></option>
                    </datalist>
                    <div class="col-md-4">
                        <input type="text" ng-model="advanced.category" placeholder="Youtube Category" list="categories" class="form-control">
                    </div>
                    <div class="col-md-4"></div>
                    <button class="col-md-2 btn btn-default">
                        <span class="fa fa-search"></span>
                        Submit Search
                    </button>
                </section>
            </form>
        </header>
        <main id="view-container" class="nt-view-container">
            <div ng-view class="nt-view"></div>
        </main>
    </div>
</body>
</html>

<!-- home.html -->
<section class="nt-panel">
    <header>
        <h5 class="nt-heading col-md-6">
            
        </h5>
        <div class="col-md-6 nt-categories-list nt-panel-actions">
            <span class="fa fa-search"></span>
            <div class="nt-categories-list-items">
                <a class="nt-categories-list-item"
                   ng-repeat="category in categories"
                   ng-href="#/?c={{category}}"
                   ng-class="{
                        'selected': current_category==category
                    }"></a>
            </div>
            <a class="nt-view-icon" ng-click="setLayout('details')">
                <span class="fa fa-list"></span>
            </a>
            <a class="nt-view-icon" ng-click="setLayout('pictures')">
                <span class="fa fa-th"></span>
            </a>
        </div>
    </header>
    <div class="nt-panel-content">
        <div class="nt-video-list row nt-grid">
            <div class="nt-videos-list-entry col repeater"
                 ng-include="tpl('video-listing')"
                 ng-repeat="video in videos | limit: 24"
                 ng-class="{
                    'detail-layout col-md-6': isLayout('details'),
                    'picture-layout col-md-3': isLayout('pictures')
                }"></div>
        </div>
    </div>
</section>

<!-- watch.html -->
<section class="nt-panel">
    <header>
        <h5 class="nt-heading">
            {{video.title}}
        </h5>
    </header>
    <div class="nt-player-panel">
        <div class="nt-player" yt-video-player="{{video_id}}"></div>
    </div>
    <div class="row nt-grid">
        <div class="col-md-8 col"></div>
        <div ng-controller="VideoPanelCtrl" class="nt-video-panel col-md-4 col">
            <header>
                <h5>Related Videos</h5>
            </header>
            <div class="nt-player-videos off">
                <div class="nt-videos-list row nt-grid">
                    <div ng-include="tpl('video-list')"
                         ng-repeat="video in relatedVideos | limit:14"
                         class="col-md-6 nt-videos-list-entry thumb-layout">
                     </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- video-listing.html -->
<a href="#/watch/{{video.id}}" class="nt-video-entry-link">
    <img ng-src="{{video.image.url}}">
    <h5 class="nt-heading">{{video.title}}</h5>
    <p>{{video.description}}</p>
</a>

```

### 业务逻辑代码
```js
angular.module('ntApp', ['ytCore', 'ngRoute', 'ntAnimations'])
.constant('TPL_PATH', './templates')
.run(['$rootScope', 'TPL_PATH', function($rootScope, TPL_PATH) {
    $rootScope.tpl = function(file) {
        return TPL_PATH+'/'+file+'.html';
    };

    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.$broadcast('ntLoadingStart');
    });
}])
.config(function($routeProvider, TPL_PATH) {
    $routeProvider.when('/', {
        controller: 'HomeCtrl',
        templateUrl: TPL_PATH+'/home.html',
        reloadOnSearch: false
    }).when('/watch/:id', {
        controller: 'WatchCtrl',
        templateUrl: TPL_PATH+'/watch.html',
        resolve: {
            videoInstance: ['ytVideo', '$location', function(ytVideo, $location) {
                var id = $location.path().match()[1];
                return ytVideo(id);
            }]
        }
    });
})
.factory('getSet', function(){
    var val;
    return function (data){
        return arguments.length ? (val = data) : val;
    };
})
.factory('currentVideo', function(getSet) {
    return getSet();
})
.value('appCategories', ['funny', 'programming', 'web development', 'music', 'video games'])
.filter('limit', function() {
    return function(results, limit) {
        return results && results.slice(0, limit);
    }
})
.directive('ntScrollToTop', ['$window', '$rootScope', function($window, $rootScope) {
    return function() {
        $rootScope.$on('$routeChangeStart', function() {
            $window.scrollTo(0, 0);
        });
    };
}])
.directive('ntLoadingIndicator', function() {
    return function(scope) {
        NProgress.configure({ease: 'ease', speed: 500});
        scope.$on('ntLoadingStart', function() {
            NProgress.start();
        });
        // 非常有意思， 通过在controller里面等界面数据Ready后显式的调用
        scope.$on('ntLoadingEnd', function() {
            NProgress.end();
        });
    }
})
.controller('HomeCtrl', function($scope, $rootScope, $location, ytSearch, ytFeed, TPL_PATH) {

    var layout;
    $scope.setLayout = function(l) {
        layout = l;
    };

    $scope.isLayout = function(l) {
        return layout == l;
    };

    function hasLocationChanged() {
        return $location.path().indexOf('watch') >= 0;
    }

    $scope.$watchCollection(function() {
        return $location.search();
    }, function(data) {
        if(hasLocationChanged()) return;

        $scope.setLayout('pictures');

        // re data
        var c = data.c;
        if(c && c.length > 0) {
            $scope.searchTerm = c;
            $scope.searchMethod = 'category';
        } else {
            data.q = data.q || 'AngularJS';
            $scope.searchMethod = 'query';
            $scope.searchTerm = data.q;
        }

        $rootScope.$broadcast('ntLoadingStart');

        ytSearch(data).then(function(videos) {
            $scope.videos = videos;
            $rootScope.$broadcast('ntLoadingEnd');
        });

        ytFeed('most_popular').then(function(videos) {
            $scope.popularVideos = videos;
        });
    });
})
.controller('WatchCtrl', function($scope, $rootScope, $location, videoInstance, ytVideoComments, TPL_PATH, currentVideo, ytSearch, ytRelatedVideos) {
    
    var videoID = videoInstance.id;
    $scope.video_id = videoID;
    $scope.video = videoInstance;

    ytVideoComments(videoInstance.id).then(function(comments) {
        $scope.video_comments = comments;
    });

    currentVideo(videoInstance);

    ytRelatedVideos(videoID).then(function(videos) {
        $scope.relatedVideos = videos;
        $rootScope.$broadcast('ntLoadingEnd');
    });

    $scope.$on('$destroy', function() {
        currentVideo(null);
    });
})
.controller('VideoPanelCtrl', function($scope, currentVideo) {
    $scope.video = currentVideo();
})
.controller('CategoryListCtrl', function($scope, appCategories) {
    $scope.categories = appCategories;
})
.controller('SearchFormCtrl', function($scope, $location) {
    $scope.search = function() {
        // at last - Tips: 通过search方法来构建query, 最后在path到根
        $location.search({
            q: q||'',
            c: category||'',
            o: order||''
        }).path('/');
    };

    $scope.$on('$routeChangeStart', function() {
        $scope.advanced = false;
    });

    $scope.orderingOptions = ['relevance', 'published', 'viewCount', 'rating', 'position', 'viewCount'];
});

```


### 相关服务代码
```js
var BASE_TEN = 10;

// 常量
// config
// factory - base, extend

angular.module('ytCore', [])
.constant('YT_VIDEO_URL', 'https://gdata.youtube.com/feeds/api/videos/{ID}?v=2&alt=json&callback=JSON_CALLBACK')
.config(['$sceDelegateProvider', function($sceDelegateProvider) {}])
.factory('ytCreateEmbedURL',function(YT_EMBED_URL) {

})
.factory('ytCreatePosterUrl',function(YT_POSTER_URL) {

})
.factory('ytVideoPrepare', function(ytCreateEmbedURL) {

    return function(entry) {

        return {
            id: id,
            image: hqVideo || thumbnails[0],
            thumbnails: thumbnails,
            title: entry.title.$t,
            description: $media.media$description.$t,
            rating: entry.gd$rating ? parseInt(entry.gd$rating.average, BASE_TEN) : 0,
            keywords: $media.media$keywords || '',
            embedUrl: ytCreateEmbedURL(id)
        }
    }
})
.value('ytSearchParams', function(baseUrl, params) {
    var attrs = '';
    angular.forEach(params, function(value, key) {

        attrs += (baseUrl.indexOf('?') === -1 ? '?' : '&') + attr + '=' + value;
    });
    return baseUrl + attrs;
})
.factory('ytVideo', function($q, $http, ytVideoPrepare, YT_VIDEO_URL) {

    return function(id) {
        var defer = $q.defer();
        var url = YT_VIDEO_URL.replace('{ID}', id);
        $http.jsonp(url)
        .success(function(response) {
            defer.resolve(ytVideoPrepare(response.entry));
        })
        .error(function() {
            return 'failure';
        });
        return defer.promise;
    }
})
.factory('ytVideos', function($q, $http, ytVideoPrepare) {

})
.factory('ytFeed', function(ytVideos, YT_POPULAR_URL) {
    return function(feed) {
        var url = YT_POPULAR_URL.replace('{FEED}', feed);
        return ytVideos(url);
    }
})
.factory('ytSearch', function(ytVideos, ytSearchParams, YT_SEARCH_URL) {
    return function(data) {
        data = typeof data === 'string' ?
            {q: data} :
            data;
        var url = ytSearchParams(YT_SEARCH_URL, data);
        return ytVideos(url);
    }
})
.factory('ytVideoComments', function($q, $http, YT_VIDEO_COMMENTS_URL) {

})
.directive('ytVideoPlayer',function(ytCreateEmbedURL, ytCreatePosterUrl) {

});


// ntAppAnimations.js
angular.module('ntAnimations', ['ngAnimate'])
.animation('.nt-extend', function($route) {
    var formerRoute;
    return {
        enter: function(element, done) {
            var expectedHeight = element.height();
            element.css('left', -50);
            element.css('opacity', 0);
            element.animate({
                'left': 0,
                'opacity': 1
            }, done);
        },
        leave: function(element, done) {
            var expectedHeight = element.height();
            element.animate({
                'left': -50,
                'opacity': 0
            }, done);
        }
    }
});
```