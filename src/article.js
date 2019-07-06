const sled = require('./sled');

class Article {
  static async get(ctx, next) {
    let {ident, no } = ctx.params;

    let r = await sled({
      db: ident,
      key: no
    });
    
    ctx.body = {
      msg: 'OK',
      result: r.data.result
    };
    return;
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
      await Article.get(ctx);
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
