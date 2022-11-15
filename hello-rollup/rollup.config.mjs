import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  input: './src/main.js',
  plugins: [
    commonjs(),
    resolve(),
  ],
  manualChunks: {
    lodash: ['lodash']
  },
  output: {
    dir: 'dist',
    format: 'esm'
  }
});