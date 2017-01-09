/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const lib = require('./tools/lib');

const dev = process.env.NODE_ENV === 'development';
const ifDev = dev ? x => x : () => null;
const omitNulls = array => array.filter(x => x);
const resolvePath = (...args) => path.resolve(__dirname, ...args);

module.exports = {
  context: resolvePath('src/client'),
  entry: [
    'react-hot-loader/patch',
    'whatwg-fetch',
    './index.js',
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
      {
        test: /\.svg$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      cfxnes: lib.getFiles({includeDebug: dev}).main,
    },
  },
  plugins: omitNulls([
    new webpack.IgnorePlugin(/^fs$/), // cfxnes.debug.js contains unused required('fs') call
    new CopyWebpackPlugin([
      {from: 'index.html'},
      {from: 'images/favicon.png'},
    ]),
    ifDev(new webpack.NamedModulesPlugin()),
  ]),
  performance: {
    hints: false,
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
