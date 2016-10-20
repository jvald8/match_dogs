'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

console.log(__dirname)

module.exports = {
    entry: [
        './app/index.js'
    ],
    module: {
        loaders: [{test: /\.jsx?$/, include: __dirname + '/app', exclude: /node_modules/, loader: "babel"}]
    },
    output : {
        path: __dirname + '/public/dist/',
        filename: "index_bundle.js"
    },
    plugins: [HTMLWebpackPluginConfig]
}
