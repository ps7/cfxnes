/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lib = require('./tools/lib');

const development = process.env.NODE_ENV === 'development';
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
      {
        test: /\.css$/,
        use: development ? [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ] : undefined,
        loader: !development ? ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?importLoaders=1',
            'postcss-loader',
          ],
        }) : undefined,
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)(\?\S*)?$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      cfxnes: lib.getFiles({includeDebug: development}).main,
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/^fs$/), // cfxnes.debug.js contains unused required('fs') call
    new CopyPlugin([
      {from: 'index.html'},
      {from: 'images/favicon.png'},
    ]),
  ].concat(development ? [
    new webpack.NamedModulesPlugin(),
  ] : [
    new ExtractTextPlugin({filename: 'bundle.css'}),
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
