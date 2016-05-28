var path = require('path');
var webpack = require('webpack');

module.exports = {

    resolve: {
        root: ["src/", "node_modules/"],
        extensions: ["", ".js", ".es6"],
        alias: {}
    },

    resolveLoader: {
        root: path.join(process.env.PWD, 'node_modules/')
    },

    module: {
        loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015'
            }
        ]
    },

    progress: true,
    failOnError: true,
    keepalive: false,
    inline: true,
    watch: false,
    hot: false,

    output: {
        path: '/tmp',
        filename: "[name].js",
    },

    entry: {
        test: "./src/test"
    },

    stats: {
        modules: true,
        reasons: true,
        colors: true
    },

    context: '.',
    debug: false
};
