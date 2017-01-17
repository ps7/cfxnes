/* eslint-env node */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {stdout, env} = process;
const DEVELOPMENT = env.NODE_ENV === 'development';
const resolvePath = (...args) => path.resolve(__dirname, ...args);

module.exports = {
  context: resolvePath('src/client'),
  entry: [
    'react-hot-loader/patch',
    'whatwg-fetch',
    './index.js',
    './styles/index.css',
  ],
  output: {
    path: resolvePath('dist/static'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      merge({
        common: {
          test: /\.css$/,
        },
        production: {
          loader: ExtractTextPlugin.extract([
            'css-loader?importLoaders=1',
            'postcss-loader',
          ]),
        },
        development: {
          use: [
            'style-loader',
            'css-loader?importLoaders=1',
            'postcss-loader',
          ],
        },
      }),
      {
        test: /\.(svg|woff|woff2|eot|ttf)(\?\S*)?$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      cfxnes: findCfxnes(),
    },
  },
  plugins: merge({
    common: [
      new webpack.DefinePlugin({
        __DEVELOPMENT__: JSON.stringify(DEVELOPMENT),
        __LOG_LEVEL__: JSON.stringify(merge({production: 'warn', development: 'info'})),
      }),
      new webpack.IgnorePlugin(/^fs$/), // cfxnes.debug.js contains unused required('fs') call
      new CopyPlugin([
        {from: 'index.html'},
        {from: 'images/favicon.png'},
      ]),
    ],
    production: [
      new ExtractTextPlugin({filename: 'bundle.css'}),
    ],
    development: [
      new webpack.NamedModulesPlugin(),
    ],
  }),
  performance: {
    hints: false,
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};

function merge(params) {
  const {common} = params;
  const enviromental = params[env.NODE_ENV];
  const any = Object.values(params).filter(p => p)[0];
  if (Array.isArray(any)) {
    return (common || []).concat(enviromental || []);
  }
  if (typeof any === 'object') {
    return Object.assign({}, common || {}, enviromental || {});
  }
  return enviromental || common;
}

function findCfxnes() {
  stdout.write('\n********************************************************************************\n');
  stdout.write('Looking for cfxnes library files...\n\n');

  const cfxnes = [
    {name: 'cfxnes.debug.js', debug: true},
    {name: 'cfxnes.js', debug: false},
  ]
  .filter(({debug}) => DEVELOPMENT || !debug)
  .map(({name}) => {
    const file = resolvePath('../lib/dist', name);
    const exists = fs.existsSync(file);
    stdout.write(`[${(exists ? '\u2713' : '\u2717')}] ${file}\n`);
    return {file, exists};
  })
  .filter(({exists}) => exists)
  .map(({file}) => file)[0];

  stdout.write('\n');
  stdout.write(cfxnes ? `Using ${path.basename(cfxnes)}` : 'Found none :(');
  stdout.write('\n********************************************************************************\n\n');

  return cfxnes;
}
