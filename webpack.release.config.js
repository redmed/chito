var path = require('path');

module.exports = {
    entry: {
        'animator': './src/main',
    },

    output: {
        filename: '[name].js',
        // publicPath: path.normalize('./dist'),
        path: path.resolve(__dirname, './dist/'),
        library: 'Animator',
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
