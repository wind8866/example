import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  input: './src/main.js',
  plugins: [
    commonjs()
  ],
  output: {
    dir: 'dist',
    format: 'esm'
  }
});