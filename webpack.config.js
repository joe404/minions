var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + "/src",
  entry: "./app",
  output: {
    path: __dirname + "/build",
    filename: "minions.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: "./build"
  }
}
