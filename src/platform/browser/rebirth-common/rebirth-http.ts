import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Request, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
// import { RequestOptionsArgs, ConnectionBackend } from './interfaces';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/rx';

export interface RebirthHttpOption {
  mehtod: string;
  url: string | Request;
  body?: any;
  options?: RequestOptionsArgs;
}

export interface RebirthHttpInterceptor {
  request?: (option: RebirthHttpOption) => RebirthHttpOption;
  response?: (response: any) => any;
}

@Injectable()
export class RebirthHttpProvider {
  private interceptors: RebirthHttpInterceptor[];
  constructor() {
    this.interceptors = [];
  }

  getInterceptors() {
    return this.interceptors;
  }
}



@Injectable()
export class RebirthHttp {
  constructor(private http: Http, private rebirthHttpProvider: RebirthHttpProvider) {

  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response | any> {
    return this._proxy({ mehtod: 'request', url, options });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response | any> {
    return this._proxy({ mehtod: 'get', url, options });
  }

  post(url: string, body: any = {}, options?: RequestOptionsArgs): Observable<Response | any> {
    return this._proxy({ mehtod: 'post', url, body, options });
  }

  put(url: string, body: any = {}, options?: RequestOptionsArgs): Observable<Response | any> {
    return this._proxy({ mehtod: 'put', url, body, options });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response | any> {
    return this._proxy({ mehtod: 'delete', url, options });
  }

  patch(url: string, body: any = {}, options?: RequestOptionsArgs): Observable<Response | any> {
    return this._proxy({ mehtod: 'patch', url, body, options });
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response | any> {
    return this._proxy({ mehtod: 'head', url, options });
  }

  _proxy(options: RebirthHttpOption): Observable<Response | any> {
    let interceptors = this.rebirthHttpProvider.getInterceptors();
    let http = this.http;

    var request = interceptors
      .filter(item => !!item.request)
      .reduce((stream, item) => {
        return stream.map(req => {
          console.log('request map', req);
          return item.request(req);
        });
      }, Rx.Observable.of(options));

    var responseStream = request.flatMap(req => {
      let data = req.body ? [req.url, req.body, req.options] : [req.url, req.options];
      return <Observable<Response>>http[req.mehtod].apply(http, data);
    })

    return <Observable<Response>>interceptors
      .filter(item => !!item.response)
      .reverse()
      .reduce((stream, item) => {
        return stream.map(res => {
          console.log('response map', res);
          return item.response(res)
        });
      }, responseStream);
  }
}

const jsonProvider: RebirthHttpInterceptor = {
  request: (config) => {
    config.options = config.options || {};
    config.options.headers = config.options.headers || new Headers();
    config.options.headers.set('Content-Type', 'application/json');
    if (config.body) {
      config.body = JSON.stringify(config.body);
    }
    return config;
  },
  response: (response: Response) => response.json && response.json()

};

export const REBIRTH_HTTP_JSON_PROVIDERS = 'REBIRTH_HTTP_JSON_PROVIDERS';

export const REBIRTH_HTTP_PROVIDERS = [
  RebirthHttp,
  RebirthHttpProvider,
  { provide: 'REBIRTH_HTTP_JSON_PROVIDERS', useValue: jsonProvider }

];
