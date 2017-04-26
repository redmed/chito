module.exports = {
    entry: {
        'animator': './src/main',
        'animator.spec': './spec/animator.spec'
    },

    output: {
        filename: '[name].js',
        publicPath: '/dist'
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
