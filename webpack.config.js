var path = require("path");
var webpack = require("webpack");
var merge = require('webpack-merge');

var libraryName = "efficiently";

const TARGET = process.env.npm_lifecycle_event;
console.log("target event is " + TARGET);

var common = {
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    root: [path.resolve('./src')],
    extensions: ['', '.js', '.jsx']
  }
}

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    resolve: {
      root: [
        path.resolve('./src'),
        path.resolve('./app')
      ]
    }
  })
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(common, {
    entry: {
      app: './src/framework/root.jsx',
      vendor: [
        'react',
        'react-bootstrap',
        'react-redux',
        'redux',
        'immutable',
        'redux-form',
        'redux-logger',
        'seamless-immutable',
      ]
    },
    devtool: 'source-map',
    output: {
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
  })
}
