const r = require('rethinkdb');
const utils = require('./utils');

class Author {
  
}

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
      ctx.body = {msg: 'put'};
      break;
    case 'POST':
      ctx.body = {msg: 'post'};
      break;
    case 'DELETE':
      ctx.body = {msg: 'delete'};
      break;
    default:
      ctx.body = {msg: method};
      break;
  }
  return;
}
