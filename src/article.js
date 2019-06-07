/** article
 * @params: ctx
 */
module.exports = function article(ctx) {
  let method = ctx.request.method;
  ctx.body = 'hello';
  return;
}
