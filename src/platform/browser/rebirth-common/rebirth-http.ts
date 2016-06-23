import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Headers as ngHeaders, URLSearchParams, Request, Response, RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface RebirthHttpInterceptor {
  request?: (option: RequestOptions) => RequestOptions | void;
  response?: (response: Observable<any>) => Observable<any> | void;
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

  handleRequest(req: RequestOptions): RequestOptions {
    return this.interceptors
      .filter(item => !!item.request)
      .reduce((req, item) => {
        return <RequestOptions>(item.request(req) || req);
      }, req);
  }

  handleResponse(res: Observable<any>): Observable<any> {
    return this.interceptors
      .filter(item => !!item.response)
      .reverse()
      .reduce((stream, item) => {
        return <Observable<any>>(item.response(stream) || res);
      }, res);
  }

  base(host: string): RebirthHttpInterceptor {
    this.interceptors.push({
      request: (request: RequestOptions): void => {
        if (!/^https?:/.test(request.url)) {
          host = host.replace(/\/$/, "");
          let url = request.url.replace(/^\//, "");
          request.url = `${host}/${url}`;
        }
      }
    });

    return this;
  }

  json(): RebirthHttpInterceptor {
    this.interceptors.push({
      request: (request: RequestOptions): void => {
        request.headers = request.headers || new ngHeaders();
        request.headers.set('Content-Type', 'application/json');
        request.headers.set('Accept', 'application/json, text/javascript, */*;');

        if (request.body) {
          request.body = JSON.stringify(request.body);
        }
      },
      response: (response: Observable<any>): Observable<any> => {
        return response.map(res => {
          let type = res.headers.get('content-type');
          if (type.indexOf('json') !== -1) {
            return res.json && res.json()
          }
        })
      }
    });
    return this;
  }
}

export class RebirthHttp {

  constructor( @Inject(Http) protected http: Http,
    @Inject(RebirthHttpProvider) @Optional() protected rebirthHttpProvider: RebirthHttpProvider) {
  }

  protected getBaseUrl(): string {
    return '';
  };

  protected getDefaultHeaders(): Object {
    return null;
  };

  protected requestInterceptor(req: RequestOptions): RequestOptions | void {
    if (this.rebirthHttpProvider) {
      return this.rebirthHttpProvider.handleRequest(req);
    }
    return req;
  }

  protected responseInterceptor(res: Observable<any>): Observable<any> | void {
    if (this.rebirthHttpProvider) {
      return this.rebirthHttpProvider.handleResponse(res);
    }

    return res;
  }

}

export function BaseUrl(url: string) {
  return function <TFunction extends Function>(target: TFunction): TFunction {
    target.prototype.getBaseUrl = function () {
      return url;
    };
    return target;
  };
}

export function DefaultHeaders(headers: any) {
  return function <TFunction extends Function>(target: TFunction): TFunction {
    target.prototype.getDefaultHeaders = function () {
      return headers;
    };
    return target;
  };
}

function paramBuilder(paramName: string) {
  return function (key: string) {
    return function (target: RebirthHttp, propertyKey: string | symbol, parameterIndex: number) {
      let metadataKey = `${propertyKey}_${paramName}_parameters`;
      let paramObj: any = {
        key: key,
        parameterIndex: parameterIndex
      };
      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}

export var Path = paramBuilder("Path");

export var Query = paramBuilder("Query");

export var Body = paramBuilder("Body")("Body");

export var Header = paramBuilder("Header");

export function Headers(headersDef: any) {
  return function (target: RebirthHttp, propertyKey: string, descriptor: any) {
    descriptor.headers = headersDef;
    return descriptor;
  };
}

export function Produces(producesDef: string) {
  return function (target: RebirthHttp, propertyKey: string, descriptor: any) {
    descriptor.enableJson = producesDef.toLocaleLowerCase() === 'json';
    return descriptor;
  };
}


function methodBuilder(method: number) {
  return function (url: string) {
    return function (target: RebirthHttp, propertyKey: string, descriptor: any) {

      let pPath = target[`${propertyKey}_Path_parameters`];
      let pQuery = target[`${propertyKey}_Query_parameters`];
      let pBody = target[`${propertyKey}_Body_parameters`];
      let pHeader = target[`${propertyKey}_Header_parameters`];

      descriptor.value = function (...args: any[]) {

        // Body
        let body = null;
        if (pBody) {
          let reqBody = args[pBody[0].parameterIndex];
          body = descriptor.enableJson ? JSON.stringify(reqBody) : reqBody;
        }

        // Path
        let resUrl: string = url;
        if (pPath) {
          for (var k in pPath) {
            if (pPath.hasOwnProperty(k)) {
              resUrl = resUrl.replace("{" + pPath[k].key + "}", args[pPath[k].parameterIndex]);
            }
          }
        }

        // Query
        let search = new URLSearchParams();
        if (pQuery) {
          pQuery
            .filter(p => args[p.parameterIndex]) // filter out optional parameters
            .forEach(p => {
              let key = p.key;
              let value = args[p.parameterIndex];
              // if the value is a instance of Object, we stringify it
              if (value instanceof Object) {
                value = JSON.stringify(value);
              }
              search.set(encodeURIComponent(key), encodeURIComponent(value));
            });
        }

        // Headers
        // set class default headers
        let headers = new ngHeaders(this.getDefaultHeaders());
        // set method specific headers
        for (let k in descriptor.headers) {
          if (descriptor.headers.hasOwnProperty(k)) {
            headers.append(k, descriptor.headers[k]);
          }
        }

        if (pHeader) {
          for (let k in pHeader) {
            if (pHeader.hasOwnProperty(k)) {
              headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
            }
          }
        }

        let options = new RequestOptions({
          method,
          url: (this.getBaseUrl() || '') + resUrl,
          headers,
          body,
          search
        });

        options = this.requestInterceptor(options) || options;
        let observable: Observable<Response> = this.http.request(new Request(options));

        if (descriptor.enableJson) { //@Produces
          observable = observable.map(res => res.json());
        }
        return this.responseInterceptor(observable) || observable;
      };

      return descriptor;
    };
  };
}

export var GET = methodBuilder(RequestMethod.Get);

export var POST = methodBuilder(RequestMethod.Post);

export var PUT = methodBuilder(RequestMethod.Put);

export var DELETE = methodBuilder(RequestMethod.Delete);

export var HEAD = methodBuilder(RequestMethod.Head);

export const REBIRTH_HTTP_PROVIDERS = [
  RebirthHttpProvider
];
