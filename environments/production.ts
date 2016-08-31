// merge dev prod with common
export const environment = Object.assign({}, require('./common.json'), require('./production.json'));
