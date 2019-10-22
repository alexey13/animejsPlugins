export default {
  input: './src/index.js',
  output: {
    exports: 'named',
    file: './dist/new.js',
    format: 'iife',
    name: 'animePlugins'
  }
};