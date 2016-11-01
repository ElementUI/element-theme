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
element-theme --init [file path]

# watch then build
element-theme --watch [--config variable file path] [--out theme path]

# build
element-theme [--config variable file path] [--out theme path] [--minimize]
```

## API
```javascript
var et = require('element-theme')

// watch mode
et.watch({
  config: 'variables/path',
  out: 'output/path'
})

// build
et.run({
  config: 'variables/path',
  out: 'output/path',
  minimize: true
})
```

## Options
### config
Variable file path, default `./element-variables.css`.

### out
Theme output path, default `./theme`.

### minimize
Compressed file.

### browsers
set browsers, default `['ie > 9', 'last 2 version']`.

### watch
watch variable file changes then build.

## License
MIT
