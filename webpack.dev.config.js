module.exports = {
    entry: {
        'animater': './src/main',
        'animater.spec': './spec/animater.spec',
        'ee.spec': './spec/ee.spec',
        'animater.benchmark': './benchmark/animater',
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
