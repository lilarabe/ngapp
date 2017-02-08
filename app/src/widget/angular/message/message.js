define(['jquery','app'], function ($, app) {
    'use strict';


    /*message*/
    app.directive('message', ['$rootScope', '$timeout', function ( $rootScope, $timeout ) {
        var result = {};
        result.restrict = 'E';
        result.replace = true;
        result.templateUrl = '/app/src/widget/angular/message/message.html?v=' + app_global.v;
        result.scope = false;
        result.link = function (scope, element) {
            scope.okBtn = false;
            scope.confirmBtn = false;
            scope.fn = null;

            /*点击阴影 关闭*/
            $(element).bind('click', function () {
                close();
            });

            /*点击取消 关闭*/
            scope.confirmFn = function () {
                close();
            };

            /*点击确定*/
            scope.okFn = function () {
                $timeout(function () {
                    if ( angular.isFunction(scope.fn) ) {
                        scope.fn();
                    }
                    close();
                });
            };

            /*阻止冒泡*/
            $(element).children().bind('click', function () {
                return false;
            });

            /*接收事件 锁定屏幕 无法关闭*/
            scope.$on('eventLockMessage', function () {
                scope.okBtn = false;
                scope.confirmBtn = false;
                $(element).unbind('click');
                open();
            });

            /*接收事件 confirm*/
            scope.$on('eventConfirmMessage', function ($event, fn) {
                scope.fn = fn;
                scope.okBtn = true;
                scope.confirmBtn = true;
                open();
            });

            /*接收 确认 事件 执行Fn*/
            scope.$on('eventFnMessage', function ($event, fn) {
                scope.fn = fn;
                scope.okBtn = true;
                open();
            });

            /*接收事件 打开*/
            scope.$on('eventOpenMessage', function () {
                scope.okBtn = true;
                open();
            });

            /*接收事件 关闭*/
            scope.$on('eventCloseMessage', function () {
                scope.fn = null;
                close();
            });

            /*关闭*/
            var close = function () {
                scope.okBtn = false;
                scope.confirmBtn = false;
                $rootScope.message = {};
                $(element).hide();
            };

            /*打开*/
            var open = function () {
                $timeout(function () {
                    scope.msg = $rootScope.message.msg;
                    
                    $(element).show();
                    
                });
            };
        };
        return result;
    }]);

    app.factory('message', ['$rootScope', function ( $rootScope ) {
        $rootScope.message = {};
        return {
            'open' : function (msg, type, fn) {
               
                $rootScope.message.msg = msg;
                //console.log($rootScope.message.msg);
                if (type === 'lock') {/*只显示，不可关闭*/
                    $rootScope.$broadcast('eventLockMessage');
                } else if ( type === 'confirm' ) {/*取消关闭，确认执行Fn*/
                    if ( angular.isFunction(fn) ) {
                        $rootScope.message.fn = fn;
                    }
                    $rootScope.$broadcast('eventConfirmMessage', fn);
                } else if ( type === 'fn' ) {/*确认执行Fn*/

                    if ( angular.isFunction(fn) ) {
                        $rootScope.message.fn = fn;
                    }
                    $rootScope.$broadcast('eventFnMessage', fn);

                } else {/*显示，确认关闭*/
                    $rootScope.$broadcast('eventOpenMessage');
                }
                //$rootScope.$apply();
            },
            'close' : function () {/*强行关闭*/
                $rootScope.$broadcast('eventCloseMessage');
            }
        };
    }]);

   
    /*message2*/
    app.directive('message2',['$rootScope','$timeout', function ( $rootScope, $timeout ) {
        return {
            restrict : 'E',
            replace : true,
            templateUrl : '/app/src/widget/angular/message/message2.html?v=' + app_global.v,
            scope : false,
            link : function (scope ) {

                $rootScope.$on('eventMessage2Open', function ($event, msg) {
                    scope.success = true;
                    scope.text = msg;
                    $timeout(function(){
                        scope.success = false;
                    },3000);

                });
            }
        };
    }]);
});