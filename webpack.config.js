const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({ title: 'Exploring GraphQL' })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
