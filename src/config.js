"use strict";

exports.defaults = function() {
  return {
    autoprefixer: {
      browsers:[ "> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1" ],
      cascade: true,
      map: {
        inline: true,
        annotation: true,
        sourcesContent: true
      }
    }
  };
};

exports.placeholder = function() {
  var ph = "  autoprefixer:             # settings for autoprefixer module\n" +
     "    browsers:[]             # list of browsers to use, see the info on at\n" +
     "                            # https://github.com/ai/autoprefixer#browsers\n" +
     "    cascade: true           # whether to create nice visual cascade of prefixes\n" +
     "    map: true               # set to false if you do not wish to have source maps\n";
     
  return ph;
};

exports.validate = function ( config, validators ) {
  var errors = []
    , ap = config.autoprefixer;

  if ( validators.ifExistsIsObject(errors, "autoprefixer config", ap ) ) {
    validators.ifExistsIsBoolean( errors, "autoprefixer.cascade", ap.cascade );
    validators.ifExistsIsArrayOfStrings( errors, "autoprefixer.browsers", ap.browsers );
  }

  if ( config.isBuild ) {
    config.autoprefixer.map = !config.isBuild && config.autoprefixer.map;
  }

  return errors;
};
