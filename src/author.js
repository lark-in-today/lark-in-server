const msg = require('./msg');
const utils = require('./utils');
const sha256 = require('js-sha256').sha256;

class Author {
  static post(ctx, next) {
    let data = ctx.request.body;

    if (!data.title) {
      ctx.status = msg[1][1][0][0];
      ctx.body = { err_msg: msg[1][1][0][1] };
      return;
    } else if(!data.content) {
      ctx.status = msg[1][1][1][0];
      ctx.body = { err_msg: msg[1][1][1][1] };
      return;
    } else if(!data.summary) {
      ctx.status = msg[1][1][2][0];
      ctx.body = { err_msg: msg[1][1][2][1] };
      return;
    }
    
    data.checksum = sha256(data.content);
    data.timestamp = Math.floor(new Date().getTime() / 1000);

    console.log(data);
    
    ctx.status = msg[1][0][0][0];
    ctx.body = { msg: msg[1][0][0][1] };
    return;
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
