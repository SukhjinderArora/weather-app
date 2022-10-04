const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ['./src/js/index.js', './src/styles/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[name].[ext]',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            sources: {
              list: [
                '...',
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                },
                { tag: 'object', attribute: 'data', type: 'src' },
                { tag: 'link', attribute: 'href', type: 'src' },
                { tag: 'a', attribute: 'href', type: 'src' },
              ],
            },
            minimize: !devMode,
          },
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devtool: devMode ? 'eval-source-map' : false,
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new Dotenv(),
  ],
};
