const axios = require('axios');

/** params
 * @db
 * @tree
 * @key
 * @value
 */
module.exports = function (params) {
  return axios({
    method: 'post',
    url: 'http://localhost:3030',
    data: {
      "jsonrpc": "2.0",
      "method": "x",
      "params": params,
      "id": 1
    }
  });
};
