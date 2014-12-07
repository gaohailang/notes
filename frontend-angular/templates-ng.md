

```js

<script type="text/ng-template" id="snippets/compatible.html">
    <p style="text-align:center">您使用的浏览器可能存在兼容性问题，建议您使用&nbsp;<a href="https://www.google.com/intl/zh/chrome/browser/" target="_blank">Chrome</a>&nbsp;来更好的使用开发者服务。</p>
</script>

<div pmt-template id="snippets/google-translate.html">
    <div id="google_translate_element" style="position:absolute;right:0"></div>
    <script type="text/javascript">function googleTranslateElementInit() {  new google.translate.TranslateElement({pageLanguage: "zh-CN", layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true, gaId: "UA-15790641-48"}, "google_translate_element");}</script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</div>

.run(function($http, $compile, $templateCache) {
    // or use script compile directive to put template cache
    $http.get('templates/base/snippets.html').then(function(resp) {
        $compile(angular.element(resp.data));
        // add compatible check and notice
        if (navigator && navigator.userAgent && (navigator.userAgent.indexOf('Chrome') === -1)) {
            $('body').prepend($templateCache.get('snippets/compatible.html'));
        }
        // add a simple google translate for not zh user
        if (!~window.navigator.language.indexOf('zh')) {
            $('body').prepend($templateCache.get('snippets/google-translate.html'));
        }
    });
});

angular.module('pmtDirectives', ['ngCookies', 'pmtFormValidation', 'pmtPartial', 'pmtTextareaElastic', 'pmtDatePicker', 'pmtUploadDirectives'])
    .directive('pmtTemplate', ['$templateCache',
        function($templateCache) {
            // copy from script[type=ng/templates] to support inline script
            return {
                restrict: 'AE',
                terminal: true,
                compile: function(element, attr) {
                    var templateUrl = attr.id,
                        text = element.html();
                    $templateCache.put(templateUrl, text);
                }
            }
        }
    ])
    .directive('globalMessage', ['$rootScope', '$cookies',
```