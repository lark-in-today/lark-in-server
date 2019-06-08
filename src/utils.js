function bytes_to_hex(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

module.exports = {
  bytes_to_hex,
}
