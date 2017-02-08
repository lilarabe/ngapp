'use strict';
require.config({
    baseUrl: "/app/",
    urlArgs: "v=" + app_global.v,
    paths: {
        'jquery': 'src/js/lib/jquery/jquery-2.2.1.min',
        'lazyload': 'src/js/lib/jquery.lazyload/1.9.7/jquery.lazyload',
        'scrollify': 'src/js/lib/jquery.scrollify/1.0.12/jquery.scrollify',
        'touch': 'src/js/dist/touch',

        'wxShare': 'src/js/lib/wx/jweixin/jweixin-1.0.0',
        'wxShareSet':'src/widget/angular/wxShare/wxShareSet',
        'wxShareDemo':'src/widget/angular/wxShare/wxShareDemo',

        'angular' : 'src/js/lib/angular/1.5.9/angular.min',
        'angular-animate' : 'src/js/lib/angular/1.5.9/angular-animate.min',
        'angular-route' : 'src/js/lib/angular/1.5.9/angular-route.min',
        'angular-touch' : 'src/js/lib/angular/1.5.9/angular-touch.min',
        'angular-sanitize' : 'src/js/lib/angular/1.5.9/angular-sanitize.min',
        'angular-cookies' : 'src/js/lib/angular/1.5.9/angular-cookies.min',

        'angular-ui-router' : 'src/js/lib/angular/angular-ui-router/0.2.18/angular-ui-router.min',

        'fileuploader' : 'src/js/lib/fileuploader/fileuploader',
        'fileUpLoaderDirective' : 'src/widget/angular/directive/fileUpLoaderDirective/fileUpLoaderDirective',

        'Mock' : 'src/js/lib/mockjs/mock',

        'app' : 'src/js/common/app',
        'router' : 'src/js/common/router',
        'animate' : 'src/js/common/animate',
        'factory' : 'src/js/common/factory',
        'directive' : 'src/js/common/directive',
        'filter' : 'src/js/common/filter',
        'init' : 'src/js/common/init',

        'message' : 'src/widget/angular/message/message',
        'ajax' : 'src/widget/angular/server/factory/ajax',
        'bannerArrowMove' : 'src/widget/angular/bannerArrowMove/bannerArrowMove',
        'lazyLoadDirective' : 'src/widget/angular/directive/lazyLoadDirective/lazyLoad.directive',
        'scrollifyDirective' : 'src/widget/angular/directive/scrollifyDirective/scrollify.directive',

        'tpl' : 'dist/js/tpl',

        'index' : 'src/pages/index/index'
    },
    shim: {
        'lazyload':{
            deps: ['jquery'],
            exports: 'lazyload'
        },
        'scrollify':{
            deps: ['jquery'],
            exports: 'scrollify'
        },
        'wxShareSet':{
            deps: ['wxShare'],
            exports: 'wxShareSet'
        },
        'angular': {
            exports: 'angular'
        },
        'angular-route':{
            deps: ["angular"],
            exports: 'angular-route'
        },
        'angular-animate':{
            deps: ["angular"],
            exports: 'angular-animate'
        },
        'angular-ui-router':{
            deps: ["angular"],
            exports: 'angular-ui-router'
        },
        'ng-file-upload':{
            deps: ["angular"],
            exports: 'ng-file-upload'
        },
        'angular-sanitize':{
            deps: ["angular"],
            exports: 'angular-sanitize'
        },
        'angular-touch':{
            deps: ["angular"],
            exports: 'angular-touch'
        },
        'angular-cookies':{
            deps: ["angular"],
            exports: 'angular-cookies'
        },
        'tpl':{
            deps: ["angular"],
            exports: 'tpl'
        }
    }
});

require(
    [
        'jquery', 'lazyload','scrollify',
        'angular',
        'angular-animate',
        'angular-ui-router',
        'angular-sanitize',
        'angular-touch',
        'angular-cookies',
        'fileuploader',
        'Mock',

    /*app*/
    'app', 'router','factory','directive', 'filter', 'init', 'animate',
    /*jquery fn*/
    'touch',
    /*directive*/
    'fileUpLoaderDirective', 'lazyLoadDirective', 'scrollifyDirective',
    /*widget*/
    'wxShare', 'wxShareSet', 'wxShareDemo',
    /*factory*/
    'ajax',
    /*pages*/

    'index',

    'tpl'

],function (){
    angular.bootstrap(document,["app"]);
});