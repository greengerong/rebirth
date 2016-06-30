import gulp from 'gulp';
import stubby from 'gulp-stubby-server';
import path from 'path';
import del from  'del';
import install from 'gulp-install';
import gulpTypings from 'gulp-typings';
import typedoc from 'gulp-typedoc';
import karma from 'karma';
import tslint from "gulp-tslint";
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import map from 'map-stream';
import concat from 'gulp-concat';

let browserSyncServer = browserSync.create();

let files = [
  path.join(__dirname, './mocks/**/*.{yaml,js}')
];

gulp.task('install:npm', () => {
  return gulp.src(['./package.json'])
    .pipe(install());
});


gulp.task("install:typings", function () {
  return gulp.src("./typings.json")
    .pipe(gulpTypings());
});


gulp.task('mock', (cb) => {
  const options = {
    callback: (server, options) => {
      server.get(1, function (err, endpoint) {
        if (!err)
          console.log(endpoint);
      });
    },
    stubs: 8000,
    tls: 8443,
    admin: 8010,
    relativeFilesPath: true,
    files
  };

  stubby(options, cb);
});

gulp.task('clean:dist', () => {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('clean:all', ['clean:dist'], () => {
  return del([
    'doc/**/*',
    'typings/**/*',
    'coverage/**/*'
  ]);
});

// issue
gulp.task('docs', function () {
  return gulp
    .src(['./src/**/*.ts', '!./src/**/!(*.spec.ts)'])
    .pipe(typedoc({
      "name": "rebirth",
      "mode": "modules",
      "out": "doc",
      "theme": "default",
      "ignoreCompilerErrors": "true",
      "experimentalDecorators": "true",
      "emitDecoratorMetadata": "true",
      "target": "ES5",
      "moduleResolution": "node",
      "preserveConstEnums": "true",
      "stripInternal": "true",
      "suppressExcessPropertyErrors": "true",
      "suppressImplicitAnyIndexErrors": "true",
      "module": "commonjs"
    }));
});


gulp.task('webpack:dev', ['clean:dist'], () => {
  return gulp.src(['src/**/*.js', 'src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(webpackStream(require("./build/webpack.dev.js")))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack:prod', ['clean:dist'], () => {
  let prodConfig = Object.create(require("./build/webpack.prod.js"));
  prodConfig.progress = true;
  return gulp.src(['src/**/*.js', 'src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(webpackStream(prodConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task("dev", ['mock'], () => {
  var devConfig = Object.create(require("./build/webpack.dev.js"));
  return new WebpackDevServer(webpack(devConfig), {
    stats: {
      colors: true
    }
  }).listen(3000, "localhost", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:3000/");
  });
});

gulp.task("tslint", () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({configuration: "./tslint.json", e}))
    .pipe(map(function (file, done) {
      file.contents = new Buffer("");
      if (file.tslint.output) {
        var text = JSON.parse(file.tslint.output)
          .map(tslint.proseErrorFormat)
          .join("\n");

        if (text) {
          gutil.log(text);
          file.contents = new Buffer(text);
        }
      }

      done(null, file);
    }))
    .pipe(concat("tslint-report.txt"))
    .pipe(gulp.dest("./tslint"));
  ;
});

gulp.task('karma:debug', (cb) => {
  new karma.Server({
    configFile: __dirname + '/build/karma.conf.js',
    singleRun: false,
    autoWatch: true,
    browsers: ['Chrome']
  }, cb).start();
});

gulp.task('karma', (cb) => {
  new karma.Server({
    configFile: __dirname + '/build/karma.conf.js',
    singleRun: true
  }, cb).start();
});

gulp.task('serve:prod', () => {
  browserSyncServer.init({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('install', ['install:npm', 'install:typings']);
gulp.task('clean:install', ['clean:all', 'install']);
gulp.task('test', ['tslint', 'karma']);
gulp.task('build:dev', ['webpack:dev']);
gulp.task('build', ['webpack:prod']); //'test'
gulp.task('prod', function (cb) {
  runSequence('build', 'serve:prod', cb);
});

gulp.task('default', ['build']);
