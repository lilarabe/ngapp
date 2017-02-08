define(['jquery', 'app'], function ($, app) {
    'use strict';

    app.directive('bannerTouchMove', ['$timeout', 'resetIndex', function ( $timeout , resetIndex ) {
        var result = {};
        result.restrict = 'E';
        result.replace = true;
        result.scope = false;
        result.template = '<div class="banner-touch-move">\
                                <ul class="banner-touch-box"></ul>\
                                <ul class="banner-touch-icons"></ul>\
                            </div>';
        result.link = function (scope, element, attr) {

            var scopeName = attr.scope;
            var setName = attr.setname;

            scope.$on('imagesLoadedEvent', function ($event, name) {
                var timer = $timeout(function () {
                    if (!scopeName || !setName ||setName != name) {
                        return;
                    }
                    var arrImages = scope[scopeName];
                    var len = Array.isArray(arrImages) ? arrImages.length : 0;

                    var oBox = $(element).find('.banner-touch-box').html(''),
                        oIcons = $(element).find('.banner-touch-icons').html(''),
                        winWidth = $(window).width(),
                        index = 0,
                        x = 0;
                    //console.log(arrImages);
                    /*render*/
                    oBox.css({
                        'width' : winWidth * (len),
                        'transform' : 'translate3d('+x+'px,0px,0px)',
                        '-webkit-transform' : 'translate3d('+x+'px,0px,0px)'
                    });

                    var maxWidth = document.body.clientWidth;/*屏幕宽度*/

                    var rePlaceWidth = '?imageView2/2/w/' + parseInt(maxWidth) ;

                    angular.forEach(arrImages, function (v) {
                        //console.log(v.src);
                        v.src = v.src.replace(/(jpg|png|gif|bmp)(\?md5)/i,'$1'+ rePlaceWidth +'$2');
                        var strHtmlCode = '<li><img class="banner-touch-img" src="'+v.src +'"></li>';
                        var iconsHtmlCode = '<li></li>';
                        oBox.append(strHtmlCode);
                        oIcons.append(iconsHtmlCode);
                    });
                    var oLi = oBox.find('li');
                    oLi.css({
                        'width' : 16+"rem"
                    });
                    var oIcon = oIcons.find('li');
                    oIcon.eq(index).addClass('active');
                    oIcon.eq(index).css({
                        'margin-left' : (winWidth - 16*len)/2
                    });
                    /*event*/
                    oBox.touch('moveInfo', function (result) {
                        /*链接*/
                        /*if ( result.isClick &&  arrImages[index].link) {
                            var link = arrImages[index].link;
                            window.location.href= link;
                            return;
                        }*/

                        if ( result.isClick ) {
                            return;
                        }

                        x += result.distX;
                        oBox.css({
                            'transition-property': 'none',
                            '-webkit-transition-property': 'none',
                            'transform' :'translate3d('+x+'px,0px,0px)',
                            '-webkit-transform' : 'translate3d('+x+'px,0px,0px)'
                        });
                        if ( result.scaleX ) {
                            if ( result.scaleX <= -20 ) {
                                index++;
                            } else if ( result.scaleX >= 20 ) {
                                index--;
                            }
                            index=resetIndex(index,0,len-1);
                            animate(index);
                            changeIcon(index);
                        }
                    });
                    /*icon*/
                    var changeIcon = function (index) {
                        oIcon.eq(index).addClass('active').siblings().removeClass('active');
                    };
                    /*animate*/
                    var animate = function (index) {
                        x = -winWidth * (index);
                        oBox.css({
                            'transition-property': 'all',
                            '-webkit-transition-property': 'all',
                            'transform' : 'translate3d('+x+'px,0px,0px)',
                            '-webkit-transform' : 'translate3d('+x+'px,0px,0px)'
                        });
                    };
                },300);

            });
        };

        return result;
    }]);
});