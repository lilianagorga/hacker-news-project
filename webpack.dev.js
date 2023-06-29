const { resolve } = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
    }),
    new Dotenv({
      path: './.env.dev',
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader',  
          'sass-loader' 
        ],
      }
    ]
  }
});
