const r = require('rethinkdb');
const utils = require('./utils');

/** author
 * @params: ctx
 */
module.exports = async function author(ctx) {
  let method = ctx.request.method;
  let body = ctx.request.body;
  let query = ctx.query;
  let params = ctx.params;
  let headers = ctx.headers;
  
  switch(method) {
    case 'GET':
      ctx.body = {msg: 'hello'}
      break;
    case 'PUT':
      ctx.body = 'put';
      break;
    default:
      ctx.body = 'hello';
      break;
  }
  return;
}
