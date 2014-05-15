var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');



gulp.task('styles', function () {
  gulp.src('public/stylesheets/*.css')
    .pipe(concatCss("build.css"))
    .pipe(minifyCSS(opts))
    .pipe(livereload())
    .pipe(gulp.dest('public/build/stylesheets'));
});

gulp.task('images', function () {
   return gulp.src('public/images/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('public/build/images'));
});

gulp.task('watch', function(){
    gulp.watch('css/*.css', ['styles']);
    gulp.watch('images/*.jpg', ['images']);
});
gulp.task('develop', function () {
  nodemon({ script: 'app.js', ext: 'html js', ignore: ['ignored.js'] })
    .on('restart', function () {
      console.log('restarted!')
    }),
    'watch'
})


gulp.task('default', ['styles', 'watch']);