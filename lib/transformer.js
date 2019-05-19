'use strict';

const fs = require('fs');

const whiteNoise = require('./transforms/white-noise.js');
const Bitmap = require('./bitmap-constructor.js');

const transformer = ([file, operation]) => {

  let bitmap = new Bitmap(file);

  /**
   * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
   * @param operation
   */
  const transform = function(bitmap, operation) {
    const transforms = {
      // greyscale: transformGreyscale,
      // invert: doTheInversion,
      whitenoise: whiteNoise,
    };
    if (transforms.hasOwnProperty(operation) === true) {
      transforms[operation](bitmap);
      bitmap.newFile = bitmap.file.replace(/\.bmp/, `.${operation}.bmp`);
    }
  };

  function transformWithCallbacks() {

    fs.readFile(file, (err, buffer) => {
      if (err) {
        console.error(`File '${file}' not found`);
        return;
      }
   
      bitmap.parse(buffer);
      transform(bitmap, operation);  

      try {
        fs.writeFile(bitmap.newFile, bitmap.buffer, (err) => {
          if (err) {
            throw err;
          }
    
          console.log(`Bitmap Transformed: ${bitmap.newFile}`);
        });
      }
      catch(e) {
        console.error(`Transformation '${operation}' not found`);
      }
    });
  }
  

  transformWithCallbacks();
};

module.exports = transformer;