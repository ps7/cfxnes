const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src/client'),
  entry: [
    './index.html',
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'app.js',
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  performance: {
    hints: false,
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
