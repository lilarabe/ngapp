define(['jquery', 'app', 'Mock'], function ( $, app, Mock ) {

    app.controller('indexCtrl', ['$scope', 'ajax', function ($scope, ajax) {

        Mock.setup({
            timeout: 400
        });

        Mock.mock('http://g.cn/test1', {
            'list|10' : [{
                'id|+1': 1,
                'email': '@EMAIL',
                'mingcheng'	   : '@name',
                'age|1-100': 100,
                'color'	   : '@color',
                'img'	   : '@Image()'
            }]
        });

        $scope.arr = [];
        ajax.loaddata({
            method: 'get',
            url : 'http://g.cn/test1',
            title : 'MockJs测试接口',
            doneFn : function (data) {
                //console.log(data);

                angular.forEach(data.list, function (v) {
                    $scope.arr.push({
                        'name' : v.mingcheng
                    });
                });
            }
        });





    }]);

});


