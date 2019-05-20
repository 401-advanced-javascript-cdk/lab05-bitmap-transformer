'use strict';

const mirror = require('../../lib/transforms/horizontal-mirror.js');
jest.mock('fs');
const fs = require('fs');

let bufferData = fs.readFile('mock');

describe('Horizontal Mirror Transformation', () => {
  it('takes in a buffer', () => {
    expect(() => mirror(bufferData).not.toThrow());
  });
  it('returns the same buffer modified', () => {
    let testData = fs.readFile('mock');
    mirror(testData);
    expect(testData.buffer).not.toEqual(bufferData.buffer);
    expect(testData.buffer).toBeInstanceOf(Buffer);
  });
  it('does not alter buffer if type is not `BM`', () => {
    let testData = fs.readFile('mock');
    testData.type = 'Wrong Type';
    mirror('testData');
    expect(testData.buffer).toEqual(bufferData.buffer);
  });
});