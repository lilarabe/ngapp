define(['app'], function ( app ) {
    'use strict';

     app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',function ($stateProvider, $urlRouterProvider, $locationProvider) {

         /*版本号*/
        var v = '?v='+app_global.v;

         /*html5 url重写*/
        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });*/

         /*默认页面*/
         $urlRouterProvider.otherwise('index');

         /*页面路由*/
         $stateProvider

             .state('index', {/*首页*/
                 url : '/index',
                 cache : true,
                 views : {
                     '' : {
                         /*templateUrl : '/app/src/pages/index/index-frame.html' + v*/
                         templateProvider: function($templateCache){
                             return $templateCache.get('index/index-frame.html');
                         }
                     },
                     'header@index' : {
                         /*templateUrl : '/app/src/pages/index/index-header.html' + v*/
                         templateProvider: function($templateCache){
                             return $templateCache.get('index/index-header.html');
                         }
                     },
                     'main@index' : {
                         /*templateUrl : '/app/src/page/index/index-main.html' + v*/
                         templateProvider: function($templateCache){
                             return $templateCache.get('index/index-main.html');
                         }
                     },
                     'footer@index' : {
                         /*templateUrl :'/app/src/pages/index/index-footer.html' + v*/
                         templateProvider: function($templateCache){
                             return $templateCache.get('index/index-footer.html');
                         }
                     }
                 }
             });


         /*demo 在生成模式要删除*/

         /*文件上传 fileUpLoader*/
         $stateProvider.state('fileUpLoader', {
             url : '/fileUpLoader',
             cache : true,
             views : {
                 '' : {
                     templateProvider: function($templateCache){
                         return $templateCache.get('directive/fileUpLoaderDirective/fileUpLoaderDemo.html');
                     }
                 }
             }
         });
         /*lazyload*/
         $stateProvider.state('lazyload', {
             url : '/lazyload',
             cache : true,
             views : {
                 '' : {
                     templateProvider: function($templateCache){
                         return $templateCache.get('directive/lazyLoadDirective/lazyLoadDemo.html');
                     }
                 }
             }
         });
         /*微信分享*/
         $stateProvider.state('wxShare', {
             url : '/wxShare',
             cache : true,
             views : {
                 '' : {
                     templateProvider: function($templateCache){
                         return $templateCache.get('wxShare/wxShareDemo.html');
                     }
                 }
             }
         });
         /*scrollify*/
         $stateProvider.state('scrollify', {
             url : '/scrollify',
             cache : true,
             views : {
                 '' : {
                     templateProvider: function($templateCache){
                         return $templateCache.get('directive/scrollifyDirective/scrollifyDemo.html');
                     }
                 }
             }
         });
         /*demo end*/


     }]);
});