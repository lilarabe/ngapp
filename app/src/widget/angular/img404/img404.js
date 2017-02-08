define(['jquery', 'app'], function ($, app) {
    'use strict';
    app.directive('img404',[function () {
        var result = {};
        result.restrict = 'A';
        result.replace = false;
        result.scope = false;
        result.link = function (scope, element, attr) {
            var src = attr.img404 ? attr.img404 : 'app/src/images/public/404.jpg';
            $(element).bind('error', function () {
                attr.$set('src', src);
            });
        };
        return result;
    }]);
});