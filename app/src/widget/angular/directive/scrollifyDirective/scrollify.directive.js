define(['jquery','app'], function ($,app ) {
    'use strict';

    /*lazyload demo*/

    app.controller('scrollifyDemoCtrl', ['$scope', function ($scope) {

        $scope.arr = [1,2,3,4];

    }]);


    app.directive('scrollify', ['$timeout', function ($timeout) {
        var result = {};
        result.restrict = 'A';
        result.replace = false;
        result.scope = {};
        result.link = function (scope, element) {

            $timeout(function () {
                $(function() {
                    $.scrollify({
                        section : ".box>li",
                        //sectionName:false,
                        //scrollbars:false,
                        interstitialSection:".banner-content,.footer-content"
                    });
                });
            });

        };
        return result;
    }]);


});