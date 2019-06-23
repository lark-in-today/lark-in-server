const msg = require('./msg');
const utils = require('./utils');
const sled = require('./sled');
const sha256 = require('js-sha256').sha256;

class Author {
  static async post(ctx, next) {
    let data = ctx.request.body;
    
    if (!data.title) {
      ctx.status = msg.art.error[0][0];
      ctx.body = { err_msg: msg.art.error[0][1] };
      return;
    } else if(!data.content) {
      ctx.status = msg.art.error[1][0];
      ctx.body = { err_msg: msg.art.error[1][1] };
      return;
    }

    // data.checksum = sha256(data.content);
    data.timestamp = Math.floor(new Date().getTime() / 1000);
    let pk = ctx.headers['public-key-header'];
    let res = await sled(pk, '', JSON.stringify(data));
    
    if (res.data.result === 'OK') {
      ctx.status = msg.art.ok[0][0];
      ctx.body = { msg: msg.art.ok[0][1] };
      return;
    } else {
      ctx.status = msg.art.error[2][0];
      ctx.body = { err_msg: msg.art.error[2][1] };
      return;
    }
  }
}

/** author
 * @params: ctx
 */
module.exports = async function (ctx) {
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
