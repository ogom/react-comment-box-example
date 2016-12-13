var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:4000/',
    'webpack/hot/dev-server',
    path.join(__dirname, './app/index')
  ],
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: 'http://localhost:4000/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /app/,
        loaders: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader'
        ]
      }
    ]
  },
  target: 'electron'
}
