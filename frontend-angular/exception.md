http://www.mikeobrien.net/blog/client-side-exception-logging-and-notification-in-angular/


```js
angular.module('errorHandling', []). 
    constant('HTTP_DEFAULT_ERROR_MSG', 'An error has occured. Please contact customer support for assistance.').
    constant('HTTP_NETWORK_ERROR_MSG', 'Unable to communicate with the server. Make sure you are connected to the internet and try again.').
    config(function($httpProvider) {
        $httpProvider.interceptors.push(function($q, $rootScope, HTTP_DEFAULT_ERROR_MSG, HTTP_NETWORK_ERROR_MSG) {
            return { 
                responseError: function(response) {
                    var message = response.headers('status-text') || HTTP_DEFAULT_ERROR_MSG;
                    if (response.status == 0) message = HTTP_NETWORK_ERROR_MSG;
                    $rootScope.$broadcast('error', message);
                    return $q.reject(response);
                }
        }});

angular.module('errorHandling', []). 
    constant('SCRIPT_ERROR_MSG', 'An error has occured and the details have been logged. Please contact customer support for assistance.').
    constant('LOGGING_URL', '/errors/javascript').
    config(function($provide) {
        $provide.decorator('$exceptionHandler', function($delegate, $injector, $window, SCRIPT_ERROR_MSG, LOGGING_URL) {
            return function(exception, cause) {
                // Using injector to get around cyclic dependencies
                $injector.get('$rootScope').$broadcast('error', SCRIPT_ERROR_MSG);
                // Bypassing angular's http abstraction to avoid infinite exception loops
                $injector.get('$httpBackend')('POST', LOGGING_URL, angular.toJson({
                        message: exception.stack || exception.message || exception || '',
                        source: cause || '',
                        url: $window.location.href
                }), angular.noop, { 'content-type': 'application/json' });
                $delegate(exception, cause);
            };
        });
    });
```

TEST

```js
describe('Script error logging', function() {

    beforeEach(module('errorHandling', function($exceptionHandlerProvider) {
        $exceptionHandlerProvider.mode('log');
    }));

    var errors;

    beforeEach(inject(function($rootScope) {
        var scope = $rootScope.$new();
        errors = [];
        scope.$on('error', function(e, message) { errors.push(message); });
    }));

    afterEach(inject(function($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('should broadcast script errors and log them to the server', inject(function($exceptionHandler, $httpBackend, $window, LOGGING_URL, SCRIPT_ERROR_MSG) {
        $httpBackend.expectPOST(LOGGING_URL, 
            { message: 'oh hai', source: '', url: $window.location.href }, 
            { 'content-type': 'application/json'}).respond(200);
        $exceptionHandler('oh hai');
        $httpBackend.flush();
        expect(errors.length).to.be(1);
        expect(errors[0]).to.eql(SCRIPT_ERROR_MSG);
    }));

    it('should broadcast script errors even when server call fails', inject(function($exceptionHandler, $httpBackend, LOGGING_URL, SCRIPT_ERROR_MSG) {
        $httpBackend.whenPOST(LOGGING_URL).respond(500);
        $exceptionHandler('oh hai');
        $httpBackend.flush();
        expect(errors.length).to.be(1);
        expect(errors[0]).to.eql(SCRIPT_ERROR_MSG);
    }));
});
```