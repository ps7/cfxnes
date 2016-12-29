module.exports = {
  entry: [
    './src/client/index.html',
    './src/client/index.js',
  ],
  output: {
    path: './dist/static',
    filename: 'js/app.js',
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
        loader: 'babel-loader',
      },
    ],
  },
};
