const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './src/server.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  externals: [nodeExternals({
    whitelist: [
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
    ]
  })],
  node: {
    __dirname: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      }
    ]
  }
};
