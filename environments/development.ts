// merge dev env with common
export const environment = Object.assign({}, require('./common.json'), require('./development.json'));
