const nacl = require('tweetnacl');
const { decodeBase64, encodeBase64 } = require('tweetnacl-util');

function bytes_to_hex(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

class Ed25519 {
  static verify(msg, sign, pk) {
    return nacl.sign.detached.verify(msg, sign, pk);
  }
}

module.exports = {
  Ed25519,
  bytes_to_hex,
  decodeBase64,
  encodeBase64
}
