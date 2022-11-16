import { defineConfig } from 'rollup'
import commonjsPlugin from '@rollup/plugin-commonjs'
import resolvePlugin from '@rollup/plugin-node-resolve'
import typescriptPlugin from '@rollup/plugin-typescript'
import replace from 'rollup-plugin-replace'
import babelPlugin from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
const env = process.env.NODE_ENV


if (process.env.prd) {
  console.log('生产环境')
} else {
  console.log('非生产环境')
}
const config = {
  input: './src/main.ts',
  external: ['lodash'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    typescriptPlugin(),
    babelPlugin({
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled'
    }),
    commonjsPlugin(),
    resolvePlugin(),
    // terser(),
  ],
  output: {
    globals: {
      lodash: 'lodash'
    },
    dir: 'dist',
    format: 'esm'
  }
}

if (env === 'local') {
  config.output.sourcemap = true
}

if (env === 'production') {
  config.plugins.push(terser())
}
export default defineConfig(config);

// process.env.NODE_ENV === 'production';