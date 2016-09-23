'use strict';

const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "app/index.jsx",
    output: {
        path: __dirname,
        filename: "dist/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx?$/,exclude: 'node_modules/', loader: "babel", query:{ presets: ['react','es2015']}}
        ]
    },
    plugins: [new HtmlPlugin({
        title: 'CustomTitle',
        template: 'index.html',
        inject: 'body'
    })]
};
