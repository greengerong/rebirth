import config from "./webpack.dev";
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
	hot: true,
	quiet: false,
	noInfo: false
});


server.listen(5000);