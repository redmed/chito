var path = require('path');

module.exports = {
    entry: {
        'chito': './index',
        'chito.core': './index.core'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
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
    }
};
