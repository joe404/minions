//ref: https://github.com/webpack/react-starter/blob/master/make-webpack-config.js

var path = require('path');
var webpack = require('webpack');
var StatsWebpackPlugin = require('stats-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
  var loaders = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'url-loader?limit=8192'
    },
    {
      test: /\.(woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    },
    {
      test: /\.(ttf|eot)$/,
      loader: 'file'
    },
    {
      test: /\.css$/,
      //loader: options.minimize ? "css-loader?module" : "css-loader?module&localIdentName=[path][name]---[local]---[hash:base64:5]"
      loader: 'style-loader!css-loader'
    }
  ];

  var excludeFromStats =  [
        /node_modules[\\\/]react(-router)?[\\\/]/
  ];
  var plugins = [
    /*
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    new StatsWebpackPlugin('stats.json', {
      chunkModules: true,
      exclude: excludeFromStats
    }),
    */
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    })
  ];
  if (options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js' + (options.longTermCaching ? '?[chunkhash]' : '')));
  }
  if (options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }
  console.log(plugins);

  return {
    context: path.join(__dirname, 'src'),
    entry: {
      minions: './app'
    },
    output: {
      path: path.join(__dirname, 'build', 'public'),
      //publicPath: options.devServer ? 'http://localhost:8080/' : '/_assets/';
      //filename: '[name].js' + (options.longTermCaching ? '?[chunkhash]' : '') + '.js',
      filename: '[name]' + (options.longTermCaching ? '.[chunkhash]' : '') + '.js',
      //chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching ? '?[chunkhash]' : ''),
      sourceMapFilename: 'debug/[file].map',
      pathinfo: options.debug
    },
    module: {
      loaders: loaders
    },
    plugins: plugins,
    debug: options.debug,
    devtool: options.devtool,
    devServer: {
      host: "0.0.0.0",
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  };
};
