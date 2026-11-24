import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'markedGfmHeadingId',
      file: 'lib/index.umd.js',
      format: 'umd',
    },
    plugins: [nodeResolve()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs',
    },
    plugins: [
      nodeResolve(),
      copy({
        targets: [{ src: 'src/index.d.ts', dest: 'lib', rename: 'index.d.cts' }],
      }),
    ],
  },
];
