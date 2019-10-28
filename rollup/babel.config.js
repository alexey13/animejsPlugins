import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

const def = [
  {
    input: './src/index.js',
    plugins: [
      babel({presets: ['@babel/preset-env']}),
      terser()
    ],
    output: {
      file: './dist/animejsPlugins-all.js',
      format: 'iife',
      name: 'animejsPlugins'
    }
  }
];

const pluginsFiles = {
  randomLetters: './src/randomLetters.js',
  imagesPlayer: './src/imagesPlayer.js',
  scrollContainer: './src/scrollContainer.js',
};

const rollupEach = Object.keys(pluginsFiles).map(name => {
  return {
    input: pluginsFiles[name],
    plugins: [
      babel({presets: ['@babel/preset-env']}),
      terser()
    ],
    output: {
      file: `./dist/animejsPlugins-${name}.js`,
      format: 'iife',
      name: `animejsPlugins`
    }
  }
});

export default def.concat(rollupEach);