const path = require('path')

let pkg = {}

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'))
} catch (error) {} // eslint-disable-line no-unused-vars

const config = Object.assign({
  browsers: null,
  out: './theme',
  config: './element-variables.scss',
  theme: 'element-theme-chalk',
  minimize: false
}, pkg['element-theme'])

exports.themePath = path.resolve(process.cwd(), './node_modules/' + config.theme)
exports.out = config.out
exports.config = config.config
exports.minimize = config.minimize
exports.browsers = config.browsers
exports.components = config.components
exports.themeName = config.theme
