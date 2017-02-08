define(['angular'], function () {
    'use strict';

    var app = angular.module('app',
        [
            'ngAnimate',
            'ui.router',
            'ngSanitize',
            'ngTouch',
            'ngCookies'
        ]);
    app.config(['$httpProvider',function ($httpProvider) {
        $httpProvider.defaults.transformRequest = function(data){
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        };
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }]);
    return app;
});