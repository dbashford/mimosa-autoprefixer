"use strict";

var config = require( "./config" )
  , autoprefixer;

var _process = function ( mimosaConfig, options, next ) {
  if ( options.files && options.files.length ) {
    options.files.forEach( function( file ) {
      if ( !file.outputFileText ) {
        return;
      }

      var opts = {
        map: mimosaConfig.autoprefixer.map,
        from: file.inputFileName,
        to: file.outputFileName
      };

      var result = autoprefixer.process( file.outputFileText, opts );
      file.outputFileText = result.css;
    });
  }

  next();
};

var registration = function ( config, register ) {
  var prefixerLib = require( "autoprefixer" )
    , _ = require( "lodash" );

  autoprefixer = prefixerLib( config.autoprefixer.browsers , { cascade: config.autoprefixer.cascade } );

  register(
    [ "add", "update", "buildFile"],
    "betweenCompileWrite",
    _process,
    ["css"] );

  register(
    [ "add", "update", "buildExtension"],
    "betweenCompileWrite",
    _process,
    _.without( config.extensions.css, "css" ) );

};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
