define(function(require){

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/index-footer.html',
    '<ul>\n' +
    '	index-footer\n' +
    '</ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/index-frame.html',
    '\n' +
    '\n' +
    '<div class="content" ng-controller="indexCtrl">\n' +
    '\n' +
    '    <header ui-view="header" class="header"></header>\n' +
    '\n' +
    '    <div ui-view="main" class="main"></div>\n' +
    '\n' +
    '    <footer ui-view="footer" class="footer"></footer>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/index-header.html',
    '\n' +
    '<div style="font-size: 24px">\n' +
    '	index-header\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/index-main.html',
    '<div>\n' +
    '	<div class="liuda">liuda1</div>\n' +
    '\n' +
    '	<div class="liuda2">liuda liuda2</div>\n' +
    '\n' +
    '	<div file-up-loader style="width: 100px;height: 30px;background-color: #2b542c" text="文件上传"></div>\n' +
    '\n' +
    '	<img src="/app/src/images/index/indexx-1.png" alt="">\n' +
    '\n' +
    '	<img src="http://m.shoppingcrown.com/uploadfiles/data/t_kehu_logo_2016-0026.jpeg" style="width: 100%" alt="">\n' +
    '\n' +
    '\n' +
    '	<div ng-repeat="item in arr">\n' +
    '		<span ng-bind="item.name"></span>\n' +
    '		<div>\n' +
    '			<img ng-src="{{ item.img }}" alt="">\n' +
    '		</div>\n' +
    '		<div ng-bind="item.email"></div>\n' +
    '	</div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('directive/fileUpLoaderDirective/fileUpLoaderDemo.html',
    '\n' +
    '<div ng-controller="fileUpLoaderDemoCtrl">\n' +
    '\n' +
    '    <h1>demo</h1>\n' +
    '\n' +
    '    <div file-up-loader name="img" style="border: 1px solid #000;width: 200px;height: 30px"></div>\n' +
    '\n' +
    '    <div file-up-loader name="mp3" style="border: 1px solid #000;width: 200px;height: 30px"></div>\n' +
    '\n' +
    '    \n' +
    '    <img ng-repeat="item in uploadImages" ng-src="{{item}}" style="width: 100%">\n' +
    '\n' +
    '    <hr>\n' +
    '    <h1>主要原理</h1>\n' +
    '    <p>\n' +
    '        1.首先通过 fileUpLoader 插件将文件上传到服务器指定目录. <br>\n' +
    '        2.通过钩子函数完成指定的程序.\n' +
    '    </p>\n' +
    '    <hr>\n' +
    '    <h1>用法</h1>\n' +
    '    <p>\n' +
    '        1.元素中引用指令 file-up-loader <br>\n' +
    '        2.控制器中引用服务 fileUpLoader\n' +
    '    </p>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('directive/lazyLoadDirective/lazyLoadDemo.html',
    '\n' +
    '\n' +
    '\n' +
    '<div ng-controller="lazyLoadDemoCtrl">\n' +
    '    <img ng-repeat="image in images" lazyload data-original="{{ image.src }}" style="width: 100%;height: 200px">\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('directive/scrollifyDirective/scrollifyDemo.html',
    '<style>\n' +
    '    .box > li{\n' +
    '        width: 100vw;\n' +
    '        height: 100vh;\n' +
    '    }\n' +
    '    .box > li:nth-child(1){\n' +
    '        background-color: #2b542c;\n' +
    '    }\n' +
    '    .box > li:nth-child(2){\n' +
    '        background-color: #8a6d3b;\n' +
    '    }\n' +
    '    .box > li:nth-child(3){\n' +
    '        background-color: #1b6d85;\n' +
    '    }\n' +
    '    .box > li:nth-child(4){\n' +
    '        background-color: #5e5e5e;\n' +
    '    }\n' +
    '</style>\n' +
    '\n' +
    '\n' +
    '<div ng-controller="scrollifyDemoCtrl">\n' +
    '    <ul class="box" scrollify>\n' +
    '        <li ng-repeat="item in arr">\n' +
    '            <p>\n' +
    '                github:https://github.com/lukehaas/Scrollify\n' +
    '            </p>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bannerArrowMove/bannerArrowMove.html',
    '<div class="banner-arrow-move">\n' +
    '	<ul class="banner-arrow-move-content" ng-style="ulStyle">\n' +
    '		<li ng-repeat="item in images track by $index" ng-style="liStyle">\n' +
    '			<img class="banner-arrow-move-content-img" ng-src="{{ item.src }}" ng-click="clickFn($index)">\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '	<div class="banner-arrow-move-content-left" ng-style="leftStyle" ng-click="moveNext()"></div>\n' +
    '	<div class="banner-arrow-move-content-right" ng-style="rightStyle" ng-click="moveProv()"></div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bannerArrowMove/bannerArrowMoveDemo.html',
    '\n' +
    '<link rel="stylesheet" href="/app/src/widget/angular/bannerArrowMove/bannerArrowMove.css">\n' +
    '\n' +
    '<div style="width: 800px; height: 300px; border:1px solid #666; background-color: #f0f0f0;margin: 100px" ng-controller="bannerArrowMove">\n' +
    '\n' +
    '	<banner-arrow-move bannername="bannerArrow"></banner-arrow-move>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bannerItemMove/bannerItemMove.html',
    '\n' +
    '\n' +
    '<div class="bannerItemMove">\n' +
    '\n' +
    '    <div class="bannerItemMove-left" ng-click="moveProv()"></div>\n' +
    '\n' +
    '    <div class="bannerItemMove-main">\n' +
    '        <ul class="bannerItemMove-list" ng-style="listStyle">\n' +
    '            <li ng-repeat="item in images track by $index">\n' +
    '                <img ng-src="{{ item.src }}" class="bannerItemMove-img" ng-click="clickFn($event,$index,item.index)">\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="bannerItemMove-right" ng-click="moveNext()"></div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bannerItemMove/bannerItemMoveDemo.html',
    '<link rel="stylesheet" href="/app/src/widget/angular/bannerItemMove/bannerItemMove.css">\n' +
    '<style>\n' +
    '	.banner-box-move1 {\n' +
    '		width: 1200px;\n' +
    '		height: 200px;\n' +
    '		background: #EEE;\n' +
    '		position: absolute;\n' +
    '		top:20px;\n' +
    '		left: 200px;\n' +
    '	}\n' +
    '</style>\n' +
    '\n' +
    '<div class="banner-box-move1" ng-controller="bannerItemMoveCtrl">\n' +
    '\n' +
    '	<banner-item-move bannername="demo"></banner-item-move>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '<div ng-controller="MyCtrl">\n' +
    '    <h4>Upload on file select</h4>\n' +
    '    <button type="file" ngf-select="uploadFiles($file, $invalidFiles)" accept="image/*" ngf-max-height="1000" ngf-max-size="1MB">\n' +
    '        Select File</button>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bannerTouchMove/bannerTouchMove.html',
    '<banner-touch-move ng-controller="bannerTouchMoveCtrl"></banner-touch-move>\n' +
    '\n' +
    '<banner-touch-move ng-controller="bannerTouchMoveCtrl"></banner-touch-move>\n' +
    '\n' +
    '<banner-touch-move ng-controller="bannerTouchMoveCtrl"></banner-touch-move>\n' +
    '\n' +
    '<banner-touch-move ng-controller="bannerTouchMoveCtrl"></banner-touch-move>\n' +
    '\n' +
    '<banner-touch-move ng-controller="bannerTouchMoveCtrl"></banner-touch-move>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('isScrollEnd/isScrollEnd.html',
    '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '    <title>isScrollEnd</title>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">\n' +
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n' +
    '</head>\n' +
    '<body>\n' +
    '\n' +
    '<div class="content ub ub-v">\n' +
    '    <h1>判断元素是否显示完整</h1>\n' +
    '    <p></p>\n' +
    '\n' +
    '    <div style="height: 400px;overflow-y: scroll;background: #EEE" is-scroll-end>\n' +
    '        <ul>\n' +
    '            <li>a</li>\n' +
    '            <li style="background: #CCC; margin-top: 50px" ng-repeat="i in [0,1,2,3,4,5,6,7,8,9]" repeat-end>{{i}}</li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '</body>\n' +
    '</html>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('message/message.html',
    '<div class="message">\n' +
    '    <div class="message-box">\n' +
    '        <h1 class="message-box-h1">系统提示</h1>\n' +
    '        <p class="message-box-title" ng-bind="msg"></p>\n' +
    '        <div class="message-box-btns">\n' +
    '            <div class="message-box-btn" ng-if="okBtn" ng-click="okFn()">确定</div>\n' +
    '            <div class="message-box-btn" ng-if="confirmBtn" ng-click="confirmFn()">取消</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('message/message2.html',
    '\n' +
    '<div class="cart-confirm" ng-show="success">\n' +
    '    <div class="cart-box">\n' +
    '        <h1 ng-bind="text">成功加入购物车</h1>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('wxShare/wxShareDemo.html',
    '<div ng-controller="wxShareDemoCtrl">\n' +
    '    <h1>使用方法</h1>\n' +
    '    <p>\n' +
    '        1.引用服务 wxShareSet <br>\n' +
    '        2.这个服务返回的对象中有两个方法：<br>\n' +
    '        config : 配置微信信息<br>\n' +
    '        <pre>\n' +
    '{\n' +
    '    appId: $scope.wx_config.appId,\n' +
    '    timestamp: $scope.wx_config.timestamp,\n' +
    '    nonceStr: $scope.wx_config.nonceStr,\n' +
    '    signature: $scope.wx_config.signature\n' +
    '}\n' +
    '        </pre>\n' +
    '        set : 配置分享信息\n' +
    '        <pre>\n' +
    '{\n' +
    '    title: 标题,\n' +
    '    desc: 描述,\n' +
    '    link:链接,\n' +
    '    imgUrl: 图片地址\n' +
    '}\n' +
    '        </pre>\n' +
    '    </p>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('xTouchMove/xTouchMove.html',
    '<style>\n' +
    '    ul li{\n' +
    '        list-style: none;\n' +
    '        width: 120%;\n' +
    '        height: 100px;\n' +
    '        margin-top:10px;\n' +
    '        background: linear-gradient(to right, red , blue);\n' +
    '        background: -webkit-linear-gradient(left, red , blue);\n' +
    '        text-align: center;\n' +
    '        line-height: 100px;\n' +
    '    }\n' +
    '</style>\n' +
    '\n' +
    '\n' +
    '<ul class="content ub ub-v main">\n' +
    '    <li ng-repeat="i in [1,1,1,1,1,1,1,1,1,1,1,1,1,1] track by $index" ng-bind="$index" xf-touch-move=\'{"max":40}\'></li>\n' +
    '</ul>');
}]);
})();

});