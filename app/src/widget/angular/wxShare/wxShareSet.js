define(['app','wxShare'], function (app, wxShare) {
    'use strict';
    /*微信分享*/
    app.factory('wxShareSet', [function(){

        var result = {};

        var config = function (configObj) {
            configObj = angular.extend({
                debug: false,
                appId: '',
                timestamp: 0,
                nonceStr: '',
                signature: '',
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            },configObj);
            wxShare.config(configObj);
        };

        var set = function(obj){
            obj.link = obj.link ? obj.link : window.location.href;
            wxShare.ready(function () {
                wxShare.onMenuShareTimeline({
                    title: obj.title,
                    link: obj.link,
                    imgUrl: obj.imgUrl,
                    success: function () {},
                    cancel: function () {}
                });
                wxShare.onMenuShareAppMessage({
                    title: obj.title,
                    desc: obj.desc,
                    link: obj.link,
                    imgUrl: obj.imgUrl,
                    type: '',
                    dataUrl: '',
                    success: function () {},
                    cancel: function () {}
                });
                wxShare.onMenuShareQQ({
                    title: obj.title,
                    desc: obj.desc,
                    link: obj.link,
                    imgUrl: obj.imgUrl,
                    success: function () {},
                    cancel: function () {}
                });
            });
        };

        result.config = config;
        result.set = set;

        return result;

    }]);
});