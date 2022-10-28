module.exports = [
  {
    input: 'src/index.js',
    output: {
      name: 'markedBidi',
      file: 'lib/index.umd.js',
      format: 'umd'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs'
    }
  }
];
