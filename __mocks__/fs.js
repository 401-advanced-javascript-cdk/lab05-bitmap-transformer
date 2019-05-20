'use strict';

let lorem = require('./lorem-ipsum.js');

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if( file.match(/bad/i) ) {
    cb('Invalid File');
  }
  else if (file.match(/mock/i)) {
    let bufferData = {
      buffer: Buffer.from(lorem),
      type: 'BM',
      fileSize: 16000,
      pixelArrayBeginning: 1200,
      headerSize: 108,
      width: 110,
      height: 125,
      bitsPerPixel: 8,
      colorTable: Buffer.from(lorem).slice(1000, 1255),
    };
    return bufferData;
  }
};