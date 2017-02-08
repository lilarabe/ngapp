define(['app'], function ( app ) {
    'use strict';

    /*重新格式化输出图片CDN后缀
    * scale 为放缩比例，不填为1（屏幕大小）
    * ng-src = {{ src | imgCdn : 0.5 }}
    * */
    app.filter('imgCdn', [function () {

        return function (src, scale) {

            scale = +scale || 1;/*比例*/

            var maxWidth = document.body.clientWidth;/*屏幕宽度*/

            var rePlaceWidth ='?imageView2/2/w/' + Math.ceil(maxWidth * scale) ;

            var reSrc = '';
            if ( src ) {
                reSrc = src.replace(/(jpg|png|gif|bmp)(\?md5)/i,'$1'+ rePlaceWidth +'$2');/*替换*/
            } else {
                reSrc = '';
            }

            return reSrc;

        };

    }]);
});