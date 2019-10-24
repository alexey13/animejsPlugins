import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: './src/index.js',
  plugins: [
    babel({presets: ['@babel/preset-env']}),
    terser()
  ],
  output: {
    file: './dist/animejsPlugins.min.js',
    format: 'iife',
    name: 'animejsPlugins'
  }
};