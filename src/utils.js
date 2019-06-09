const nacl = require('tweetnacl');
const { decodeBase64, encodeBase64 } = require('tweetnacl-util');

class Ed25519 {
  static verify(msg, sign, pk) {
    return nacl.sign.detached.verify(msg, sign, pk);
  }
}

module.exports = {
  Ed25519,
  decodeBase64,
  encodeBase64
}
