var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'chito': './src/main',
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './'),
        library: 'Chito',
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

};
