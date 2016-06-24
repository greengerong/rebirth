
const envConfig = {
  prod: './config/webpack.prod',
  production: './config/webpack.prod',

  test: './config/webpack.test.prod',
  testing: '../config/webpack.test.prod',

  dev: './config/webpack.dev.prod',
  development: './config/webpack.dev'
};


module.exports = envConfig[process.env.NODE_ENV];
