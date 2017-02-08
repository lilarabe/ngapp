var gulp = require('gulp'), /*载入gulp*/

    minifycss = require('gulp-minify-css'), /*压缩css*/

    concat = require('gulp-concat'), /*文件合并*/

    clean = require('gulp-clean'), /*清理文档*/

    uglify = require('gulp-uglify'), /*压缩js*/

    rename = require('gulp-rename'), /*重命名*/

    amdOptimize = require('amd-optimize'), /*JavaScript ADM规范文件处理*/

    livereload = require('gulp-livereload'), /*文件变化监控，需要跟浏览器配合会用*/

    sass = require('gulp-sass'), /*sass 文件编译*/

    autoprefixer = require('gulp-autoprefixer'), /*css属性自动加前缀*/

    spriter = require('gulp-css-spriter'), /*图片雪碧图生成*/

    svn = require('gulp-svn'), /*svn上传提交*/

    runSequence = require('run-sequence'), /*文件的同步处理*/

    replace = require('gulp-replace'), /*文档替换*/

    htmlmin = require('gulp-htmlmin'), /*HTML 文件压缩*/

    ngHtml2js = require('gulp-ng-html2js'), /*AngularJS 模板文件合并为 js 文件*/

    imagemin = require('gulp-imagemin'),/*图片压缩*/

    connect = require('gulp-connect'),/*本地Server服务*/

    through2 = require('through2');/*取文件/路径/名/内容*/


var config = require('./config.js');


var dataUrlDev = config.config().dataUrlDev;/*开发模式接口服务器地址*/
var cdnUrlDev = config.config().cdnUrlDev;/*开发模式cdn服务器地址*/

var dataUrlProd = config.config().dataUrlProd;/*生产模式接口服务器地址*/
var cdnUrlProd = config.config().cdnUrlProd;/*生产模式cdn服务器地址*/


var date = new Date();
/* v : 版本号 以日期的形式生成字符串，例如: 2016-12-1--23:1:19*/
var v = date.getFullYear() + '-'
    + (+date.getMonth() + 1) + '-'
    + date.getDate() + '--'
    + date.getHours() + ':'
    + date.getMinutes() + ':'
    + date.getSeconds();

var pathJs = './app/dist/js';
var pathCss = './app/dist/css';
var pathImages = './app/dist/images';
let pathDist = './app/dist';

/*开发模式的 <script>*/
var script = `\t\t\<script\>\n\t\t\tdocument.documentElement.style.fontSize = document.documentElement.clientWidth / 16 + 'px';\n\t\t\tvar app_global = {\n\t\t\t\t\tdataUrl : '${dataUrlDev}',\n\t\t\t\t\tcdnUrl : '${cdnUrlDev}',\n\t\t\t\t\tv : VERSION\n\t\t\t\t};\n\t\t\<\/script\>`;

/*生产模式的 <script>*/
var scriptMin = `\<script\>document.documentElement.style.fontSize = document.documentElement.clientWidth / 16 + 'px';var app_global = {dataUrl : '${dataUrlProd}',cdnUrl : '${cdnUrlProd}',v : VERSION};\<\/script\>`;


var arrCssDevPath = []; /*css文件路径*/
var arrJsPaths = {}; /*js文件路径*/


/*CSS处理 */
/************************************************************************************************/
/* arrCss : 要处理的CSS文件*/
var arrCss = ['./app/src/css/reset.css'];
/*引入reset.css*/
//arrCss.push('./app/src/widget/angular/**/*.css');/*引入插件中CSS，需要按需引入*/
arrCss.push('./app/src/pages/**/*.css');
/*引入所有页面的CSS*/

/*css文件处理*/
gulp.task('css', function () {
    gulp.src(arrCss)
        .pipe(concat('bundle.css'))/*将或有引入的CSS合并为一个bundle.css*/
        .pipe(replace(/\/app\/src/, ''))/*替换css文件中图片路径*/
        .pipe(minifycss())/*将bundle.css压缩*/
        .pipe(gulp.dest(pathCss));
    /*将bundle.css输出到指定的目录中*/
});
/************************************************************************************************/


