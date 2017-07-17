var gulp = require('gulp')
var series = require('run-sequence').use(gulp)
var task = require('./lib/task')
var vars = require('./lib/gen-vars')
var config = require('./lib/config')

var build = function (opts) {
  return function () {
    return task.build(Object.assign(opts, {message: 'build element theme'}))
  }
}

var fonts = function (opts) {
  return function () {
    return task.fonts(Object.assign(opts, {message: 'build theme font'}))
  }
}

exports.init = function (filePath) {
  filePath = {}.toString.call(filePath) === '[object String]' ? filePath : ''
  vars.init(filePath)
}

exports.watch = function (opts) {
  gulp.task('build', build(opts))
  exports.run(opts)
  if (opts.watch instanceof Array === false) {
    gulp.watch(config.config, ['build'])
  } else {
    var watchFiles = opts.watch.concat(opts.config || config.config)
    gulp.watch(watchFiles, ['build'])
  }
}

exports.run = function (opts, cb) {
  gulp.task('build', build(opts))
  gulp.task('fonts', fonts(opts))
  if (typeof cb === 'function') {
    return series('build', 'fonts', cb);
  }
  return series('build', 'fonts');
}
