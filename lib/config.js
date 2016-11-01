var path = require('path')

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
exports.browsers = ['ie > 9', 'last 2 version']
exports.themePath = path.resolve(__dirname, '../node_modules/element-theme-default')
exports.output = './theme'
exports.variable = './element-variables.css'
