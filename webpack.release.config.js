var path = require('path');

module.exports = {
    entry: {
        'animater': './src/main',
    },

    output: {
        filename: '[name].js',
        // publicPath: path.normalize('./dist'),
        path: path.resolve(__dirname, './dist/'),
        library: 'Animater',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },

    module: {
        rules: [
            // Babel 转换 ES6
            {
                test: /(\.es6|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    }
};
