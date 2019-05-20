'use strict';

const whiteout = require('../../lib/transforms/whiteout.js');
jest.mock('fs');
const fs = require('fs');

let bufferData = fs.readFile('mock');

describe('Whiteout Transformation', () => {
  it('takes in a buffer', () => {
    expect(() => whiteout(bufferData).not.toThrow());
  });
  it('returns the same buffer modified', () => {
    let testData = fs.readFile('mock');
    whiteout(testData);
    expect(testData.buffer).not.toEqual(bufferData.buffer);
    expect(testData.buffer).toBeInstanceOf(Buffer);
  });
  it('does not alter buffer if type is not `BM`', () => {
    let testData = fs.readFile('mock');
    testData.type = 'Wrong Type';
    whiteout('testData');
    expect(testData.buffer).toEqual(bufferData.buffer);
  });
});