/*SASS处理*/
/************************************************************************************************/
var arrSass = ['./app/src/css/reset.scss'];
/*引入reset.scss*/
arrSass.push('./app/src/pages/**/*.scss');
/*所有页面scss*/

gulp.task('sass', function () {
    return gulp.src(arrSass, {base: '.'})
        .pipe(sass())/*将sass转换为css*/
        .pipe(autoprefixer({
            /*已指定的规则自动添加css属性前缀*/
            //browsers: ['iOS >= 7', 'Android >= 4.0'],/*移动端*/
            browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >= 7', 'IE >= 9'], /*PC端*/
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(''));
    /*将生成的CSS文件输出到与SASS同目录*/
});
/*监控SASS文件变化*/
gulp.task('watch-sass', function () {
    gulp.watch(arrSass, ['sass']);
    /*如果文件变化执行 sass 任务*/
});
/************************************************************************************************/


/*JS处理*/
/************************************************************************************************/
/*将main.js中所需加载的js文件 构成　arrJsPaths*/
gulp.task('getJsPathsObj', () => {
    let reg = /['"](\w+-?\w+-?\w+)['"]\s*:\s*['"](.*)['"]/g;
    return gulp.src('./app/src/js/common/main.js')
        .pipe(through2.obj(function (file, encoding, done) {
            let strJsCode = file.contents.toString();
            strJsCode.replace(reg, function ($1,$2,$3) {
                arrJsPaths[$2] = './app/'+$3;
            });
            //console.log(arrJsPaths);
            done();
        }));
});
/*将所有的JS文件合并压缩为 bundle.js*/
gulp.task("js", ['tpl', 'js-move'], function () {
    return gulp.src("./app/src/pages/**/*.js")
        .pipe(amdOptimize("./app/src/js/common/main", {
            paths: arrJsPaths
        }))
        .pipe(replace(/\/app\/src\/images/,'/images')) /*替换js文件中图片路径*/
        .pipe(concat("bundle.js"))     //合并后的文件，如何合并后的文件和主入口名一样，构建后便只有一个文件
        .pipe(uglify({
            /*js 文件安装指定的规则压缩*/
            mangle: {except: ['require', 'exports', 'module', '$', '$templateCache']}//排除混淆关键字
            //mangle: false,//类型：Boolean 默认：true 是否修改变量名
            //compress: false,//类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest("./app/dist/js"));  //输出目录
});

/*将相关js文件移动到生产模式目录下*/
gulp.task('js-move', function () {
    var arr = ['./app/src/js/lib/require/2.1.11/require.min.js'];
    return gulp.src(arr)
        .pipe(gulp.dest(pathJs));
});
/*将相关文件移动到生产模式目录下*/
gulp.task('file-move', function () {
    var arr = ['favicon.ico','.htaccess'];
    return gulp.src(arr)
        .pipe(gulp.dest(pathDist));
});
/************************************************************************************************/


/*图片处理*/
/************************************************************************************************/
/*图片迁移 图片压缩*/
let arrImages = ['./app/src/images/**/*.*'];
gulp.task('images-move', () => {
    return gulp.src(arrImages)
        .pipe(imagemin())/*图片压缩*/
        .pipe(gulp.dest(pathImages))
});

gulp.task('img', () => {
    return gulp.src(['./images/**/*.png'])
        .pipe(imagemin())/*图片压缩*/
        .pipe(gulp.dest('./images1'))
});


/*文件清除*/
/************************************************************************************************/
/*文件清除 请小心使用*/
gulp.task('clean', function () {
    return gulp.src(['./app/dist/css','./app/dist/js','./app/dist/images'], {read: false})
        .pipe(clean());
});
/************************************************************************************************/


/*监控文件变化*/
/************************************************************************************************/
gulp.task('watch', function () {
    gulp.watch(arrSass, ['sass']);
    gulp.watch(arrTpl, ['tpl']);
});
/************************************************************************************************/


/*index.html 文件生成*/
/************************************************************************************************/
/*生产模式*/
gulp.task('html-prod', function () {
    gulp.src('./app/src/html/index.html')
        /*script 添加*/
        .pipe(replace(/<!--SCRIPT-->/, scriptMin))
        /*bundle.css 替换*/
        .pipe(replace(/<!--LINK-->/, '\n\n\t\t<link type="text/css" rel="stylesheet" href="/css/bundle.css?v=VERSION">\n\n'))
        /*bundle.js 添加*/
        .pipe(replace(/<!--BUNDLE-->/, '\n\n<script data-main="/js/bundle.js?v=VERSION" src="/js/require.min.js"></script>'))
        .pipe(replace(/(\?v=)VERSION/g, '$1' + v))/*将版本号替换 全局变量 app_global.v*/
        .pipe(replace(/VERSION/g, "'" + v + "'"))/*将版本号替换 全局变量 app_global.v*/
        .pipe(htmlmin({collapseWhitespace: true}))/*压缩HTML*/
        .pipe(gulp.dest('./app/dist'));
});
/*开发模式*/
/*将css文件路径保存在数组中*/
gulp.task('setCssPath', ()=>{
    return gulp.src(arrCss)
        .pipe(through2.obj(function (file, encoding, done) {
            let strLink = '\n\t\t<link type="text/css" rel="stylesheet" href="'+file.path.replace(/.*app/,'/app').replace(/\\/g,'/')+'?v='+Math.random()+'">';
            arrCssDevPath.push(strLink);
            done();
        }));
});
/*生成 开发模式下的 index.html*/
gulp.task('html-dev',function () {
    gulp.src('./app/src/html/index.html')
        /*script 添加*/
        .pipe(replace(/<!--SCRIPT-->/, script))
        /*css link 添加*/
        .pipe(replace(/<!--LINK-->/,  function () {
            let strLinks = '';
            arrCssDevPath.forEach((v)=>{
                strLinks += v;
            });
            return strLinks;
        }))
        /*bundle.js 添加*/
        .pipe(replace(/<!--BUNDLE-->/, '\n\n<script data-main="/app/src/js/common/main.js?v=' + Math.random() + '" src="/app/dist/js/require.min.js"></script>'))
        .pipe(replace(/VERSION/g, 'Math.random()'))/*将版本号设置为 Math.random()*/
        .pipe(gulp.dest('.'));
});
/************************************************************************************************/


/*将 AngularJS 模板文件(html)转换为一个 tpl.js 文件*/
/************************************************************************************************/
let arrTpl = ['./app/src/pages/**/*.html', './app/src/widget/angular/**/*.html'];
gulp.task('tpl', function () {
    return gulp.src(arrTpl)
        .pipe(htmlmin())
        .pipe(ngHtml2js({
            moduleName: 'app'
        }))
        .pipe(concat('tpl.js'))
        .pipe(replace(/([\d\D]*)/, 'define(function(require){\n\n' + '$1' + '\n});'))
        .pipe(gulp.dest('./app/dist/js'));
});
/************************************************************************************************/


/*svn提交*/
/************************************************************************************************/
gulp.task('svn', function () {
    return svn.commit('Initial commit', function (err) {
        if (err) throw err;
    });
});
/************************************************************************************************/

//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server();
});


/*默认处理*/
/************************************************************************************************/
gulp.task('default', function () {
    //gulp.run('css', 'js');
    runSequence(['getJsPathsObj'],['css', 'js', 'html-prod', 'file-move', 'images-move'], 'svn','connect');
});

gulp.task('dev', function () {
    runSequence(['sass','tpl'],['setCssPath'], 'html-dev', 'connect');
});
/************************************************************************************************/


/*说明*/
/************************************************************************************************/
gulp.task('help', function () {
    console.log('	gulp help ---------- gulp参数说明');
    console.log('	gulp css ----------- css文件处理：将所需CSS文件合并压缩为bundle.css');
    console.log('	gulp sass ---------- sass文件处理：将所需SASS文件在同目录下生成对应的CSS文件');
    console.log('	gulp watch --------- 监控CSS，JS文件变化：执行 css , js 任务');
    console.log('	gulp svn ----------- svn 提交');
    console.log('	gulp --------------- gulp 默认处理任务(同步or异步): [js,css,html-prod],svn');
    console.log('	gulp dev------------ gulp 开发模式文件处理');
});
/************************************************************************************************/