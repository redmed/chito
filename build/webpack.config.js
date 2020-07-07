const path = require('path');
const process = require('process');

module.exports = {
  // mode: 'development',
  entry: {
    // 'chito': './index',
    // 'chito.core': './index.core',
    'chito': './src/entry/index',
    'chito.core': './src/entry/index.core',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), './dist'),
    library: 'Chito',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
