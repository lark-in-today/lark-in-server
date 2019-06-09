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
      ctx.status = 401;
      ctx.body = {
	msg: msg.error[0]
      }
    } else if (stoken === undefined || stoken === '') {
      let token = await crypto.randomBytes(64);
      token = utils.encodeBase64(token);

      ctx.status = 202;
      ctx.body = {
	token: token,
	msg: msg.warning[0]
      };
    } else if (stoken === _stoken) {
      next();
    } else {
      let result = utils.Ed25519.verify(
	utils.decodeBase64(token),
	utils.decodeBase64(stoken),
	utils.decodeBase64(pk)
      );

      await redis.set(pk, stoken)

      ctx.status = 201;
      ctx.body = {
	msg: msg.ok[0]
      }
    }
  }
}

async function midware(ctx, next) {
  await Middleware.auth(ctx, next)
}

module.exports = midware;
