const sled = require('./sled');
const msg = require('./msg');

module.exports = async function (ctx) {
  let query = ctx.query;
  let ret = await sled('author', query.author);

  if (ret.data.result === 'Err') {
    ctx.status = msg[1][0][0][0];
    ctx.body = { msg: msg[1][0][0][1] };
  } else {
    ctx.status = msg[1][2][0][0];
    ctx.body = { err_msg: msg[1][2][0][1] };
  }

  return;
}
