var path = require('path')

var pkg = {}

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'))
} catch (err) {}

var config = Object.assign({
  browsers: ['ie > 9', 'last 2 versions'],
  out: './theme',
  config: './element-variables.css',
  minimize: false
}, pkg['element-theme'])

exports.features = {
  bem: {
    shortcuts: {
      component: 'b',
      modifier: 'm',
      descendent: 'e'
    },
    separators: {
      descendent: '__',
      modifier: '--'
    }
  }
}
exports.themePath = path.resolve(process.cwd(), './node_modules/element-theme-default')
exports.out = config.out
exports.config = config.config
exports.minimize = config.minimize
exports.browsers = config.browsers
