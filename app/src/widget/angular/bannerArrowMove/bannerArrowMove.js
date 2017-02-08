define(['jquery', 'app'], function ($, app) {
    'use strict';

    app.controller('bannerArrowMove', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.bannerArrowData = {
            'loop' : true,
            'name' : 'bannerArrow'
        };
        $scope.bannerArrowData.data = [];
        $scope.bannerArrowData.data.push({
            src : '/app/src/widget/angular/bannerArrowMove/images/01.jpg',
            clickFn : function () {
                console.log('aaa');
            }
        });
        $scope.bannerArrowData.data.push({src : '/app/src/widget/angular/bannerArrowMove/images/02.jpg'});
        $scope.bannerArrowData.data.push({src : '/app/src/widget/angular/bannerArrowMove/images/03.jpg'});
        $scope.bannerArrowData.data.push({src : '/app/src/widget/angular/bannerArrowMove/images/04.jpg'});
        $scope.bannerArrowData.data.push({src : '/app/src/widget/angular/bannerArrowMove/images/05.jpg'});


        $timeout(function () {
            $scope.$broadcast('eventBannerArrowMoveDataEnd', $scope.bannerArrowData);
        });

    }]);


    app.directive('bannerArrowMove', ['$timeout', '$interval', function ( $timeout, $interval ) {
        var result = {};
        result.restrict = 'E';
        result.replace = true;
        result.scope = {};
        result.templateUrl = '/app/src/widget/angular/bannerArrowMove/bannerArrowMove.html';
        result.link = function (scope, element, attr) {

            var bannername = attr.bannername;

            scope.$on('eventBannerArrowMoveDataEnd', function (event, data) {

                scope.data = data;

                if ( bannername !== scope.data.name ) {
                    return false;
                }


                /*
                 * scope.data.data : 存放所有img信息
                 * scope.data.loop : 是否循环滚动
                 * scope.data.autoPlay : 是否自动播放
                 * scope.data.width : 移动宽度
                 * scope.data.moveTime : 移动时间
                 * */

                //scope.data = JSON.parse(scope.data);/*字符串转换json*/

                /*默认值设置*/
                scope.data = angular.extend({
                    'loop' : false,
                    'autoPlay' : false,
                    'width' :  $(element).width(),
                    'moveTime' : 500
                },scope.data);

                //console.log(scope.data);

                /*render*/
                var len = Array.isArray(scope.data.data) ? scope.data.data.length : 0,/*box长度*/
                    index = 0,/*当前box索引*/
                    x = 0,/*x轴移动距离*/
                    isMoveing = false;/*是否运动*/

                scope.images = scope.data.data;
                scope.images.splice(0,0,scope.images[scope.images.length-1]);
                scope.images.splice(scope.images.length,0,scope.images[1]);

                scope.liStyle = {
                    'width' : scope.data.width
                };
                scope.ulStyle = {
                    'width' : scope.data.width * (+len + 2),
                    'transform' : 'translate3d('+ -scope.data.width +'px,0px,0px)',
                    '-webkit-transform' : 'translate3d('+ -scope.data.width +'px,0px,0px)'
                };
                scope.leftStyle = {
                    'top' : ($(element).height() - 60)/2
                };
                scope.rightStyle = {
                    'top' : ($(element).height() - 60)/2
                };


                /*animate*/
                var animate = function (i) {

                    if ( !scope.data.loop ) {/*不可循环*/
                        if ( i < 0 ) {
                            index = 0;
                            return;
                        } else if ( i > len-1 ) {
                            index = len-1;
                            return;
                        }
                    }

                    isMoveing = true;
                    x = -scope.data.width * (i+1);
                    scope.ulStyle['transform'] = 'translate3d('+x+'px,0px,0px)';
                    scope.ulStyle['-webkit-transform'] = 'translate3d('+x+'px,0px,0px)';
                    scope.ulStyle['transition'] = 'all '+ scope.data.moveTime +'ms ease-out';
                    scope.ulStyle['-webkit-transition'] = 'all '+ scope.data.moveTime +'ms ease-out';

                    if ( scope.data.loop ) {/*可循环*/
                        if ( i < 0 ) {
                            index = len-1;
                            $timeout(function () {
                                x = -scope.data.width * (len);
                                scope.ulStyle['transition'] = 'none';
                                scope.ulStyle['-webkit-transition'] = 'none';
                                scope.ulStyle['transform'] = 'translate3d('+x+'px,0px,0px)';
                                scope.ulStyle['-webkit-transform'] = 'translate3d('+x+'px,0px,0px)';
                            },scope.data.moveTime);
                        } else if ( i > len-1 ) {
                            index = 0;
                            $timeout(function () {
                                x = -scope.data.width * (1);
                                scope.ulStyle['transition'] = 'none';
                                scope.ulStyle['-webkit-transition'] = 'none';
                                scope.ulStyle['transform'] = 'translate3d('+x+'px,0px,0px)';
                                scope.ulStyle['-webkit-transform'] = 'translate3d('+x+'px,0px,0px)';
                            },scope.data.moveTime);
                        }
                    }

                    $timeout(function () {
                        isMoveing = false;
                    },scope.data.moveTime);
                };

                scope.moveNext = function () {
                    if ( isMoveing ) {
                        return;
                    }
                    index++;
                    animate(index);
                };

                scope.moveProv = function () {
                    if ( isMoveing ) {
                        return;
                    }
                    index--;
                    animate(index);
                };

                /*自动滚动*/
                if ( scope.data.autoPlay ) {
                    $interval(function () {
                        scope.moveNext();
                    },3000);
                }

                /*图片点击回调*/
                scope.clickFn = function (i) {
                    if ( angular.isFunction( scope.images[i].clickFn ) ) {
                        scope.images[i].clickFn();
                    }
                };


            });

        };

        return result;
    }]);
});