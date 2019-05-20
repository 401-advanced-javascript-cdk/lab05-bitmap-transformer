'use strict';

const whitenoise = require('../../lib/transforms/white-noise.js');
jest.mock('fs');
const fs = require('fs');

let bufferData = fs.readFile('mock');

describe('Horizontal white-noise Transformation', () => {
  it('takes in a buffer', () => {
    expect(() => whitenoise(bufferData).not.toThrow());
  });
  it('returns the same buffer modified', () => {
    let testData = fs.readFile('mock');
    whitenoise(testData);
    expect(testData.buffer).not.toEqual(bufferData.buffer);
    expect(testData.buffer).toBeInstanceOf(Buffer);
  });
  it('does not alter buffer if type is not `BM`', () => {
    let testData = fs.readFile('mock');
    testData.type = 'Wrong Type';
    whitenoise('testData');
    expect(testData.buffer).toEqual(bufferData.buffer);
  });
});