var path = require('path')
var fs = require('fs')
var ora = require('ora')
var config = require('./config')

var varsPath = path.resolve(config.themePath, './src/common/var.scss')
var varsStorePath = path.resolve(config.themePath, './src/common/var-store.scss')
var filePath = path.resolve(process.cwd(), config.config)

exports.check = function () {
  if (!fs.existsSync(varsPath)) {
    ora('please install `' + config.themeName + '`').fail()
    process.exit(1)
  }
}

exports.init = function (_file) {
  var spinner = ora('Generator variables file').start()

  filePath = path.resolve(process.cwd(), _file ? _file : config.config)
  if (fs.existsSync(filePath)) {
    spinner.text = 'Variables file already exists.'
    spinner.fail()
  } else {
    //Some exceptions may cause the compilation to fail to recover normally
    if (fs.existsSync(varsStorePath)) {
      fs.writeFileSync(filePath, fs.readFileSync(varsStorePath), 'utf-8')
    } else {
      fs.writeFileSync(filePath, fs.readFileSync(varsPath), 'utf-8')
    }
    spinner.succeed()
  }
}
