import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config'

const options = {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(4000)
