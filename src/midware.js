const crypto = require('crypto');
const Redis = require('ioredis');

const msg = require('./msg');
const utils = require('./utils');
const redis = new Redis();

/** auth
 * @pk: public key
 * @sign: signature
 */
async function auth(ctx, next) {
  let headers = ctx.headers;

  let pk = headers['public-key-header'];
  let token = headers['token-header'];
  let stoken = headers['signed-token-header'];

  let _stoken = await redis.get(pk);

  if (stoken === '') {
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

async function midware(ctx, next) {
  let method = ctx.request.method;
  let body = ctx.request.body;
  let query = ctx.query;
  let params = ctx.params;
  let headers = ctx.headers;
  // console.log(headers);
  await auth(ctx, next)
  // next()
}

module.exports = midware;
