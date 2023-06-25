const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
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
          'style-loader', //inject styles into dom
          'css-loader',  // turns css into commonjs
          'sass-loader' // turns sass into css
        ],
      }
    ]
  }
});
