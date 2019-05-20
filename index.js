'use strict';

const transformer = require('./lib/transformer.js');

const [file, operation] = process.argv.slice(2);
  
transformer([file, operation]);