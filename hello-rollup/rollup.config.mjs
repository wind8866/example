import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import rollupTypescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'

export default defineConfig({
  input: './src/main.js',
  plugins: [
    // rollupTypescript(),
    babel({
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled'
    }),
    commonjs(),
    resolve(),
  ],
  output: {
    manualChunks: {
      lodash: ['lodash'],
    },
    dir: 'dist',
    format: 'esm'
  }
});