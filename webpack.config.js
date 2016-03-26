const path = require('path')

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
    alias: {
      'domain-data$': path.resolve(__dirname, 'client/app/domain'),
      navigation$: path.resolve(__dirname, 'client/app/navigation'),
      router$: path.resolve(__dirname, 'client/app/router'),
      components$: path.resolve(__dirname, 'client/app/ui/common/components'),
      store$: path.resolve(__dirname, 'client/app/main/store'),
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
      }
    ]
  }
}
