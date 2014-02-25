mimosa-autoprefixer
===========

## Overview

This is a CSS autoprefixing module for the Mimosa build tool. It will transform your CSS code to have the necessary/configured vendor prefixes.

For more information regarding autoprefixer, see https://github.com/ai/autoprefixer.

For more information regarding Mimosa, see http://mimosa.io.

## Usage

Add `'autoprefixer'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

[Autoprefixer](https://github.com/ai/autoprefixer) lets you write your CSS rules without needing to consider vendor prefixes.

This module will run autoprefixer over your CSS during `mimosa watch` and `mimosa build`.  It will rewrite the CSS to include the selected vendor prefixes.  It will create a source map for the altered CSS.  If the incoming CSS had an inline source map, autoprefixer will rebuild that map.

## Default Config

```javascript
autoprefixer: {
  browsers:[ "> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1" ],
  inlineMap: true,
  cascade: true
}
```

* `browsers`: list of browsers to use, see the info on [browsers](https://github.com/ai/autoprefixer#browsers) on the autoprefixer github. The defalut here is the autoprefixer default.
* `inlineMap`: when set to true, the autoprefixer will automatically generate an inline source map.  If an inline source map is already in place it will be used. This is automatically set to `false` during `mimosa build`.
* `cascade`: make output look like this
```
a {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box
}
```

