const crypto = require('crypto');
const Redis = require('ioredis');

const msg = require('./msg');
const utils = require('./utils');
const redis = new Redis();

/** auth
 * @pk: public key
 * @sign: signature
 */
class Middleware {
  static async auth(ctx, next) {
    let headers = ctx.headers;

    let pk = headers['public-key-header'];
    let token = headers['token-header'];
    let stoken = headers['signed-token-header'];
    let _stoken = await redis.get(pk);

    if (pk === undefined || pk === '') {
      // 401 - No Public Key in Request Header.
      console.log(pk);
      ctx.status = msg.token.error[0][0];
      ctx.body = { err_msg: msg.token.error[0][1] };
      return;
      
    } else if (stoken === undefined || stoken === '') {
      // 202 - Generated Token.
      let token = await crypto.randomBytes(64);
      token = utils.encodeBase64(token);
      ctx.status = msg.token.warning[0][0];
      ctx.body = { token: token, msg: msg.token.warning[0][1] };
      return;
      
    } else if (stoken === _stoken) {
      await next();
      return;
    }
    
    // 201 - Created Token.
    let result = utils.Ed25519.verify(
      utils.decodeBase64(token),
      utils.decodeBase64(stoken),
      utils.decodeBase64(pk)
    );

    await redis.set(pk, stoken);
    ctx.status = msg.token.ok[0][0];
    ctx.body = { msg: msg.token.ok[0][1] };
    return;
  }
}

async function midware(ctx, next) {
  await Middleware.auth(ctx, next);
}

module.exports = midware;
