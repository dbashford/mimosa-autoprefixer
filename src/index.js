"use strict";

var path = require( "path" )
  , prefixerLib = require( "autoprefixer" )
  , config = require( "./config" )
  , autoprefixer;

var _process = function ( mimosaConfig, options, next ) {
  if ( options.files && options.files.length ) {

    options.files.forEach( function( file ) {
      var opts = {
        inlineMap: mimosaConfig.autoprefixer.inlineMap,
        from: path.basename( file.inputFileName ),
        to: path.basename( file.outputFileName )
      };

      file.outputFileText = autoprefixer.process( file.outputFileText, opts );
    });
  }

  next();
};

var registration = function ( config, register ) {
  autoprefixer = prefixerLib( config.autoprefixer.browsers , { cascade: config.autoprefixer.cascade } );
  register( [ "add", "update", "buildExtension", "buildFile"], "beforeWrite", _process, config.extensions.css );
};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};