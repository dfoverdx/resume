"use strict";

// use custom loader because npm's showdown-loader uses showdown-ghost which has been deprecated in favor of showdown
var showdown = require('showdown'),
    emailExtension = require('./showdownjs-email-extension'),
    bootstrapExtension = require('./showdownjs-bootstrap-extension');

showdown.setOption('namedEmailIncludeNameInTag', false);
showdown.extension('namedEmail', emailExtension);
showdown.extension('bootstrap', bootstrapExtension);

var converter = new showdown.Converter({ tables: true, extensions: ['namedEmail', 'bootstrap'] });

module.exports = converter.makeHtml.bind(converter);