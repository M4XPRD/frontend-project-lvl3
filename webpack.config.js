const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  // mode: 'development',
  // mode: 'production',
  // mode: 'none',
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
