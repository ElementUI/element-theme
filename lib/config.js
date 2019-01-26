var path = require('path')

var pkg = {}

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'))
} catch (err) {}

var browsers = ['ie > 9', 'last 2 versions'];
var config = Object.assign({
  out: './theme',
  config: './element-variables.scss',
  theme: 'element-theme-chalk',
  minimize: false
}, {browsers: pkg['browserslist'] || browsers}, pkg['element-theme']);

exports.themePath = path.resolve(process.cwd(), './node_modules/' + config.theme)
exports.out = config.out
exports.config = config.config
exports.minimize = config.minimize
exports.browsers = config.browsers
exports.components = config.components
exports.themeName = config.theme
