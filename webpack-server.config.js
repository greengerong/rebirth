const {join, resolve} = require('path');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";

const postcssPlugins = function () {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
    autoprefixer: false,
    safe: true,
    mergeLonghand: false,
    discardComments: {remove: (comment) => !importantCommentRe.test(comment)}
  };
  return [
    postcssUrl({
      url: (URL) => {
        // Only convert root relative URLs, which CSS-Loader won't process into require().
        if (!URL.startsWith('/') || URL.startsWith('//')) {
          return URL;
        }
        if (deployUrl.match(/:\/\//)) {
          // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
          return `${deployUrl.replace(/\/$/, '')}${URL}`;
        }
        else if (baseHref.match(/:\/\//)) {
          // If baseHref contains a scheme, include it as is.
          return baseHref.replace(/\/$/, '') +
            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
        }
        else {
          // Join together base-href, deploy-url and the original URL.
          // Also dedupe multiple slashes into single ones.
          return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
        }
      }
    }),
    autoprefixer(),
  ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

module.exports = {
  target: 'node',
  entry: {
    server: ['./server/index.ts'],
  },
  output: {
    "path": join(process.cwd(), "dist-server"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js",
    libraryTarget: 'commonjs2',
  },
  "resolve": {
    "extensions": [
      ".ts",
      ".js",
      ".json"
    ],
    "modules": [
      "./node_modules"
    ]
  },
  module: {
    rules: [
      {
        "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader', 'angular-router-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },
      {
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
    ]
  },
  plugins: [],
  externals: [
    '@angular/animations',
    '@angular/cli',
    '@angular/common',
    '@angular/compiler',
    '@angular/compiler-cli',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/router',
    '@angular/tsc-wrapped',
    '@angular/service-worker',
    'angular-ssr',
    'express',
    function (context, request, callback) {
      const exclusions = [/\@ngrx/, /rxjs/, /zone\.js/, /reflect-metadata/];

      if (exclusions.some(expr => expr.test(request))) {
        callback(null, `commonjs ${request.replace(/^.*?(\\|\/)node_modules(\\|\/)/, String())}`);
      }
      else {
        callback();
      }
    },
  ],
  node: {
    process: true,
    __dirname: true,
    __filename: true
  }
};
