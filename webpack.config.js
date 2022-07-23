/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  // mode: 'development',
  mode: 'production',
  // mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) => `<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>${htmlWebpackPlugin.options.title}</title></head><body><div id=\"app\"></div></body></html>`,
      filename: 'index.html',
    }),
  ],
};

module.exports = config;
