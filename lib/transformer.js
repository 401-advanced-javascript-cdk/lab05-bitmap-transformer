'use strict';

const fs = require('fs');

const Bitmap = require('./bitmap-constructor.js');
const whiteNoise = require('./transforms/white-noise.js');
const horizontalMirror = require('./transforms/horizontal-mirror.js');
const unfrownify = require('./transforms/unfrownify.js');

const transformer = ([file, operation]) => {
  const transforms = {
    horizontalmirror: horizontalMirror,
    unfrownify: unfrownify,
    whitenoise: whiteNoise,
  };

  if (!file || !operation) {
    console.log(`
To perform a transformation on a bitmap file:
  node index.js {filePath} {transformation}

Available transformations:`);

    for(let operation in transforms) {
      console.log(`- ${operation}`);
    }
    return;
  }
  let bitmap = new Bitmap(file);
  
  /**
   * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
   * @param operation
   */
  const transform = function(bitmap, operation) {
    if (transforms.hasOwnProperty(operation) === true) {
      transforms[operation](bitmap);
      bitmap.newFile = bitmap.file.replace(/\.bmp/, `.${operation}.bmp`);
    }
  };

  function transformWithCallbacks() {

    fs.readFile(file, (err, buffer) => {
      if (err) {
        console.error(`\nFile '${file}' not found`);
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
        console.error(`\nTransformation '${operation}' not found`);
      }
    });
  }
  

  transformWithCallbacks();
};

module.exports = transformer;