var config = require("./webpack.dev");
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  hot: false,
  quiet: false,
  noInfo: false,
  inline: true,
  colors: true,
  historyApiFallback: true
});


server.listen(3000);
