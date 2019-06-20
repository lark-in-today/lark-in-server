const axios = require('axios');

module.exports = function (db, key, value) {
  return axios({
    method: 'post',
    url: 'http://localhost:3030',
    data: {
      "jsonrpc": "2.0",
      "method": "x",
      "params": {
	"db": db,
	"key": key,
	"value": value
      },    
      "id": 1
    }
  });
};
