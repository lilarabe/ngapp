define(['jquery','app'], function ($, app) {
    'use strict';
    app
        /*判断浏览器*/
        .factory('getBrowser', [function () {
            var result = '';
            var explorer = window.navigator.userAgent ;
            if (explorer.indexOf("MSIE") >= 0) {
                if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8."){
                    result = 'IE8';
                } else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9."){
                    result = 'IE9';
                } else {
                    result = 'IE';
                }
            }
            else if (explorer.indexOf("Firefox") >= 0) {
                result = 'Firefox';
            }
            else if(explorer.indexOf("Chrome") >= 0){
                result = 'Chrome';
            }
            else if(explorer.indexOf("Opera") >= 0){
                result = 'Opera';
            }
            else if(explorer.indexOf("Safari") >= 0) {
                result = 'Safari';
            }
            return result;
        }])
        /*index范围取值*/
        .factory('resetIndex', [function () {
            var fn = function (index, min, max) {
                var result = index;
                if (result <= min) {
                    result = min;
                } else if (result >= max) {
                    result = max;
                } else {
                    result = index;
                }
                return result;
            };
            return fn;
        }])
        /*记录上个页面*/
        .factory('setPrevPageUrl', ['$rootScope', function($rootScope){
            $rootScope.prevPage = {};
            var fn = function () {
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                    var url = '/';
                    url += fromState.name;
                    angular.forEach(fromParams, function (v,k) {
                        url +='/'+k+'/'+v;
                    });
                    $rootScope.prevPage.url = url;
                    $rootScope.prevPage.provPageName = fromState.name;
                    $rootScope.prevPage.params = fromParams;
                    $rootScope.prevPage.state = fromState;
                    //console.log($rootScope.prevPage);
                });
            };
            return fn;
        }])
        /*取随机数*/
        .factory('getRandomChars', [function () {
            var randomChars = function (n) {
                var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                var res = "";
                for(var i = 0; i < n ; i ++) {
                    var id = Math.ceil(Math.random()*35);
                    res += chars[id];
                }
                return res;
            };
            return randomChars;
        }])
        /*判断是否登录*/
        .factory('isLogin', [function () {
            var fn = function () {
                if (app_global.arrLogin.id === '') {
                    return false;
                }else{
                    return true;
                }
            };
            return fn;
        }])
        /*验证*/
        .factory('test', [function () {
            return {
                'tel' : function (tel) {
                    var reg = /^1\d{10}$/;
                    return reg.test(tel);
                },
                'sms' : function (sms) {
                    var result = true;
                    if ( sms === '' ) {
                        result = false;
                    }
                    return result;
                },
                'pwd' : function (pwd , rePwd) {
                    var result = true;
                    if ( pwd !== rePwd ) {
                        result = false;
                    }
                    if ( pwd === '' ) {
                        result = false;
                    }
                    return result;
                }
            };
        }])
        /*root 发送事件*/
        .factory('sendEvent', ['$rootScope', function ($rootScope) {
            return function (event,obj) {
                $rootScope.$broadcast(event,obj);
            };
        }]);

    
});