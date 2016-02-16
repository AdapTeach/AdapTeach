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
