'use strict';

const unfrownify = require('../../lib/transforms/unfrownify.js');
jest.mock('fs');
const fs = require('fs');

let bufferData = fs.readFile('mock');

describe('Unfrownify Transformation', () => {
  it('takes in a buffer', () => {
    expect(() => unfrownify(bufferData).not.toThrow());
  });
  it('returns the same buffer modified', () => {
    let testData = fs.readFile('mock');
    unfrownify(testData);
    expect(testData.buffer).not.toEqual(bufferData.buffer);
    expect(testData.buffer).toBeInstanceOf(Buffer);
  });
  it('does not alter buffer if type is not `BM`', () => {
    let testData = fs.readFile('mock');
    testData.type = 'Wrong Type';
    unfrownify('testData');
    expect(testData.buffer).toEqual(bufferData.buffer);
  });
});