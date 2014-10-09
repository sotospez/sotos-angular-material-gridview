var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var jshint = require('gulp-jshint');
var angularTemplates = require('gulp-angular-templates');
var header = require('gulp-header');

var paths = {
    sass: ['./src/css/**/*.scss'],
    js : ['./src/js/**/*.js'],
    html : ['./src/templates/**/*.html']
};


var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

gulp.task('default', ['sass','html','scripts']);
gulp.task('make', ['sass','html','scripts','angularmin']);

gulp.task('sass', function() {
  gulp.src('./src/css/sotos-angular-material-gridview.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist/css/'));
    //.on('end', done);
});


gulp.task('scripts', function() {

    gulp.src(['./src/js/app.js',
            './src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter(function(data){
        gutil.beep();
        }))
        .pipe(concat('sotos-angular-material-gridview.js'))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist/js/'));

});

//concat html templates files to js
gulp.task('html', function () {
    gulp.src('src/templates/**/*.html')
        .pipe(angularTemplates({module:'sotos-angular-material-gridview',basePath:'templates/'}))
        .pipe(gulp.dest('./src/templates/html_temp'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter(function(data){
            gutil.beep();
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./src/js/'));

});


gulp.task('angularmin', function () {
    gulp.src('./dist/js/sotos-angular-material-gridview.js')
        .pipe(ngmin({dynamic: false}))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.html, ['html']);
});
