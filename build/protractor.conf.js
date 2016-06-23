

require('ts-node/register');
var utils = require('./utils');

exports.config = {
  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    utils.root('src/**/**.e2e.ts'),
    utils.root('src/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function () {
    browser.ignoreSynchronization = true;
  },

  useAllAngular2AppRoots: true
};
