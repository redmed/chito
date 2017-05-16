var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'animater': './src/main',
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './'),
        library: 'Animater',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },

    module: {
        rules: [
            {
                test: /(\.es6|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: true
        }),
    ]
};