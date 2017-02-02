const path = require('path')

const neatPaths = require('node-neat').includePaths

module.exports = {
  entry: {
    app: './client/app/main/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'client/build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      'domain-data$': path.resolve(__dirname, 'client/app/domain'),
      router$: path.resolve(__dirname, 'client/app/router'),
      components$: path.resolve(__dirname, 'client/app/ui/common'),
      util$: path.resolve(__dirname, 'client/app/util')
    }
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        exclude: /(node_modules|server|test)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {test: /\.scss$/, loader: "style!css!sass?includePaths[]=" + neatPaths}
    ]
  }
}
