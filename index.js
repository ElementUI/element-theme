const gulp = require('gulp')
const {series} = require('gulp')
const task = require('./lib/task')
const vars = require('./lib/gen-vars')
const config = require('./lib/config')

const build = function (opts) {
  return function () {
    return task.build(Object.assign(opts, {message: 'build element theme'}))
  }
}

const fonts = function (opts) {
  return function () {
    return task.fonts(Object.assign(opts, {message: 'build theme font'}))
  }
}

exports.init = function (filePath) {
  filePath = {}.toString.call(filePath) === '[object String]' ? filePath : ''
  vars.init(filePath)
}

exports.watch = function (opts) {
  exports.run(opts)
  gulp.watch(opts.config || config.config, series(build(opts)))
}

exports.run = function (opts, cb) {
  if (typeof cb === 'function') {
    return series(build(opts), fonts(opts))(cb);
  }

  return series(build(opts), fonts(opts))();
}
