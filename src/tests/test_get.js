const s = require('../sled');

s({
  db: 'author',
  key: 'hello'
}).then(r => {
  console.log(r.data.result);
})
