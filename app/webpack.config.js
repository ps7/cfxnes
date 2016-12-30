const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const ifDev = dev ? x => x : () => null;
const omitNulls = array => array.filter(x => x);
const dir = name => path.join(__dirname, name);

module.exports = {
  context: dir('src/client'),
  entry: {
    bundle: './index.js',
    vendor: [
      'react-hot-loader/patch',
      'react',
      'react-dom',
    ],
  },
  output: {
    path: dir('dist/static'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: omitNulls([
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new CopyWebpackPlugin([{from: 'index.html'}]),
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
