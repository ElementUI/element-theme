# element-theme
[![Build Status](https://travis-ci.org/ElementUI/element-theme.svg?branch=master)](https://travis-ci.org/ElementUI/element-theme)
[![npm](https://img.shields.io/npm/v/element-theme.svg)](https://www.npmjs.com/package/element-theme)

> Theme generator cli tool for Element.

![](./media/element.gif)

## Installation
install local or global
```shell
npm i element-theme -D
```

install `theme-default`
```shell
npm i element-theme-default -D
# or from github
npm i https://github.com/ElementUI/theme-default -D
```

## CLI
```shell
# init variables file
et --init [file path]

# watch then build
et --watch [--config variable file path] [--out theme path] [-s --source filePath]

# build
et [--config variable file path] [--out theme path] [--minimize] [-s --source filePath]
```

## Node API
```javascript
var et = require('element-theme')

// watch mode
et.watch({
  config: 'variables/path',
  source: 'source/path'
  out: 'output/path'
})

// build
et.run({
  config: 'variables/path',
  source: 'source/path'
  out: 'output/path',
  minimize: true
})
```

## Options
### config
Variable file path, default `./element-variables.css`.

### source
Theme source files path, default `element-theme-default module folder`.

### out
Theme output path, default `./theme`.

### minimize
Compressed file.

### browsers
set browsers, default `['ie > 9', 'last 2 versions']`.

### watch
watch variable file changes then build.

### components
A lists of components that you want to generate themes for.  All by default.

## Config
You can configure some options in `element-theme` by putting it in package.json:
```json
{
  "element-theme": {
    "browsers": ["ie > 9", "last 2 versions"],
    "source": "theme source files"
    "out": "./theme",
    "config": "./element-variables.css",
    "theme": "element-theme-default",
    "minimize": false,
    "components": ["button", "input"]
  }
}
```

## License
MIT
