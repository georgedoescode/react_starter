const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    devServer: {
      contentBase: 'dist',
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin('dist'),
      new HtmlWebpackPlugin({
        template: './static/index.html'
      }),
      new CopyWebpackPlugin([
        { from: './static/favicon-32x32.png', to: './'}
      ])
    ]
  }
}