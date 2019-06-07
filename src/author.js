const r = require('rethinkdb');


/** author
 * @params: ctx
 */
module.exports = function author(ctx) {
  let method = ctx.request.method;
  ctx.body = 'hello';
  return;
}
