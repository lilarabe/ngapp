define(['jquery', 'app'], function ($, app) {
    'use strict';

    app.directive('isScrollEnd',['$timeout', function ($timeout) {
        var result = {};
        result.restrict = 'A';
        result.replace = false;
        result.scope = false;
        result.link = function (scope, element) {
            var ele = $(element);
            var dist = 10;
            scope.$on('eRepeatEnd', function () {
                var height = ele.outerHeight(true);
                if ( ele.children().length != 1) {
                    console.log('内部高度无法计算,isScrollEnd结束');
                    return;
                }
                ele.bind('scroll', function () {
                    var innerHeight = ele.children().eq(0).outerHeight(true);
                    var scrollTop = $(this).scrollTop();
                    //console.log((scrollTop+height+dist)+'--'+innerHeight);
                    if ( scrollTop + height + dist >= innerHeight) {
                        //console.log('ScrollEnd');
                        $timeout(function() {
                            scope.$emit('eScrollEnd');
                        });
                    }
                });
            });

        };

        return result;
    }]);
});