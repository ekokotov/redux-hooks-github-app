import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import {terser} from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const getRollupConfigForEntry = (intFile, outFile) => ({
  input: intFile,
  output: {
    file: outFile,
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true
  },
  plugins: [
    progress(),
    nodeResolve({
      browser: true,
      extensions: ['.js', '.jsx', '.json'],
    }),
    json(),
    commonjs({
      include: [
        'node_modules/**',
      ],
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement', 'useLayoutEffect', 'useEffect', 'useMemo', 'useRef', 'useContext', 'useReducer', 'Fragment'],
        'node_modules/react-dom/index.js': ['render', 'unstable_batchedUpdates'],
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer']
      },
    }),
    babel({
      babelrc: false,
      plugins: [["@babel/plugin-proposal-class-properties", {"loose": true}]],
      presets: [
        "@babel/preset-react",
      ]
    }),
    // visualizer(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    production && terser() // minify, but only in production
  ],
});

export default [
  getRollupConfigForEntry('src/redux/index.jsx', 'public/bundle-redux.js'),
  getRollupConfigForEntry('src/hooks/index.jsx', 'public/bundle-hooks.js')
];
