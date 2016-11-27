var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    resolve: {
        root: [".", "src/", "node_modules/"],
        extensions: ["", ".js", ".es6"],
        alias: {}
    },

    resolveLoader: {
        root: path.join(process.env.PWD, '/../node_modules/')
    },

    module: {
        loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015'
            },
            {
                test: /\.hbs$/,
                loader: "mustache"
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
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
        path: './public/',
        chunkFilename:  'webpack/[chunkhash].js',
        filename: "javascripts/[hash].js",
        publicPath: '/'
    },

    entry: {
        main: "./main"
    },

    stats: {
        modules: true,
        reasons: true,
        colors: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Sushi Bargain",
            template: './templates/main.ejs'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],

    context: path.join(__dirname, 'src'),
    debug: false
};
