import babel from 'rollup-plugin-babel';

export default {
  input: './src/index.js',
  plugins: [
    babel({presets: ['@babel/preset-env']})
  ],
  output: {
    file: './dist/babel.js',
    format: 'iife',
    name: 'animePlugins'
  }
};