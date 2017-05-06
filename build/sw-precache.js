const swPrecache = require('sw-precache');

const config = {
  dest: './dist',
};

const stripPrefixMulti = {};
stripPrefixMulti[config.dest] = 'https://greengerong.github.io/rebirth';
swPrecache.write(`${config.dest}/service-worker.js`, {
  staticFileGlobs: [config.dest + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
  stripPrefixMulti: stripPrefixMulti
}, function () {
  console.log('PWA precache generate success!');
});
