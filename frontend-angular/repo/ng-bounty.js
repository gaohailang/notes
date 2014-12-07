'use strict';

if (document.location.host === 'www.bo.com') {
    window.BS_CONFIG = {
        environment: 'production',
        api_host: '',
        mixpanel: '',
        google_analytics;
        '',
        google_wallet_url: ''
    };
} else if {
    // staing
} else {
    // development
}


// MODULE 分层

angular.module('bountysource', ['constants', 'services', 'directives', 'filters', 'factories', 'resources']);

angular.module('activity', ['bountysource']);
angular.module('fundraisers', ['bountysource']);
angular.module('teams', ['bountysource']);

angular.module('app', [
    // ngRoute, santitize, cookies,
    // ui.bootstrap, ui.inflector, colorpicker.module, ui.scrollfix
    // activity, fundraisers, teams
]);

angular.module('app')
    .config(function() {

    })
    .controller('AppController', function() {
        // on route change to update title
        // $pageTitle.set(current.$$route.title)

        // init a zenBox for feedback
    })
    .run(function() {
        $api.load_current_person_from_cookies();
        // on routeChangeSuccess to scrillTo(0,0) to reset scrollbar
    });


// 外部依赖
// 比较特殊的是代码分为app & common

// common - constants, directives, factories, filters, resources, services, templates

// resources 分为： bounties, comments, issue, shopping_cart, shopping_cart_item, tracker

// services 有： api,

angular.module('services').service('$api', function(
    $http, $q,
    $cookieStore, $rootScope,
    $location, $window,
    $sniffer, $filter,
    $log, $analytics,
    Person
) {
    var $api = this;
    this.access_cookie_name = 'v2_access_token';
    // set api_host based on environment

    // temporary housing for v2 api routes
    this.v2 = {};

    // signature: (url, 'POST', {foo: bar}, optional_callback)
    // base wrapper handler
    this.call = function() {
        // parse arguments

        // merge in params

        // pull of perPage if it was set

        // reset temporary perpage holder

        // deferred jsonp call with a promose
        var deferred = $q.defer();
        if ($sniffer.cors) {
            // cors_callback - $log api error, trans request etc
            var cors_callback = function(response) {

            };

            deferred.resolve(callback(parsed_response));
        } else {
            params._method = method;
            params.callback = 'JSON_CALLBACK';
            $http.jsonp(url, {
                params: params
            }).suucess(function(response) {
                deferred.resolve(callback(response));
            });
        }

        return deferred.promise;
    };

    this.fundraiser_cards = function() {
        return this.call('/fundraisers/cards', function(r) {
            return r.data.in_progress.concat(r.data.completed);
        });
    };

    this.start_solution = function(issue_id, data) {
        return this.call("/issues/" + issue_id + "/solution", "POST", data, function(response) {
            $api.require_signin($location.path(), {
                show_new_solution_form: true,
                code_url: data.url,
                completion_date: data.completion_date,
                note: data.note
            });
            return response.data;
        });
    };



    // ignore lots

    this.cancel_all_notifications = function(email) {
        return this.call('/notifications/cancel_all', 'POST', {
            email: email
        }, function(response) {
            return response.meta.success;
        });
    };

    // this auth should go in a "AuthenticationController" or something more angualr
    this.signin = function(form_data) {
        return this.call("/user/login", "POST", {
            email: form_data.email,
            password: form_data.password,
            account_link_id: form_data.account_link_id,
            mixpanel_id: form_data.mixpanel_id
        }, function(response) {
            if (response.meta.status === 200) {
                // NOTE: /user/login doesn't return the same as /user... so to be safe we make another api call
                $api.signin_with_access_token(response.data.access_token);
            }
            return response.data;
        });
    };
    this.signin_with_access_token = function(access_token) {
        return this.call('/user', {
            access_token: access_token
        }, function(response) {
            if (response.meta.status === 200) {

                $api.set_current_person(response.data);
                $api.goto_post_auth_url();
            } else {
                return false;
            }
        })
    };

    this.load_current_person_from_cookies = function() {
        var access_token = $api.get_access_token();
        if (access_token) {
            //console.log("Verifying access token: " + access_token);
            this.call("/user", {
                access_token: access_token
            }, function(response) {
                if (response.meta.status === 200) {
                    console.log("access token still valid");
                    response.data.access_token = access_token; // FIXME: why doesn't /user include an access token when it's you?

                    var person = new Person(response.data);
                    $api.set_current_person(person);
                } else {
                    console.log("access token expired. signing out.");
                    $api.set_current_person();
                }
            });
        } else {
            $api.set_current_person();
        }
    };

    this.set_current_person = function(person) {
        // something like that
        $rootScope.current_person = new Person(angular.copy(person));
        $api.set_access_token($rootScope.current_person.access_token);

        // Identify with Mixpanel HERE
        $analytics.mixpanel.identify(person.id);
    };

    this.goto_post_auth_url = function() {
        var redirect_url = $cookieStore.get('postauth_url') || '/';
        this.clear_post_auth_url();
        $location.url(redirect_url).replace();
    };

    // helpers - toKeyValue, signin_url_for, encodeUriQuery
    this.pathMerge = function(url, params) {

    };

    // save previous url
    this.require_signin = function(path, params) {
        if (!$rootScope.current_person) {
            if (path) {
                this.set_post_auth_url(path, params);
            } else {
                var url = $location.path();
                this.set_post_auth_url(url);
            }
            $location.url("/signin");
        }
    };
});

// router.js
angular.module('app').config(function($routeProvider, defaultRouteOptions, personResolver) {

    // trackEvent def,
    $routeProvider.when('/', angular.extend({
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        trackEvent: 'View Homepage',
        resolve: {
            count: function($rootScope, $api) {
                $api.people_count().then(function(count) {
                    $rootScope.people_count = count;
                });
            }
        }
    }, defaultRouteOptions));

    // lots of other routes definition
});

// 每个module内置可以有templates
$api

$pageTitle

// module
angular.module('app').controller('HomeCtrl', function($scope, $window, $api, $q, Tracker) {
    // top fundraieser
    $api.v2.fundraisers({
        featured: true,
        per_page: 4,
        order: 'pledge_total'
    }).then(function(repsonse) {
        $scope.topFundraisers = angular.copy(response.data);
    });

    // other dep:  Tracker(Resource), people[order-created_at], backers, people[order-followers]
})


// 各式各样的directive
targetBlank

signalIcon
angular.module('directives').directive('signalIcon', function() {
    return {
        restrict: 'E',
        templateUrl: '',
        replace: true,
        transcule: true,
        scope: {
            percent: '='
        }
    }
});

/*
<signal-icon percent="issue.relevance"></signal-icon>
span>i.glyphicon.glyphicon-signal[ng-show="percent>= 20"]
*/