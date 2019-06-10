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
      ctx.status = msg[0][0][1][0];
      ctx.body = { msg: msg[0][0][1][1] };
      
    } else if (stoken === undefined || stoken === '') {
      // 202 - Generated Token.
      let token = await crypto.randomBytes(64);
      token = utils.encodeBase64(token);
      ctx.status = msg[0][2][0][0];
      ctx.body = {
	token: token, msg: msg[0][2][0][1]
      };
      
    } else if (stoken === _stoken) {
      await next();
      
    } else {
      // 201 - Created Token.
      let result = utils.Ed25519.verify(
	utils.decodeBase64(token),
	utils.decodeBase64(stoken),
	utils.decodeBase64(pk)
      );

      await redis.set(pk, stoken)

      ctx.status = msg[0][0][0][0]
      ctx.body = { msg: msg[0][0][0][1] }
    }
  }
}

async function midware(ctx, next) {
  await Middleware.auth(ctx, next)
}

module.exports = midware;
