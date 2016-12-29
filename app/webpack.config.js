module.exports = {
  entry: './src/client/index.js',
  output: {
    path: './dist/static',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
