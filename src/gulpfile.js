let gulp         = require('gulp');
let { parallel } = require('gulp');
let del          = require('del');
let miniCss      = require('gulp-clean-css');         // Css 文件压缩
let concat       = require('gulp-concat');            // 多个文件合并为一个
let rev          = require('gulp-rev');               // 对文件名加MD5后缀
let revCollector = require('gulp-rev-collector');     // 路径替换
let htmlReplace  = require('gulp-html-replace');      // Html 替换
let uglify       = require('gulp-uglify-es').default; // JavaScript 文件压缩
let browserSync  = require('browser-sync').create();

// Font Awesome 字体资源
function font(cb) {
    gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('../dist/webfonts'));

    cb();
}
// Site 文件
function json(cb) {
    gulp.src('./data/*.json')
        .pipe(rev())
        .pipe(gulp.dest('../data'))
        .pipe(rev.manifest({
            path: 'json-manifest.json'
        }))
        .pipe(gulp.dest('../dist/rev'));

    cb();
}
// Css 文件
function css(cb) {
    gulp.src(['./node_modules/bulma/css/bulma.css', './node_modules/@fortawesome/fontawesome-free/css/all.css', './Awesome.css'])
        .pipe(concat('awesome.css'))
        .pipe(miniCss())
        .pipe(rev())
        .pipe(gulp.dest('../dist/css'))
        .pipe(rev.manifest({
          path: 'awesome-css-manifest.json'
        }))
        .pipe(gulp.dest('../dist/rev'));

    cb();
};
// JavaScript 文件
function script(cb) {                         
    gulp.src(['./node_modules/fuse.js/dist/fuse.js', './node_modules/store/dist/store.modern.min.js', './Awesome.js'])
        .pipe(uglify())
        .pipe(concat('awesome.js'))
        .pipe(rev())
        .pipe(gulp.dest('../dist/js'))
        .pipe(rev.manifest({
          path: 'awesome-script-manifest.json'
        }))
        .pipe(gulp.dest('../dist/rev'))

    cb();
};
// 清除
function clean(cb) {
    del
    (
        [
            '../dist',
            '../data',
            '../tool',
            '../blog',
            '../fun',
            '../index.html'
        ], {force: true}
    );

    cb();
}
// Static server
function sync(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["index.html", "Awesome.css", "Awesome.js", "./data/*.json"]).on('change', browserSync.reload);

    cb();
};
// 编译
function build(cb) {
    let categoryArr = [
        'recommend',
        'tool',
        'blog',
        'fun'
    ];

    categoryArr.map(function (category) {
        let cssPath          = '/dist/css/awesome.css';
        let scriptPath       = '/dist/js/awesome.js';
        let categoryJsonPath = '/data/category.json';
        let dataPath         = '/data/' + category + '.json';
        let htmlPath         = '../';
        // 推荐存在根目录
        if (category != 'recommend') {
            cssPath          = '..' + cssPath;
            scriptPath       = '..' + scriptPath;
            categoryJsonPath = '..' + categoryJsonPath;
            dataPath         = '..' + dataPath;
            htmlPath         = htmlPath + category;
        }

        gulp.src(['../dist/rev/*.json', './index.html'])
            .pipe(htmlReplace({
                'awesome-css': cssPath,
                'awesome-script': scriptPath,
                'category': '<script>const CATEGORY = "' + categoryJsonPath + '";</script>',
                'data': '<script>const GROUP = "' + dataPath + '";</script>'
            }))
            .pipe(revCollector())
            .pipe(gulp.dest(htmlPath));
    });

    cb();
}

exports.clean   = clean;
exports.default = parallel(font, json, css, script);
exports.sync    = sync;
exports.build   = build;

// gulp clean
// gulp
// gulp build
