const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

   entry: './src/index.tsx',

   output: {
      path: path.resolve(__dirname, '../server/static'),
      filename: 'bundle.js'
   },

   devtool: 'eval-source-map',

   devServer: {historyApiFallback: true},

   resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
   },

   module: {
      loaders: [
         {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
         // {test: /\.tsx?$/, loader: 'ts-loader'},
         {test: /\.css$/, loader: 'style-loader!css-loader'},
         {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
      ]
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: 'src/index.html',
         hash: true
      }),
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
   ]

};
