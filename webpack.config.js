var webpack = require('webpack')

module.exports = {
  entry: './app/index',
  output: {
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
          'react-hot',
          'babel'
        ]
      },
      {
        test: /\.css$/,
        include: /app/,
        loaders: [
          'style',
          'css?modules'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  devServer: {
    hot: true,
    port: 4000,
    inline: true,
    historyApiFallback: true
  }
}
