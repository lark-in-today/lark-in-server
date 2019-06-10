const r = require('rethinkdb');
const msg = require('./msg');
const utils = require('./utils');
const sha256 = require('js-sha256').sha256;

class Author {
  static post(ctx, next) {
    let data = ctx.request.body;

    if (!data.content) {
      ctx.status = 406;
      ctx.body = {
	msg: msg.error[1]
      }
    }
    
    data.checksum = sha256(data.content);
    data.timestamp = Math.floor(new Date().getTime() / 1000);

    ctx.body = {
      msg: 'post',
      ...data
    };
  }
}

/** author
 * @params: ctx
 */
module.exports = async function author(ctx) {
  // let body = ctx.request.body;
  // let query = ctx.query;
  // let params = ctx.params;
  // let headers = ctx.headers;
  let method = ctx.request.method;
  
  switch(method) {
    case 'GET':
      ctx.body = {msg: 'hello'}
      break;
    case 'PUT':
      ctx.body = {msg: 'put'};
      break;
    case 'POST':
      await Author.post(ctx);
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
