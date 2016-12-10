var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var cssnano = require('cssnano')
var nested = require('postcss-nested')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var nodeExternals = require('webpack-node-externals');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  postcss: function () {
      return [precss, nested, autoprefixer]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      },
      { test: /\.css/, loader: "style-loader!css-loader" }
    ]
  }
};