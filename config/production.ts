// merge dev prod with common
export default Object.assign({}, require('./common.json'), require('./production.json'));
