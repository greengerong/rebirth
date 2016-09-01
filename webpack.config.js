// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./build/webpack.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./build/webpack.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./build/webpack.dev');
}
