const msg = require('./msg');
const sled = require('./sled');
const utils = require('./utils');
const sha256 = require('js-sha256').sha256;

class Author {
  static async get(ctx, next) {
    let author = ctx.params.ident;
    let r = await sled({
      db: author,
      batch: 'true'
    });

    ctx.body = {
      msg: 'OK',
      result: r.data.result
    };
    return;
  }
  
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

    data.timestamp = Math.floor(new Date().getTime() / 1000);
    let pk = ctx.headers['public-key-header'];
    let author = ctx.headers['author-header'];
    if (!author) {
      ctx.status = msg.art.error[3][0];
      ctx.body = { err_msg: msg.art.error[3][1] };
      return;
    }

    // Check if author exist
    let res = await sled({
      db: 'author', key: author
    });

    if (res.data.result == 'Err') {
      let _r = await sled({
	db: 'author',
	key: author,
	value: JSON.stringify({ pk: pk })
      });

      if (_r.data.result == 'Err') {
	ctx.status = msg.art.error[2][0];
	ctx.body = { err_msg: msg.art.error[2][1] };
	return;
      }
    } else {
      let _r = await sled({
	db: 'author',
	key: author,
      });

      if (_r.data.result === 'Err') {
	ctx.status = msg.art.error[2][0];
	ctx.body = { err_msg: msg.art.error[2][1] };
	return;
      } else {
	let _author = JSON.parse(_r.data.result);
	if (_author.pk !== pk) {
	  ctx.status = msg.art.warning[0][0];
	  ctx.body = { err_msg: msg.art.warning[0][1] };
	  return;
	}
      }
    }

    // post an article
    res = await sled({
      db: author,
      key: sha256(JSON.stringify(data)),
      value: JSON.stringify(data)
    });

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
      await Author.get(ctx);
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
