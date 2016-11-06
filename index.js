var gulp = require('gulp')
var task = require('./lib/task')
var vars = require('./lib/gen-vars')
var config = require('./lib/config')

exports.init = function (filePath) {
  filePath = {}.toString.call(filePath) === '[object String]' ? filePath : ''
  vars.init(filePath)
}

exports.watch = function (opts) {
  var build = function () {
    task.build(Object.assign(opts, {message: 'watch element theme'}))
  }

  gulp.task('build', build)
  gulp.watch(opts.config || config.config, ['build'])
  task.fonts(Object.assign(opts, {message: 'build theme font'}))
  build()
}

exports.run = function (opts) {
  task.fonts(Object.assign(opts, {message: 'build theme font'}))
  task.build(Object.assign(opts, {message: 'build element theme'}))
}
