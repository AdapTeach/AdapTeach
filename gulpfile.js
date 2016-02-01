var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha-co');
var exit = require('gulp-exit');

const PATH_TO_SOURCE = 'server/**/*.js';
const PATH_TO_TESTS = 'test/**/*.js';

gulp.task('nodemon', function () {
    nodemon({
        script: 'server/server.js',
        env: {PORT: 8000}
    }).on('restart');
});

gulp.task('watch', function () {
    gulp.watch(
        [PATH_TO_SOURCE, PATH_TO_TESTS], //blurbs of files to watch
        ['mocha'] //tasks to run when the above files change
    );
});

gulp.task('mocha', function () {
    process.env.PORT = 8001;
    return gulp.src([PATH_TO_TESTS])
        .pipe(mocha({
            reporter: 'nyan'
        }));
});

gulp.task('test-once', function () {
    gulp.tasks.mocha.fn().pipe(exit());
});

gulp.task('default', ['mocha', 'watch']);