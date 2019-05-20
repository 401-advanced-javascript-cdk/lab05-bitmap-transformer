const whiteout = (bmp) => {

  if (bmp.type === 'BM') {
    for(let i = bmp.pixelArrayBeginning - 256; i < bmp.pixelArrayBeginning - 1; i++) {  
      if (bmp.buffer[i] !== 0) {
        if(bmp.buffer[i] < 255);
        bmp.buffer[i] = 255;
      }
    }
  }
};

module.exports = whiteout;