var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    app: './framework/root.jsx',
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
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
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
    extensions: ['', '.js', '.jsx']
  }
}
