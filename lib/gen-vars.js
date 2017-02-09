var path = require('path')
var fs = require('fs')
var Readable = require('stream').Readable
var ora = require('ora')
var through = require('through2')
var config = require('./config')

var varsPath = path.resolve(config.themePath, './src/common/var.css')
var filePath = path.resolve(process.cwd(), config.config)

exports.check = function () {
  if (!fs.existsSync(varsPath)) {
    ora('please install `element-theme-default`').fail()
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

  return through.obj(function (file, encoding, callback) {
    if (file.isNull() || file.path === filePath) {
      return callback(null, file)
    }

    var custom = new Buffer('@import "' + filePath + '";', encoding)
    if (file.isStream()) {
      var rs = new Readable()
      rs.push(custom, encoding)
      rs.pipe(file.contents)
      return callback(null, file)
    } else if (file.isBuffer()) {
      file.contents = Buffer.concat([file.contents, custom])
      return callback(null, file)
    }
  })
}
