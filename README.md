# element-theme
[![npm](https://img.shields.io/npm/v/element-theme.svg)](https://www.npmjs.com/package/element-theme)

> Theme generator cli tool for Element.

## Installation
```shell
npm i element-theme -D
```

## CLI
```shell
# init variables file
element-theme --init [filePath]

# watch variables file
element-theme --watch [--config variable filePath] [--out themePath]

# build
element-theme [--config variable filePath] [--out themePath] [--minimize]
```

## API
```javascript
var et = require('element-theme')

// watch mode
et.watch({
  config: 'xxx',
  out: 'xxx'
})

// build
et.run({
  config: 'xxx',
  out: 'xxx',
  minimize: true
})
```

## Options
### config
Variable file path, default './element-theme-vars.css'.

### out
Theme output path, default './element-theme.css'.

### minimize
Compressed file.

### browsers
set browsers

### watch
watch variable file changes then build.

## License
MIT
