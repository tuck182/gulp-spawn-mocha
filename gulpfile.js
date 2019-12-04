const DEBUG = process.env.NODE_ENV === 'debug',
      CI = process.env.CI === 'true';

const gulp = require('gulp'),
    minimist = require('minimist'),
    mocha = require('./lib');

const series = gulp.series;

const args = minimist(process.argv.slice(2));

gulp.task('test', function () {
  return gulp.src(['test/*.test.js'], {read: false})
    .pipe(mocha({
      debugBrk: DEBUG,
      r: 'test/setup.js',
      R: CI ? 'spec' : 'nyan',
      istanbul: !DEBUG,
      ...(args.grep ? {grep: args.grep} : {}),
    }));
});

gulp.task('watch', function () {
  gulp.watch('{lib,test}/*', ['test']);
});

gulp.task('default', series('test', 'watch'));
