## Lab 05 - Bitmap Transformer
Uses the command line to select a bitmap image and a transformation.  The image is read as a buffer, which is altered to perform the selected transformation, and a new image is created.
### Author: Chris Kozlowski

### Links and Resources
* [Submission PR]( --- )
* [Travis](https://travis-ci.com/401-advanced-javascript-cdk/lab05-bitmap-transformer)

### Modules
#### `transformer.js`
##### Exported Values and Methods
###### `transformer(file, transformation)`
`transform(bitmap, operation)`  `transformWithCallbacks()`

#### `bitmap-constructor.js`
##### Exported Values and Methods
###### `Bitmap(filePath)`
`Bitmap.prototype.parse(buffer)`  

#### Transformers
##### Exported Values and Methods
###### `whiteout(bmp)`  `whiteNoise(bmp) `  `unfrownify(bmp)`  `horizontal-mirror(bmp)`

####  Instructions
* Clone repository
* `npm install` in the root directory
* `node index.js` - Shows commandline instructions and available transformations
* `node index.js {filePath} {transformation}` - Reads the selected file into a buffer and performes the selected operation, then saves a new image file to the /assets directory.

#### Tests
* `npm test`