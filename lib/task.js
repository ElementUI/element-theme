var path = require('path')
var gulp = require('gulp')
var ora = require('ora')
var nop = require('gulp-nop')
var postcss = require('gulp-postcss')
var cssmin = require('gulp-cssmin')
var config = require('./config')
var replaceVars = require('./gen-vars').replace

var salad = function (browsers) {
  return require('postcss-salad')({
    browsers: browsers || config.browsers,
    features: config.features
  })
}

exports.fonts = function (opts) {
  var spin = ora(opts.message).start()
  var stream = gulp.src(path.resolve(config.themePath, './src/fonts/**'))
    .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
    .pipe(gulp.dest(path.resolve(opts.out || config.out, './fonts')))
    .on('end', function () {
      spin.succeed()
    })

  return stream
}

exports.build = function (opts) {
  var spin = ora(opts.message).start()
  var stream

  replaceVars(opts.config)
  stream = gulp.src([opts.config || config.config, path.resolve(config.themePath, './src/*.css')])
    .pipe(postcss([salad(opts.browsers)]))
    .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
    .pipe(gulp.dest(opts.out || config.out))
    .on('end', function () {
      spin.succeed()
    })

  return stream
}
