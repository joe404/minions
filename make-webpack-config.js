//ref: https://github.com/webpack/react-starter/blob/master/make-webpack-config.js

var path = require('path');
var webpack = require('webpack');
var StatsWebpackPlugin = require('stats-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
  var entry;
  if (options.devServer) {
    //ref: http://gaearon.github.io/react-hot-loader/getstarted/
    entry = [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      './client/app.jsx'
    ];
  } else {
    entry = {
      minions: './client/app.jsx'
    };
  }

  var output = {
    path: path.join(__dirname, 'build/public'),
    publicPath: (options.devServer ? 'http://localhost:8080/' : '/_assets/'),
    filename: '[name].js' + (options.longTermCaching ? '?[chunkhash]' : ''),
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching ? '?[chunkhash]' : ''),
    sourceMapFilename: '[file].map',
    pathinfo: options.debug
  };

  var jsLoaders = ['babel?presets[]=react,presets[]=es2015'];
  var jsxLoaders = [];
  if (options.devServer) jsxLoaders.push('react-hot');
  jsxLoaders.push('babel?presets[]=react,presets[]=es2015'); //ref: https://github.com/babel/babel-loader#options
  var loaders = [
    {
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'client')
      ],
      loaders: jsLoaders
    },
    {
      test: /\.jsx$/,
      include: [
        path.resolve(__dirname, 'client')
      ],
      loaders: jsxLoaders
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

  var excludeFromStats = [
    // /node_modules[\\\/]react(-router)?[\\\/]/
  ];
  var plugins = [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'client/index.html'
    }),
    new webpack.PrefetchPlugin('react'), //ref: http://stackoverflow.com/questions/32923085/how-to-optimize-webpacks-build-time-using-prefetchplugin-analyse-tool
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    new StatsWebpackPlugin('stats.json', { // analyse stats.json on http://webpack.github.io/analyse/#hints
      chunkModules: true,
      exclude: excludeFromStats
    })
  ];
  if(options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "")));
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

  return {
    entry: entry,
    output: output,
    module: {
      loaders: loaders
    },
    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },
    plugins: plugins,
    debug: options.debug,
    devtool: options.devtool,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  };
};

