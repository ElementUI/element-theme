var path = require('path')
var fs = require('fs')
var ora = require('ora')
var config = require('./config')

var varsPath = path.resolve(config.themePath, './src/common/var.css')
var filePath = path.resolve(process.cwd(), config.config)

exports.check = function () {
  if (!fs.existsSync(varsPath)) {
    ora('Pleace install `element-theme-default`').fail()
    process.exit(1)
  }
}

exports.init = function (_file) {
  var spinner = ora('Generator variables file').start()

  filePath = path.resolve(process.cwd(), _file ? _file : config.config)
  if (fs.existsSync(filePath)) {
    spinner.text = 'Variables file is exist.'
    spinner.fail()
  } else {
    fs.writeFileSync(filePath, fs.readFileSync(varsPath), 'utf-8')
    spinner.succeed()
  }
}

exports.replace = function (_file) {
  filePath = path.resolve(process.cwd(), _file ? _file : config.config)
  if (!fs.existsSync(filePath)) {
    ora('Not found variables file ' + filePath + ', please run "et -i"').fail()
    process.exit(1)
  }

  fs.writeFileSync(varsPath, fs.readFileSync(filePath), 'utf-8')
}
