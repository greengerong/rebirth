var stubby = require('gulp-stubby-server'),
  path = require('path');

const options = {
  callback: function (server, options) {
    // console.log(server.endpoints.db);
  },
  stubs: 8000,
  tls: 8443,
  admin: 8010,
  quiet: false,
  relativeFilesPath: true,
  files: [
    path.join(__dirname, '../mocks/**/*.{yaml,js}')
  ]
};

stubby(options, function (error) {
  if (!error) {
    return console.log("Server start at: 'http://localhost:8000");
  }

  console.log("******Mock server get error******", error);
});
