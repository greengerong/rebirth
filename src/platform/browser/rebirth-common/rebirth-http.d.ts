import { Http, Request, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export interface RebirthHttpOption {
    mehtod: string;
    url: string | Request;
    body?: any;
    options?: RequestOptionsArgs;
}
export interface RebirthHttpInterceptor {
    request?: (option: RebirthHttpOption) => RebirthHttpOption | void;
    response?: (response: any) => any | void;
    error?: (error: any) => any | void;
}
export declare class RebirthHttpProvider {
    private interceptors;
    constructor();
    getInterceptors(): RebirthHttpInterceptor[];
}
export declare class RebirthHttp {
    private http;
    private rebirthHttpProvider;
    constructor(http: Http, rebirthHttpProvider: RebirthHttpProvider);
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response | any>;
    get(url: string, options?: RequestOptionsArgs): Observable<Response | any>;
    post(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response | any>;
    put(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response | any>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response | any>;
    patch(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response | any>;
    head(url: string, options?: RequestOptionsArgs): Observable<Response | any>;
    _proxy(options: RebirthHttpOption): Observable<Response | any>;
}
export declare const REBIRTH_HTTP_JSON_PROVIDERS: string;
export declare const REBIRTH_HTTP_PROVIDERS: (typeof RebirthHttp | typeof RebirthHttpProvider | {
    provide: string;
    useValue: RebirthHttpInterceptor;
})[];
