const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const ora = require('ora')
const nop = require('gulp-nop')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const config = require('./config')

exports.fonts = function (opts) {
  const spin = ora(opts.message).start()
  const stream = gulp.src(path.resolve(config.themePath, './src/fonts/**'))
    .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
    .pipe(gulp.dest(path.resolve(opts.out || config.out, './fonts')))
    .on('end', function () {
      spin.succeed()
      return this
    })

  return stream
}

exports.build = function (opts) {
  const spin = ora(opts.message).start()
  let components
  let cssFiles = '*'

  if (config.components) {
    components = config.components.concat(['base'])
    cssFiles = '{' + components.join(',') + '}'
  }

  const varsPath = path.resolve(config.themePath, './src/common/var.scss')
  const varsStorePath = path.resolve(config.themePath, './src/common/var-store.scss')
  // Some exceptions may cause the compilation to fail to recover normally
  if (!fs.existsSync(varsStorePath)) {
    // Store default vars
    fs.writeFileSync(varsStorePath, fs.readFileSync(varsPath, 'utf-8'), 'utf-8')
  }

  if (!fs.existsSync(path.resolve(process.cwd(), opts.config || config.config))) {
    throw new Error(`config file "${path.resolve(process.cwd(), opts.config || config.config)}" not exist`)
  }

  fs.writeFileSync(varsPath, fs.readFileSync(path.resolve(process.cwd(), opts.config || config.config)), 'utf-8')

  const stream = gulp.src([opts.config || config.config, path.resolve(config.themePath, './src/' + cssFiles + '.scss')])
    .pipe(sass.sync())
    .pipe(autoprefixer({
      overrideBrowserslist: opts.browsers || config.browsers,
      cascade: false
    }))
    .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
    .pipe(gulp.dest(opts.out || config.out))
    .on('end', function () {
      // Restore default vars
      fs.writeFileSync(varsPath, fs.readFileSync(varsStorePath, 'utf-8'), 'utf-8')
      fs.unlinkSync(varsStorePath)

      spin.succeed()
      return this
    })

  return stream
}
