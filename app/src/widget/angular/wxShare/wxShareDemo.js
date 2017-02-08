define(['app'], function (app ) {
    'use strict';

    /*微信分享 demo*/

    app.controller('wxShareDemoCtrl', ['$scope', 'wxShareSet', function ($scope, wxShareSet) {
        var wx = wxShareSet;
        console.log(wx);
    }]);



});