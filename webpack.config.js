var webpack = require('webpack');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './',
    filename: 'security-embedded.js'
  },
  devServer: {
    inline: true,
    port: 1111
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      beautify: true,
      comments: false,
      mangle: false,
      compress: {
          warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "stage-0"]
        }
      }
    ]
  }
}
