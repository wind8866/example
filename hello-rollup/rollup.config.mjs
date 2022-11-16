import { defineConfig } from 'rollup'
import commonjsPlugin from '@rollup/plugin-commonjs'
import resolvePlugin from '@rollup/plugin-node-resolve'
import typescriptPlugin from '@rollup/plugin-typescript'
import babelPlugin from '@rollup/plugin-babel'

export default defineConfig({
  input: './src/main.ts',
  external: ['lodash'],
  plugins: [
    typescriptPlugin(),
    babelPlugin({
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled'
    }),
    commonjsPlugin(),
    resolvePlugin(),
  ],
  output: {
    globals: {
      lodash: 'lodash'
    },
    dir: 'dist',
    format: 'esm'
  }
});