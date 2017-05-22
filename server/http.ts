import express = require('express');

import cookieParser = require('cookie-parser');

import url = require('url');

import {dist, index} from './paths';

export const configure = (http: express.Application): void => {
  http.use(express.static(dist, {index}));

  http.use(require('express-blank-favicon'));

  http.use(cookieParser());
};

export const listen = (http: express.Application): Promise<number> => {
  const port = process.env.PORT || 9090;

  return new Promise<number>((resolve, reject) => {
    http.listen(port, err => {
      if (err) {
        reject(err);
      }
      else {
        resolve(port);
      }
    })
  });
}

export const absoluteUri = (request: express.Request): string => {
  return url.format({
    protocol: request.protocol,
    host: request.get('host'),
    pathname: request.originalUrl
  });
};
