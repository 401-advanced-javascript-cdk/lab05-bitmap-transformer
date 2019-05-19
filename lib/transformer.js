'use strict';

const fs = require('fs');

const transformer = ([file, operation]) => {
  let bitmap = new Bitmap(file);

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
    this.PixelArrayBeginning = buffer.readInt32LE(10);
    this.headerSize = buffer.readInt32LE(14);
    this.width = buffer.readInt16LE(18);
    this.height = buffer.readInt16LE(22);
    this.bitsPerPixel = buffer.readInt16LE(28);
    this.pixelArray = [];

    //... and so on
  };
  
  /**
   * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
   * @param operation
   */
  Bitmap.prototype.transform = function(operation) {
    // This is really assumptive and unsafe
    transforms[operation](this);
    this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
  };
  
  /**
   * Sample Transformer (greyscale)
   * Would be called by Bitmap.transform('greyscale')
   * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
   * @param bmp
   */
  const whiteNoise = (bmp) => {
  
    console.log('Transforming bitmap into greyscale', bmp);
  
    if (bmp.type === 'BM') {
      for(let i = bmp.PixelArrayBeginning; i <= bmp.buffer.length; i++)  {
        bmp.buffer[i] = bmp.buffer[Math.floor(Math.random() * i)];
        if(bmp.buffer[i] < 30) {
          bmp.buffer[i] = 255;
        }
      }
    }
  };
  
  // const doTheInversion = (bmp) => {
  //   bmp = {};
  //   console.log(bmp);
  // };
  
  /**
   * A dictionary of transformations
   * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
   */
  const transforms = {
    // greyscale: transformGreyscale,
    // invert: doTheInversion,
    whitenoise: whiteNoise,
  };
  
  // ------------------ GET TO WORK ------------------- //
  
  function transformWithCallbacks() {
  
    fs.readFile(file, (err, buffer) => {
  
      if (err) {
        throw err;
      }
  
      bitmap.parse(buffer);
  
      bitmap.transform(operation);
  
      // Note that this has to be nested!
      // Also, it uses the bitmap's instance properties for the name and the new buffer
      fs.writeFile(bitmap.newFile, bitmap.buffer, (err) => {
        if (err) {
          throw err;
        }
        console.log(`Bitmap Transformed: ${bitmap.newFile}`);
      });
    });
  }
  
  // TODO: Explain how this works (in your README)
  // const [file, operation] = process.argv.slice(2);
  
  // let bitmap = new Bitmap(file);
  
  transformWithCallbacks();

};

module.exports = transformer;