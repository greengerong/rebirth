/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["https://greengerong.github.io/rebirth/0.e00f35163ef49f726b0c.chunk.js","2ec741600ee8fa60a28f3916760954bb"],["https://greengerong.github.io/rebirth/1.4b3fe251a44978d198c2.chunk.js","3bcb31deb63715de9975378173760ef0"],["https://greengerong.github.io/rebirth/2.62d6a812ce7274485134.chunk.js","80e511667ac504e98121f7b2b7f740f4"],["https://greengerong.github.io/rebirth/assets/css/loading.css","e27b9b1b0dce424f3fa4b15f4b7ddd83"],["https://greengerong.github.io/rebirth/assets/fonts/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["https://greengerong.github.io/rebirth/assets/fonts/glyphicons-halflings-regular.svg","89889688147bd7575d6327160d64e760"],["https://greengerong.github.io/rebirth/assets/fonts/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["https://greengerong.github.io/rebirth/assets/fonts/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["https://greengerong.github.io/rebirth/assets/icon/android-icon-144x144.png","c6b0d18399917cabba46659daa3d2c4b"],["https://greengerong.github.io/rebirth/assets/icon/android-icon-192x192.png","746cfd4b7d16e1db2351b4935928a35c"],["https://greengerong.github.io/rebirth/assets/icon/android-icon-36x36.png","808c8900a0f6fc23ffdc02774371d5ee"],["https://greengerong.github.io/rebirth/assets/icon/android-icon-48x48.png","22641cc4b6a5cff3b40670aeb2215d35"],["https://greengerong.github.io/rebirth/assets/icon/android-icon-72x72.png","6ce21bbc541a84080f9ebffe5d108a29"],["https://greengerong.github.io/rebirth/assets/icon/android-icon-96x96.png","d2feab2d43febbbf406a6a94b5cbc941"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-114x114.png","d2f336df2e1387ec7a2f55b4f380c604"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-120x120.png","a54c8a735434f8e10a7991f537f6684c"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-144x144.png","c6b0d18399917cabba46659daa3d2c4b"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-152x152.png","2b03b3c48aa41096aeb7550f343a84fc"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-180x180.png","17ea094d6abc18faa0335721081cce69"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-57x57.png","6c17fbdff1c6dcefb870c4fa6dd86719"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-60x60.png","54cea227dbb741493aff195d60f3c6e5"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-72x72.png","6ce21bbc541a84080f9ebffe5d108a29"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-76x76.png","b36c17012b7ee69456b34e0a7158698d"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon-precomposed.png","246568e33b3418fd1dc534968d33d67a"],["https://greengerong.github.io/rebirth/assets/icon/apple-icon.png","246568e33b3418fd1dc534968d33d67a"],["https://greengerong.github.io/rebirth/assets/icon/favicon-16x16.png","1507e417e3683d1411b962a1775cb1d8"],["https://greengerong.github.io/rebirth/assets/icon/favicon-32x32.png","cbf936897ddccbaecc91872cf4f2e34e"],["https://greengerong.github.io/rebirth/assets/icon/favicon-96x96.png","d2feab2d43febbbf406a6a94b5cbc941"],["https://greengerong.github.io/rebirth/assets/icon/ms-icon-144x144.png","c6b0d18399917cabba46659daa3d2c4b"],["https://greengerong.github.io/rebirth/assets/icon/ms-icon-150x150.png","1e5b16c47f28c74ccbf8fc05eb7c88c3"],["https://greengerong.github.io/rebirth/assets/icon/ms-icon-310x310.png","0a2364d001f07c6bc11207e3430458ed"],["https://greengerong.github.io/rebirth/assets/icon/ms-icon-70x70.png","057063719a190e75e67fa570fc9f1e6b"],["https://greengerong.github.io/rebirth/assets/img/Angularjs-book.jpg","3b495738f54913326c758a46a5383b65"],["https://greengerong.github.io/rebirth/assets/img/angular-logo.png","df87d88859a406e13d04c842f81a3d5d"],["https://greengerong.github.io/rebirth/assets/img/banner-small.jpg","39dcb1d4fc1c37a206aeee0874c7eb76"],["https://greengerong.github.io/rebirth/assets/img/banner.jpg","659298e1154e81d1f0f1152f0f8a83fa"],["https://greengerong.github.io/rebirth/assets/img/sun-flower-300.png","b850795e171222bdfad21c11916cafc1"],["https://greengerong.github.io/rebirth/assets/img/sun-flower.jpg","3cf65ab11885b0f42d4115ebadc9007b"],["https://greengerong.github.io/rebirth/assets/img/sun-flower.png","9551544c438ce6957b36ce492ccac887"],["https://greengerong.github.io/rebirth/assets/img/wei-xin-wolf-er-wei-ma.png","2d4f9fa58e7329db7476383e32bc489f"],["https://greengerong.github.io/rebirth/assets/img/wolf.png","1e5dcb8da624a5687d85b4d1237a1a7b"],["https://greengerong.github.io/rebirth/assets/img/wolf2.jpg","2d2c571ccdc89a9cc1e80d1578049b3f"],["https://greengerong.github.io/rebirth/assets/img/wolf2.png","b9b9d6f5f295be92ca305da0e80c29c0"],["https://greengerong.github.io/rebirth/assets/service-worker.js","982138dd172a64f33b4654270e06a375"],["https://greengerong.github.io/rebirth/banner-small.39dcb1d4fc1c37a206ae.jpg","39dcb1d4fc1c37a206aeee0874c7eb76"],["https://greengerong.github.io/rebirth/fontawesome-webfont.674f50d287a8c48dc19b.eot","674f50d287a8c48dc19ba404d20fe713"],["https://greengerong.github.io/rebirth/fontawesome-webfont.912ec66d7572ff821749.svg","912ec66d7572ff821749319396470bde"],["https://greengerong.github.io/rebirth/fontawesome-webfont.b06871f281fee6b241d6.ttf","b06871f281fee6b241d60582ae9369b9"],["https://greengerong.github.io/rebirth/fontawesome-webfont.fee66e712a8a08eef580.woff","fee66e712a8a08eef5805a46892932ad"],["https://greengerong.github.io/rebirth/glyphicons-halflings-regular.89889688147bd7575d63.svg","89889688147bd7575d6327160d64e760"],["https://greengerong.github.io/rebirth/glyphicons-halflings-regular.e18bbf611f2a2e43afc0.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["https://greengerong.github.io/rebirth/glyphicons-halflings-regular.f4769f9bdb7466be6508.eot","f4769f9bdb7466be65088239c12046d1"],["https://greengerong.github.io/rebirth/glyphicons-halflings-regular.fa2772327f55d8198301.woff","fa2772327f55d8198301fdb8bcfc8158"],["https://greengerong.github.io/rebirth/index.html","d9e4c033eaba8160745a2be7387ec2da"],["https://greengerong.github.io/rebirth/inline.7a4077b1e66084914b93.bundle.js","1924d7973e603bba5aff2de5d5d55f23"],["https://greengerong.github.io/rebirth/main.948dc3063cc4dbe53574.bundle.js","09321360dfbcde30e120c59fd7975681"],["https://greengerong.github.io/rebirth/polyfills.63d4fc568672c3d4aa68.bundle.js","c0de2c1e37c93ac2e6dd996451c9563f"],["https://greengerong.github.io/rebirth/scripts.046af5f3cc02ea565cbe.bundle.js","3e468895903a52ec71aee96b8547311d"],["https://greengerong.github.io/rebirth/styles.20d8816661eb6a0109ea.bundle.css","20d8816661eb6a0109eac1c652db6cd6"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







