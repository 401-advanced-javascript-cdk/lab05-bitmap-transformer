const mirror = (bmp) => {

  if (bmp.type === 'BM') {
    for(let i = bmp.pixelArrayBeginning; i <= bmp.buffer.length - 1350; i++)  {
      bmp.buffer[i] = bmp.buffer[bmp.buffer.length - (i + 201)];
    }
  }
};

module.exports = mirror;