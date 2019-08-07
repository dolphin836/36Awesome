let gulp         = require('gulp');
let del          = require('del');
let miniCss      = require('gulp-clean-css');         // Css 文件压缩
let concat       = require('gulp-concat');            // 多个文件合并为一个
let rev          = require('gulp-rev');               // 对文件名加MD5后缀
let revCollector = require('gulp-rev-collector');     // 路径替换
let htmlReplace  = require('gulp-html-replace');      // Html 替换
let uglify       = require('gulp-uglify-es').default; // JavaScript 文件压缩
let browserSync  = require('browser-sync').create();


// Font Awesome 字体资源
gulp.task('font', function() {
    gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('../dist/webfonts'))
});

// Site 文件
gulp.task('json', function() {
    gulp.src('./site.json')
        .pipe(rev())
        .pipe(gulp.dest('..'))
        .pipe(rev.manifest({
            path: 'json-manifest.json'
        }))
        .pipe(gulp.dest('../dist/rev'))
});

// Css 文件
gulp.task('awesome-css', function() {
    gulp.src(['./node_modules/bulma/css/bulma.css', './node_modules/@fortawesome/fontawesome-free/css/all.css', './Awesome.css'])
        .pipe(concat('awesome.css'))
        .pipe(miniCss())
        .pipe(rev())
        .pipe(gulp.dest('../dist/css'))
        .pipe(rev.manifest({
          path: 'awesome-css-manifest.json'
        }))
        .pipe(gulp.dest('../dist/rev'));
});

// JavaScript 文件
gulp.task('awesome-script', function() {                         
    gulp.src(['./node_modules/fuse.js/dist/fuse.js', './node_modules/store/dist/store.modern.min.js', './node_modules/mousetrap/mousetrap.js', './Awesome.js'])
        .pipe(uglify())
        .pipe(concat('awesome.js'))
        .pipe(rev())
        .pipe(gulp.dest('../dist/js'))
        .pipe(rev.manifest({
          path: 'awesome-script-manifest.json'
        }))
        .pipe(gulp.dest('../dist/rev'))
});

gulp.task('rev', function() {
    gulp.src(['../dist/rev/*.json', './index.html'])
        .pipe(htmlReplace({
            'awesome-css': '/dist/css/awesome.css',
            'awesome-script': '/dist/js/awesome.js'
        }))
        .pipe(revCollector())
        .pipe(gulp.dest('../'))
});

// 清除
gulp.task('clean', function() {
    del
    (
        [
            '../dist',
            '../site-*.json',
            '../index.html'
        ], {force: true}
    )
});

// Static server
gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["index.html", "Awesome.css", "Awesome.js"]).on('change', browserSync.reload);
});

gulp.task('default', ['awesome-css', 'font', 'awesome-script', 'json']);

// gulp clean
// gulp
// gulp rev
