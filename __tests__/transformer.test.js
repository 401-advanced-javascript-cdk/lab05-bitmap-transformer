'use strict';

const transformer = require('../lib/transformer.js');

// process.argv.push('./assets/baldy.bmp');
// process.argv.push('greyscale');

let args = ['node', 'jest', './assets/baldy.bmp', 'greyscale'];

describe('transformer', () => {
  it('fails without two arguments', () => {
    expect( () => transformer()).toThrow();
  });
  it('takes 2 arguments on the command line', () => {
    expect( () => transformer(args.slice(2)) ).not.toThrow();
  });
  
});