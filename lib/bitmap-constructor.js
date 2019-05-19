'use strict';

/**
   * Bitmap -- receives a file name, used in the transformer to note the new buffer
   * @param filePath
   * @constructor
   */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
   * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
   * @param buffer
   */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  this.fileSize = buffer.readInt32LE(2);
  this.pixelArrayBeginning = buffer.readInt32LE(10);
  this.headerSize = buffer.readInt32LE(14);
  this.width = buffer.readInt16LE(18);
  this.height = buffer.readInt16LE(22);
  this.bitsPerPixel = buffer.readInt16LE(28);
};

module.exports = Bitmap;