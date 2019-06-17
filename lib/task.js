const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const ora = require('ora')
const nop = require('gulp-noop')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const config = require('./config')

exports.fonts = function (opts) {
  const spin = ora(opts.message).start()
  const stream = gulp.src(path.resolve(config.themePath, './src/fonts/**'))
    .pipe(gulp.dest(path.resolve(opts.out || config.out, './fonts')))
    .on('end', () => {
      spin.succeed()
    })

  return stream
};

exports.build = function (opts) {
  const spin = ora(opts.message).start()
  let components
  let cssFiles = '*'

  if (config.components) {
    components = config.components.concat(['base'])
    cssFiles = '{' + components.join(',') + '}'
  }

  const varsPath = path.resolve(config.themePath, './src/common/var.scss')
  fs.writeFileSync(varsPath, fs.readFileSync(path.resolve(process.cwd(), opts.config || config.config)), 'utf-8')

  const stream = gulp.src([opts.config || config.config, path.resolve(config.themePath, './src/' + cssFiles + '.scss')])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: config.overrideBrowserslist,
        cascade: false
      }),
      (opts.minimize || config.minimize) ? cssnano({showLog: false}) : nop()
    ]))
    .pipe(gulp.dest(opts.out || config.out))
    .on('end', () => {
      spin.succeed()
    })

  return stream
}
