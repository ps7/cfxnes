const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const ifDev = dev ? x => x : () => null;
const omitNulls = array => array.filter(x => x);
const dir = name => path.join(__dirname, name);

module.exports = {
  context: dir('src/client'),
  entry: [
    'react-hot-loader/patch',
    './index.js',
  ],
  output: {
    path: dir('dist/static'),
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
  },
  plugins: omitNulls([
    new CopyWebpackPlugin([
      {from: 'index.html'},
      {from: 'images/favicon.png'},
    ]),
    ifDev(new webpack.NamedModulesPlugin()),
  ]),
  performance: {
    hints: dev ? false : 'warning',
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
