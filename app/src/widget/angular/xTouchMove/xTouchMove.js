define(['jquery','app'], function ($, app) {
    'use strict';

    app.directive('xfTouchMove', ['resetIndex', function ( resetIndex ) {
        var result = {},
            x = 0;
        result.restrict = 'A';
        result.replace = false;
        result.scope = {};
        result.link = function (scope, element, attr) {
            var oBox = $(element),
                x = 0,
                max = angular.fromJson(attr.xfTouchMove).max,
                baseWidth = oBox.width();
            oBox.width(baseWidth+max);
            oBox.touch('moveInfo', function (res) {
                //console.log(res);
                x += +res.distX;
                x = resetIndex(x, -max, 0);
                //console.log(x);
                oBox.css({
                    'transition-property': 'none',
                    '-webkit-transition-property': 'none',
                    'transform' : 'translate3d('+x+'px,0px,0px)',
                    '-webkit-transform' : 'translate3d('+x+'px,0px,0px)'
                });
                if ( Math.abs(res.scaleX) > 15 ) {
                    oBox.css({
                        'transition-property': 'all',
                        '-webkit-transition-property': 'all',
                        'transition-duration': '300ms',
                        '-webkit-transition-duration': '300ms'
                    });
                    if ( res.scaleX < 0 ) {
                        x = -50;
                        oBox.css({
                            'transform' : 'translate3d(-50px,0px,0px)',
                            '-webkit-transform' : 'translate3d(-50px,0px,0px)'
                        });
                    } else if ( res.scaleX > 0 ) {
                        x = 0;
                        oBox.css({
                            'transform' : 'translate3d(0px,0px,0px)',
                            '-webkit-transform' : 'translate3d(0px,0px,0px)'
                        });
                    }
                } else {
                    oBox.css({
                        'transition-property': 'all',
                        '-webkit-transition-property': 'all',
                        'transition-duration': '300ms',
                        '-webkit-transition-duration': '300ms',
                        'transform' : 'translate3d(0px,0px,0px)',
                        '-webkit-transform' : 'translate3d(0px,0px,0px)'
                    });
                }
            });
        };
        return result;
    }]);
});