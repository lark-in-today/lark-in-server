const sled = require('./sled');

sled('author', 'hello', 'worldd').then(r => {
  console.log(r.data.result);
});
