define(['app'], function (app ) {
    'use strict';

    /*fileUpLoader demo*/
    
    app.controller('fileUpLoaderDemoCtrl', ['$scope', 'fileUpLoader', function ($scope, fileUpLoader) {

        /*第一个参数是 FileUploader 对象，第二个是 回调函数，返回一个数组，存放浏览器的临时图片地址*/
        fileUpLoader({
            'text' : 'img文件上传',
            onComplete: function(id, fileName, responseJSON){
                //console.log(responseJSON);
            },
        },{
            'name' : 'img',
            'changeFn' : function (arrFilePath) {
                $scope.uploadImages = arrFilePath;
                $scope.$apply('uploadImages');
            }
        });

        fileUpLoader(
            {
                'text' : 'mp3文件上传',
                allowedExtensions : ['mp3'],
                messages : {
                    typeError : '请上传mp3文件'
                },
                onComplete: function(id, fileName, responseJSON){
                    //console.log(responseJSON);
                },
            },
            {
                'name' : 'mp3'
            }
        );

    }]);


    /* fileUpLoader 文件上传*/

    /*通过事件触发指令中的 new FileUploader*/
    app.factory('fileUpLoader', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        return function (obj, changeFn) {
            $timeout(function () {
                $rootScope.$broadcast('eventFileUpLoader',obj, changeFn);
            });
        };
    }]);

    app.directive('fileUpLoader', [function () {
        var result = {};
        result.restrict = 'A';
        result.replace = false;
        result.scope = false;
        result.link = function (scope, element, attr) {

            var directiveName = attr.name;

            /*确保 element 内部生成的标签 不影响其他html结构*/
            $(element).css({
                'overflow' : 'hidden'
            });
            $(element).children('*').css({
                'display' : 'none'
            });
            /*获取文件地址*/
            var getFileUrl = function (file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                }
                return url
            };

            var obj = {
                /*加载FileUploader插件的DOM元素，通过DOM操作获取，通常是<div>，也可以是任何双标签元素，如<span>、<p>等*/
                element: $(element)[0],
                /*input 的 multiple*/
                multiple:true,
                /*element 显示的文字*/
                text:'',
                /*报错提示信息,具体看源码*/
                messages : {
                    typeError : '请上传图片文件'
                },
                /*最大链接*/
                maxConnections:20,
                /*服务器端接受并保存文件的程序路径，与<form>标签中的action属性类似*/
                action: app_global.dataUrl + '/public/upload.php',
                /*是否使用浏览器的控制台打印File Uploader的调试信息*/
                debug: false,
                /*需要发送给服务器端的额外数据，key-value格式的数组，通过POST方法发送 params:{param1:'value1',param2:'value2'}*/
                params:  {},
                /*允许上传的文件的后缀名数组，格式: allowedExtensions:['jpg','png']*/
                allowedExtensions : ['jpg','png'],
                /*钩子 hooks :
                 id，表示是第几个上传的文件，从0开始计数；
                 fileName，表示上传的文件名称；
                 loaded，表示已经上传了的数据大小；
                 total，表示总共的文件大小；
                 responseJSON，表示返回的JSON数据。*/
                /*上传完成*/
                onComplete: function(id, fileName, responseJSON){},
                /*文件提交*/
                onSubmit:  function(id,  fileName)  {},
                /*正在上传*/
                onProgress:  function(id,  fileName,  loaded,  total)  {},
                /*取消上传*/
                onCancel:  function(id,  fileName)  {},
                /*错误*/
                onError: function(id, fileName, xhr) {}
            };

            scope.$on('eventFileUpLoader', function (event, data, other) {
                if ( directiveName !== other.name ) {
                    return;
                }
                obj = angular.extend(obj,data);
                new qq.FileUploader(obj);

                /*图片预览：通过函数回调，获取url地址*/
                var input = $(element).find('input');
                if ( angular.isFunction(other.changeFn) ) {
                    input.bind('change', function () {
                        var arrFilePath = [];
                        for (var i in $(this)[0].files) {
                            if ( angular.isObject($(this)[0].files[i]) ) {
                                arrFilePath.push(getFileUrl($(this)[0].files[i]));
                            }
                        }
                        other.changeFn(arrFilePath);
                    });
                }
                /*todo : 第二次无法触发 change 事件*/

            });

        };
        return result;
    }]);


});