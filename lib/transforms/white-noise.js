const whiteNoise = (bmp) => {
  
  console.log('Transforming bitmap into white noise', bmp);

  if (bmp.type === 'BM') {
    for(let i = bmp.pixelArrayBeginning; i <= bmp.buffer.length; i++)  {
      bmp.buffer[i] = bmp.buffer[Math.floor(Math.random() * i)];
      if(bmp.buffer[i] < 30) {
        bmp.buffer[i] = 255;
      }
    }
  }
};

module.exports = whiteNoise;