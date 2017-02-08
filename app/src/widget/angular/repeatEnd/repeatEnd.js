define(['app'], function (app) {
    'use strict';

    app.directive('repeatEnd', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope) {
                if (scope.$last === true) {
                    $timeout(function() {
                        //console.log('repeatEnd');
                        scope.$emit('eRepeatEnd');
                    });
                }
            }
        };
    }]);
});