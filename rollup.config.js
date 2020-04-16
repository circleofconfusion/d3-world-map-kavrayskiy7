import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'iife',
    sourcemap: true
  },
  plugins: [ 
    resolve(),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/index.css', dest: 'dist' }
      ]
    }),
    terser()
  ]
};