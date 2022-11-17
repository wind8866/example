import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import replace from 'rollup-plugin-replace'
import babel from '@rollup/plugin-babel'
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
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: '**/node_modules/**'
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    // terser(),
  ],
  output: {
    globals: {
      lodash: 'lodash'
    },
    file: 'dist/bundle.js',
    // dir: 'dist',
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