module.exports = [
  require('./make-webpack-config')({
    //commonsChunk: true,
    longTermCaching: true,
    minimize: true,
    devtool: 'source-map'
  })
];
