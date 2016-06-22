const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const mocha = require('gulp-mocha-co')
const exit = require('gulp-exit')
const webpack = require('webpack-stream')

const PATH_TO_SERVER_SOURCE = 'server/**/*.js'
const PATH_TO_TESTS = 'test/**/*.js'

// gulp.task('nodemon', () => {
//   nodemon({
//     script: 'server/server.js',
//     env: {PORT: 8000}
//   }).on('restart')
// })

gulp.task('watch', () => {
  gulp.watch(
    [PATH_TO_SERVER_SOURCE, PATH_TO_TESTS], //blurbs of files to watch
    ['mocha'] //tasks to run when the above files change
  )
})

gulp.task('mocha', () => {
  process.env.PORT = 8001
  return gulp.src([PATH_TO_TESTS])
    .pipe(mocha({
      reporter: 'nyan'
    }))
})

gulp.task('test-once', () => {
  gulp.tasks.mocha.fn().pipe(exit())
})

// gulp.task('client', () =>
//   gulp.src('client/app/app.js')
//     .pipe(webpack())
//     .pipe(gulp.dest('client/dist/'))
// )

gulp.task('tdd', ['mocha', 'watch'])
