define(['jquery','app'], function ($, app) {
    'use strict';
    /*ajax请求*/
    app.factory('ajax', ['$http', '$q', function($http, $q){
        var Ajax = function (obj) {
            this.options = angular.extend({
                type : 'angular',
                method : 'GET',
                url : '',
                title : '',
                params : {},
                data : {},
                beforeFn : null,
                deferFn : null,
                cache : true,
                debug : false
            },obj);
            if ( this.options.type === 'angular' ) {
                this.angular();
            } else if ( this.options.type === 'jquery' ) {
                this.jquery();
            }
        };

        Ajax.prototype = {

            constructor: Ajax,

            angular : function(){

                if ( this.options.title === '' ) {
                    console.log('title接口说明属性必填！！！');
                    return;
                }

                if ( angular.lowercase(this.options.method) === 'jsonp' ) {
                    this.options.params = angular.extend(this.options.params,{
                        callback : 'JSON_CALLBACK'
                    });
                }

                if ( angular.isFunction(this.options.beforeFn) ) {
                    this.beforeFn();
                }

                var that = this;
                var deferred = $q.defer();

                $http({
                    method : that.options.method,
                    url : that.options.url,
                    params : that.options.params,
                    data : that.options.data,
                }).success(function (data, status) {
                    if ( angular.isFunction(that.options.doneFn) ) {
                        that.doneFn(data);
                    }
                    if ( that.options.debug ) {
                        alert('版本号:'+app_global.v);
                        alert(that.options.title+' 接口');
                        alert('status:'+status);
                        alert('url:'+that.options.url);
                        alert('method:'+that.options.method);
                        angular.forEach(that.options.params, function (v,k) {
                            alert('params:'+k+'='+v);
                        });
                        alert('data:'+data);
                    }
                    deferred.resolve(data);
                }).error(function (data, status ) {
                    if ( that.options.debug ) {
                        alert('版本号:'+app_global.v);
                        alert(that.options.title+' 接口报错');
                        alert('status:'+status);
                        alert('url:'+that.options.url);
                        alert('method:'+that.options.method);
                        angular.forEach(that.options.params, function (v,k) {
                            alert('params:'+k+'='+v);
                        });
                        alert('data:'+data);
                    }
                    deferred.reject(data, status);
                });

                deferred.promise.then(
                    function (data) {
                        if ( angular.isFunction(that.options.deferFn) ) {
                            that.options.deferFn(data);
                        }
                    },
                    function () {
                        console.log('error:port-'+that.options.title);
                    }
                );
            },

            jquery : function(){
                if ($.isFunction(this.options.beforeFn)) {
                    this.options.beforeFn();
                }

                var that = this;
                $.ajax({
                    url : that.options.url,
                    data : that.options.params,
                    dataType:'json',
                    async : that.options.async,
                    beforeSend : that.beforeFn(),
                    type: that.options.method
                }).
                    done(function (data, status, info) {
                        if ($.isFunction(that.options.doneFn)) {
                            that.options.doneFn(data);
                        }
                    }).
                    fail(function (jqXHR) {
                        alert(jqXHR);
                        console.log('error:port');
                    });
            },

            beforeFn : function(){
                this.options.beforeFn();
            },

            doneFn: function (data) {
                this.options.doneFn(data);
            }
        };

        return {
            loaddata : function (obj) {
                new Ajax(obj);
            }
        };

    }]);
});