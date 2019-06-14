const sled = require('./sled');

sled('authors', 'hello', 'worldd').then(r => {
  console.log(r.data.result);
});
