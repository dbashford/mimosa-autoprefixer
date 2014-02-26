"use strict";

var path = require( "path" )
  , prefixerLib = require( "autoprefixer" )
  , config = require( "./config" )
  , autoprefixer;

var _process = function ( mimosaConfig, options, next ) {
  if ( options.files && options.files.length ) {

    options.files.forEach( function( file ) {
      var opts = {
        map: mimosaConfig.autoprefixer.map,
        inlineMap: false,
        mapAnnotation: false
      };

      var result = autoprefixer.process( file.outputFileText, opts );
      var css = result.css;

      if ( mimosaConfig.autoprefixer.map ) {
        var sourceMap = JSON.parse( result.map );
        sourceMap.sourceRoot = "";
        sourceMap.sources[0] = file.inputFileName;
        sourceMap.sourcesContent = [file.outputFileText];
        sourceMap.file = file.outputFileName;
        var base64SourceMap = new Buffer( JSON.stringify( sourceMap ) ).toString( "base64" );
        var datauri = "data:application/json;base64," + base64SourceMap;
        file.outputFileText = css + "\n/*# sourceMappingURL=" + datauri + " */\n";
      } else {
        file.outputFileText = css;
      }
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