"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx = require('rxjs/rx');
var RebirthHttpProvider = (function () {
    function RebirthHttpProvider() {
        this.interceptors = [];
    }
    RebirthHttpProvider.prototype.getInterceptors = function () {
        return this.interceptors;
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
    RebirthHttp.prototype.request = function (url, options) {
        return this._proxy({ mehtod: 'request', url: url, options: options });
    };
    RebirthHttp.prototype.get = function (url, options) {
        return this._proxy({ mehtod: 'get', url: url, options: options });
    };
    RebirthHttp.prototype.post = function (url, body, options) {
        if (body === void 0) { body = {}; }
        return this._proxy({ mehtod: 'post', url: url, body: body, options: options });
    };
    RebirthHttp.prototype.put = function (url, body, options) {
        if (body === void 0) { body = {}; }
        return this._proxy({ mehtod: 'put', url: url, body: body, options: options });
    };
    RebirthHttp.prototype.delete = function (url, options) {
        return this._proxy({ mehtod: 'delete', url: url, options: options });
    };
    RebirthHttp.prototype.patch = function (url, body, options) {
        if (body === void 0) { body = {}; }
        return this._proxy({ mehtod: 'patch', url: url, body: body, options: options });
    };
    RebirthHttp.prototype.head = function (url, options) {
        return this._proxy({ mehtod: 'head', url: url, options: options });
    };
    RebirthHttp.prototype._proxy = function (options) {
        var interceptors = this.rebirthHttpProvider.getInterceptors();
        var http = this.http;
        var request = interceptors
            .filter(function (item) { return !!item.request; })
            .reduce(function (stream, item) {
            return stream.map(function (req) {
                console.log('request map', req);
                return item.request(req) || req;
            });
        }, Rx.Observable.of(options));
        var responseStream = request.flatMap(function (req) {
            var data = req.body ? [req.url, req.body, req.options] : [req.url, req.options];
            return http[req.mehtod].apply(http, data);
        });
        var q = interceptors
            .filter(function (item) { return !!item.response; })
            .reverse()
            .reduce(function (stream, item) {
            return stream.map(function (res) {
                console.log('response map', res);
                return item.response(res) || res;
            });
        }, responseStream);
        var subscribe = q.subscribe(function (t) { }, function (error) {
            console.log(error, 'interceptors error ===========');
            interceptors
                .filter(function (item) { return !!item.error; })
                .reverse()
                .reduce(function (error, item) {
                return item.error(error) || error;
            }, error);
        }, function () { return subscribe.unsubscribe(); });
        return q;
    };
    RebirthHttp = __decorate([
        core_1.Injectable()
    ], RebirthHttp);
    return RebirthHttp;
}());
exports.RebirthHttp = RebirthHttp;
var jsonProvider = {
    request: function (config) {
        config.options = config.options || {};
        config.options.headers = config.options.headers || new http_1.Headers();
        config.options.headers.set('Content-Type', 'application/json');
        config.options.headers.set('Accept', 'application/json, text/javascript, */*;');
        if (config.body) {
            config.body = JSON.stringify(config.body);
        }
    },
    response: function (response) {
        var type = response.headers.get('content-type');
        if (type.indexOf('json') !== -1) {
            return response.json && response.json();
        }
        return response;
    }
};
exports.REBIRTH_HTTP_JSON_PROVIDERS = 'REBIRTH_HTTP_JSON_PROVIDERS';
exports.REBIRTH_HTTP_PROVIDERS = [
    RebirthHttp,
    RebirthHttpProvider,
    { provide: 'REBIRTH_HTTP_JSON_PROVIDERS', useValue: jsonProvider }
];
