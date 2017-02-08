define(['jquery', 'app'], function ($, app) {
    'use strict';

    app.controller('bannerItemMoveCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

        var data = [];
        data.push({'src' : '/app/src/widget/angular/bannerArrowMove/images/01.jpg'});
        data.push({
            'src' : '/app/src/widget/angular/bannerArrowMove/images/02.jpg',
            'hover' : '/app/src/widget/angular/bannerArrowMove/images/09.jpg',
            'clickFn' : function (index) {
                alert(index);
            }
        });
        data.push({'src' : '/app/src/widget/angular/bannerArrowMove/images/03.jpg'});
        data.push({'src' : '/app/src/widget/angular/bannerArrowMove/images/04.jpg'});
        data.push({'src' : '/app/src/widget/angular/bannerArrowMove/images/05.jpg'});
        data.push({'src' : '/app/src/widget/angular/bannerArrowMove/images/06.jpg'});
        data.push({'src' : '/app/src/widget/angular/bannerArrowMove/images/07.jpg'});
        data.push({'src' : '/app/src/widget/angular/bannerArrowMove/images/08.jpg'});

        $timeout(function () {
            $scope.$broadcast('eventBannerItemMoveDataEnd', {'name':'demo','moveTime':1000, 'data' : data});
        },300);

    }]);


    app.directive('bannerItemMove', ['$timeout', function ($timeout) {
        var result = {};
        result.restrict = 'E';
        result.replace = true;
        result.templateUrl = '/app/src/widget/angular/bannerItemMove/bannerItemMove.html?v='+app_global.v;
        result.scope = {};
        result.link = function (scope, element, attr) {

            var bannername = attr.bannername;/*记录banner的唯一名称，目的是为了区别其他的相同指令*/


            scope.$on('eventBannerItemMoveDataEnd', function (e, data) {
                // console.log(data);
                /*数据处理*/
                scope.data = data;
                (function () {
                    /*bannername 名称过滤*/
                    if ( bannername !== scope.data.name ) {
                        return false;
                    }

                    /*默认值设置*/
                    scope.data = angular.extend({
                        'loop' : true,   /*默认不循环滚动*/
                        'autoPlay' : false,
                        'itemWidth' :  150,
                        'moveTime' : 500
                    },scope.data);

                    scope.images = scope.data.data;

                    angular.forEach(scope.images, function (v, k) {
                        v.index = k;
                        v.srcBack = v.src;
                    });

                    scope.images = scope.images.concat(scope.images);/*你补数组长度不够，这不是好方案*/

                    scope.images.splice(0,0,scope.images[scope.images.length-1]);/*将最后一张图片放在第一张前面*/
                    scope.images.splice(scope.images.length-1,1);/*删除最后一张图片*/


                    scope.images.splice(0,0,scope.images[scope.images.length-1]);/*将最后一张图片放在第一张前面*/
                    scope.images.splice(scope.images.length-1,1);/*删除最后一张图片*/


                    scope.images[2].src = scope.images[2].hover;


                })();


                /*渲染*/
                (function () {

                    var len = scope.images.length;/*总长度*/
                    var itemWidth = scope.data.itemWidth;/*单位长度*/
                    var isMoveing = false;/*是否运动*/
                    var moveTime = scope.data.moveTime;/*移动时间*/

                    /*容器初始化样式*/
                    var initListStyle = function () {
                        scope.listStyle = {
                            'width' : (len) * itemWidth,
                            'transition' : 'none',
                            '-webkit-transition' : 'none',
                            'transform' : 'translate3d('+ -itemWidth*2 +'px,0px,0px)',
                            '-webkit-transform' : 'translate3d('+ -itemWidth*2 +'px,0px,0px)'
                        };
                    };

                    /*下一张图片运动样式*/
                    var nextListStyle = function () {
                        scope.listStyle['transform'] = 'translate3d('+ -itemWidth*3 +'px,0px,0px)';
                        scope.listStyle['-webkit-transform'] = 'translate3d('+ -itemWidth*3 +'px,0px,0px)';
                        scope.listStyle['transition'] = 'all '+ moveTime +'ms ease-out';
                        scope.listStyle['-webkit-transition'] = 'all '+ moveTime +'ms ease-out';
                    };

                    /*上一张图片运动样式*/
                    var provListStyle = function () {
                        scope.listStyle['transform'] = 'translate3d('+ -itemWidth +'px,0px,0px)';
                        scope.listStyle['-webkit-transform'] = 'translate3d('+ -itemWidth +'px,0px,0px)';
                        scope.listStyle['transition'] = 'all '+ moveTime +'ms ease-out';
                        scope.listStyle['-webkit-transition'] = 'all '+ moveTime +'ms ease-out';
                    };

                    initListStyle();

                    /*animate*/
                    var animate = function (type) {
                        isMoveing = true;
                        switch(type){
                            case 'next':
                                nextListStyle();
                                break;
                            case 'prov':
                                provListStyle();
                                break;
                            default:
                                break;
                        }

                        $timeout(function () {
                            isMoveing = false;
                            switch(type){
                                case 'next':
                                    scope.images.splice(scope.images.length,0,scope.images[0]);/*将第一张图片放在最后一张后面*/
                                    scope.images.splice(0,1);/*删除第一张图片*/
                                    initListStyle();
                                    break;
                                case 'prov':
                                    scope.images.splice(0,0,scope.images[scope.images.length-1]);/*将最后一张图片放在第一张前面*/
                                    scope.images.splice(scope.images.length-1,1);/*删除最后一张图片*/
                                    initListStyle();
                                    break;
                                default:
                                    break;
                            }
                        },scope.data.moveTime);


                    };

                    scope.moveNext = function () {
                        if ( isMoveing ) {
                            return;
                        }
                        animate('next');
                    };

                    scope.moveProv = function () {
                        if ( isMoveing ) {
                            return;
                        }
                        animate('prov');
                    };

                })();

                /*图片点击回调*/
                (function () {
                    scope.clickFn = function (e,i,index) {

                        if ( scope.images[i].hover ) {
                            angular.forEach(scope.images, function(v,k){
                                scope.images[k].src = scope.images[k].srcBack;
                            });
                            scope.images[i].src = scope.images[i].hover;
                        }
                        if ( angular.isFunction( scope.images[i].clickFn ) ) {
                            scope.images[i].clickFn(e,index);
                        }
                    };
                })();

            });


        };

        return result;
    }]);



    app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/upload.php',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        console.log(response);
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    console.log(evt);
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        }
    }]);











});