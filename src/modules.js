const crypto = require('crypto');
const Redis = require('./redis');
const redis = new Redis();

/** auth
 * @pk: public key
 * @sign: signature
 */
async function auth(pk, sign) {
  let _sign = redis.get(pk);

  if (_sign == sign) {
    return { code: 200, msg: 'ok' };
  } else {
    let token = await crypto.randomBytes(64);
    token = utils.bytes_to_hex(token);
    return { code: 201, msg: 'create token', token: token };
  }
}

module.exports = { auth };
