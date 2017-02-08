define(['jquery', 'app'], function ($, app) {
    'use strict';
    /* 显示ajax请求状态 */
    app.directive('loadStatus', ['$timeout', function ($timeout) {
        var result = {};
        result.restrict = 'A';
        result.replace = false;
        result.scope = false;
        result.link = function (scope, element, attr) {
            var elem = $(element);
            var type = attr.loadStatus;
            scope.$on('eventLoadStart', function () {
                elem.find('.load-status').remove();
                elem.nextAll('.load-status').remove();
                if ( type === 'hide' ) {
                    elem.css({
                        'display' : 'none',
                        'opacity' : 0
                    });
                }
                elem.after('<span class="load-status center"><img class="load-status-ing" src="/app/src/images/public/loading.png"><span class="load-status-text">数据加载中...</span>');
            });
            scope.$on('eventLoadEnd', function () {
                elem.nextAll('.load-status').remove();
                if ( type === 'hide' ) {
                    elem.css({
                        'display' : 'block'
                    });
                    elem.animate({
                        'opacity' : 1
                    },500);
                }
            });
            scope.$on('eventLoadNullData', function () {
                elem.nextAll('.load-status').remove();
                elem.after('<div class="load-status">数据加载完成</div>');
            });

        };
        return result;
    }]);
});