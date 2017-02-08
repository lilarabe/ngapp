define(['app'], function (app ) {
    'use strict';

    /*lazyload demo*/

    app.controller('lazyLoadDemoCtrl', ['$scope', function ($scope) {

        $scope.images=[];
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/01.jpg'});
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/02.jpg'});
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/03.jpg'});
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/04.jpg'});
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/05.jpg'});
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/06.jpg'});
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/07.jpg'});
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/08.jpg'});
        $scope.images.push({src : '/app/src/widget/angular/bannerArrowMove/images/09.jpg'});

    }]);


    app.directive('lazyload', ['$timeout', function ($timeout) {
        var result = {};
        result.restrict = 'A';
        result.replace = false;
        result.scope = {};
        result.link = function (scope, element) {

            $timeout(function () {
                $(element).lazyload({
                    effect : "fadeIn"
                });
            });

        };
        return result;
    }]);


});