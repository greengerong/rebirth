import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export interface RebirthHttpInterceptor {
  request?: (option: RequestOptions) => RequestOptions | void;
  response?: (response: Observable<any>) => Observable<any> | void;
}
export declare class RebirthHttpProvider {
  private interceptors;
  constructor();
  getInterceptors(): RebirthHttpInterceptor[];
  addInterceptor(interceptor: RebirthHttpInterceptor): RebirthHttpProvider;
  handleRequest(req: RequestOptions): RequestOptions;
  handleResponse(res: Observable<any>): Observable<any>;
  baseUrl(host: string): RebirthHttpProvider;
  json(): RebirthHttpProvider;
}
export declare class RebirthHttp {
  protected http: Http;
  protected rebirthHttpProvider: RebirthHttpProvider;
  constructor(http: Http, rebirthHttpProvider: RebirthHttpProvider);
  protected getBaseUrl(): string;
  protected getDefaultHeaders(): Object;
  protected requestInterceptor(req: RequestOptions): RequestOptions | void;
  protected responseInterceptor(res: Observable<any>): Observable<any> | void;
}
export declare function BaseUrl(url: string): <TFunction extends Function>(target: TFunction) => TFunction;
export declare function DefaultHeaders(headers: any): <TFunction extends Function>(target: TFunction) => TFunction;
export declare var Path: (key: string) => (target: RebirthHttp, propertyKey: string | symbol, parameterIndex: number) => void;
export declare var Query: (key: string) => (target: RebirthHttp, propertyKey: string | symbol, parameterIndex: number) => void;
export declare var Body: (target: RebirthHttp, propertyKey: string | symbol, parameterIndex: number) => void;
export declare var Header: (key: string) => (target: RebirthHttp, propertyKey: string | symbol, parameterIndex: number) => void;
export declare function Headers(headersDef: any): (target: RebirthHttp, propertyKey: string, descriptor: any) => any;
export declare function Produces(producesDef: string): (target: RebirthHttp, propertyKey: string, descriptor: any) => any;
export declare var GET: (url: string) => (target: RebirthHttp, propertyKey: string, descriptor: any) => any;
export declare var POST: (url: string) => (target: RebirthHttp, propertyKey: string, descriptor: any) => any;
export declare var PUT: (url: string) => (target: RebirthHttp, propertyKey: string, descriptor: any) => any;
export declare var DELETE: (url: string) => (target: RebirthHttp, propertyKey: string, descriptor: any) => any;
export declare var HEAD: (url: string) => (target: RebirthHttp, propertyKey: string, descriptor: any) => any;
export declare const REBIRTH_HTTP_PROVIDERS: Array<any>;
