"use strict";

exports.defaults = function() {
  return {
    autoprefixer: {
      browsers:[ "> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1" ],
      inlineMap: true,
      cascade: true
    }
  };
};

exports.placeholder = function() {
  var ph = "  autoprefixer:            # settings for autoprefixer module\n" +
     "    browsers:[]            # list of browsers to use, see the info on at\n" +
     "                           # https://github.com/ai/autoprefixer#browsers\n" +
     "    inlineMap: true        # when set to true, the autoprefixer will automatically generate\n" +
     "                           # an inline source map.  If an inline source map is already in place\n" +
     "                           # it will be used. This is automatically set to 'false' during\n" +
     "                           # 'mimosa build'.\n" +
     "    cascade: true          # path to directory where any additional custom eshint rules exist\n";
  return ph;
};

exports.validate = function ( config, validators ) {
  var errors = []
    , ap = config.autoprefixer;

  if ( validators.ifExistsIsObject(errors, "autoprefixer config", ap ) ) {
    validators.ifExistsIsBoolean( errors, "autoprefixer.inlineMap", ap.inlineMap );
    validators.ifExistsIsBoolean( errors, "autoprefixer.cascade", ap.cascade );
    validators.ifExistsIsArrayOfStrings( errors, "autoprefixer.browsers", ap.browsers );
  }

  if ( config.isBuild ) {
    config.autoprefixer.inlineMap = false;
  }

  return errors;
};