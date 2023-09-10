const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap.js"
      },
      shared: [
        "react", 
        "react-dom"
      ]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);