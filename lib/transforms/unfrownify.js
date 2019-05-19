const unfrownify = (bmp) => {
  
  console.log('Transforming bitmap into white noise', bmp);

  if (bmp.type === 'BM') {
    const start = bmp.pixelArrayBeginning + 4406;
    const end = bmp.buffer.length - 9000;
    
    bmp.buffer.slice(start, end).reverse();
  }
};

module.exports = unfrownify;