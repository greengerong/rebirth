"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var RebirthHttpProvider = (function () {
    function RebirthHttpProvider() {
        this.interceptors = [];
    }
    RebirthHttpProvider.prototype.getInterceptors = function () {
        return this.interceptors;
    };
    RebirthHttpProvider.prototype.addInterceptor = function (interceptor) {
        this.interceptors.push(interceptor);
        return this;
    };
    RebirthHttpProvider.prototype.handleRequest = function (req) {
        return this.interceptors
            .filter(function (item) { return !!item.request; })
            .reduce(function (req, item) {
            return (item.request(req) || req);
        }, req);
    };
    RebirthHttpProvider.prototype.handleResponse = function (res) {
        return this.interceptors
            .filter(function (item) { return !!item.response; })
            .reverse()
            .reduce(function (stream, item) {
            return (item.response(stream) || res);
        }, res);
    };
    RebirthHttpProvider.prototype.baseUrl = function (host) {
        this.interceptors.push({
            request: function (request) {
                if (!/^https?:/.test(request.url)) {
                    host = host.replace(/\/$/, "");
                    var url = request.url.replace(/^\//, "");
                    request.url = host + "/" + url;
                }
            }
        });
        return this;
    };
    RebirthHttpProvider.prototype.json = function () {
        this.interceptors.push({
            request: function (request) {
                request.headers = request.headers || new http_1.Headers();
                request.headers.set('Content-Type', 'application/json');
                request.headers.set('Accept', 'application/json, text/javascript, */*;');
                if (request.body) {
                    request.body = JSON.stringify(request.body);
                }
            },
            response: function (response) {
                return response.map(function (res) {
                    var type = res.headers.get('content-type');
                    if (type.indexOf('json') !== -1) {
                        return res.json && res.json();
                    }
                });
            }
        });
        return this;
    };
    RebirthHttpProvider = __decorate([
        core_1.Injectable()
    ], RebirthHttpProvider);
    return RebirthHttpProvider;
}());
exports.RebirthHttpProvider = RebirthHttpProvider;
var RebirthHttp = (function () {
    function RebirthHttp(http, rebirthHttpProvider) {
        this.http = http;
        this.rebirthHttpProvider = rebirthHttpProvider;
    }
    RebirthHttp.prototype.getBaseUrl = function () {
        return '';
    };
    ;
    RebirthHttp.prototype.getDefaultHeaders = function () {
        return null;
    };
    ;
    RebirthHttp.prototype.requestInterceptor = function (req) {
        if (this.rebirthHttpProvider) {
            return this.rebirthHttpProvider.handleRequest(req);
        }
        return req;
    };
    RebirthHttp.prototype.responseInterceptor = function (res) {
        if (this.rebirthHttpProvider) {
            return this.rebirthHttpProvider.handleResponse(res);
        }
        return res;
    };
    RebirthHttp = __decorate([
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Inject(RebirthHttpProvider)),
        __param(1, core_1.Optional())
    ], RebirthHttp);
    return RebirthHttp;
}());
exports.RebirthHttp = RebirthHttp;
function BaseUrl(url) {
    return function (target) {
        target.prototype.getBaseUrl = function () {
            return url;
        };
        return target;
    };
}
exports.BaseUrl = BaseUrl;
function DefaultHeaders(headers) {
    return function (target) {
        target.prototype.getDefaultHeaders = function () {
            return headers;
        };
        return target;
    };
}
exports.DefaultHeaders = DefaultHeaders;
function paramBuilder(paramName) {
    return function (key) {
        return function (target, propertyKey, parameterIndex) {
            var metadataKey = propertyKey + "_" + paramName + "_parameters";
            var paramObj = {
                key: key,
                parameterIndex: parameterIndex
            };
            if (Array.isArray(target[metadataKey])) {
                target[metadataKey].push(paramObj);
            }
            else {
                target[metadataKey] = [paramObj];
            }
        };
    };
}
exports.Path = paramBuilder("Path");
exports.Query = paramBuilder("Query");
exports.Body = paramBuilder("Body")("Body");
exports.Header = paramBuilder("Header");
function Headers(headersDef) {
    return function (target, propertyKey, descriptor) {
        descriptor.headers = headersDef;
        return descriptor;
    };
}
exports.Headers = Headers;
function Produces(producesDef) {
    return function (target, propertyKey, descriptor) {
        descriptor.enableJson = producesDef.toLocaleLowerCase() === 'json';
        return descriptor;
    };
}
exports.Produces = Produces;
function methodBuilder(method) {
    return function (url) {
        return function (target, propertyKey, descriptor) {
            var pPath = target[(propertyKey + "_Path_parameters")];
            var pQuery = target[(propertyKey + "_Query_parameters")];
            var pBody = target[(propertyKey + "_Body_parameters")];
            var pHeader = target[(propertyKey + "_Header_parameters")];
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                // Body
                var body = null;
                if (pBody) {
                    var reqBody = args[pBody[0].parameterIndex];
                    body = descriptor.enableJson ? JSON.stringify(reqBody) : reqBody;
                }
                // Path
                var resUrl = url;
                if (pPath) {
                    for (var k in pPath) {
                        if (pPath.hasOwnProperty(k)) {
                            resUrl = resUrl.replace("{" + pPath[k].key + "}", args[pPath[k].parameterIndex]);
                        }
                    }
                }
                // Query
                var search = new http_1.URLSearchParams();
                if (pQuery) {
                    pQuery
                        .filter(function (p) { return args[p.parameterIndex]; }) // filter out optional parameters
                        .forEach(function (p) {
                        var key = p.key;
                        var value = args[p.parameterIndex];
                        // if the value is a instance of Object, we stringify it
                        if (value instanceof Object) {
                            value = JSON.stringify(value);
                        }
                        search.set(encodeURIComponent(key), encodeURIComponent(value));
                    });
                }
                // Headers
                // set class default headers
                var headers = new http_1.Headers(this.getDefaultHeaders());
                // set method specific headers
                for (var k_1 in descriptor.headers) {
                    if (descriptor.headers.hasOwnProperty(k_1)) {
                        headers.append(k_1, descriptor.headers[k_1]);
                    }
                }
                if (pHeader) {
                    for (var k_2 in pHeader) {
                        if (pHeader.hasOwnProperty(k_2)) {
                            headers.append(pHeader[k_2].key, args[pHeader[k_2].parameterIndex]);
                        }
                    }
                }
                var host = this.getBaseUrl().replace(/\/$/, "");
                var options = new http_1.RequestOptions({
                    method: method,
                    url: host + "/" + resUrl.replace(/^\//, ""),
                    headers: headers,
                    body: body,
                    search: search
                });
                options = this.requestInterceptor(options) || options;
                var observable = this.http.request(new http_1.Request(options));
                if (descriptor.enableJson) {
                    observable = observable.map(function (res) { return res.json(); });
                }
                return this.responseInterceptor(observable) || observable;
            };
            return descriptor;
        };
    };
}
exports.GET = methodBuilder(http_1.RequestMethod.Get);
exports.POST = methodBuilder(http_1.RequestMethod.Post);
exports.PUT = methodBuilder(http_1.RequestMethod.Put);
exports.DELETE = methodBuilder(http_1.RequestMethod.Delete);
exports.HEAD = methodBuilder(http_1.RequestMethod.Head);
exports.REBIRTH_HTTP_PROVIDERS = [
    RebirthHttpProvider
];
