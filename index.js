'use strict';

const transformer = require('./lib/transformer.js');

const [file, operation] = process.argv.slice(2);

try {
  transformer([file, operation]);
}
catch(e) {
  throw e
}