const path = require('path');

let pkg = {};

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'));
} catch (error) {}

const config = Object.assign({
  overrideBrowserslist: ['ie > 9', 'last 2 versions'],
  out: './theme',
  config: './element-variables.scss',
  theme: 'element-theme-chalk',
  minimize: false
}, pkg['element-theme']);

exports.themePath = path.resolve(process.cwd(), './node_modules/' + config.theme);
exports.out = config.out;
exports.config = config.config;
exports.minimize = config.minimize;
exports.overrideBrowserslist = config.overrideBrowserslist;
exports.components = config.components;
exports.themeName = config.theme;
