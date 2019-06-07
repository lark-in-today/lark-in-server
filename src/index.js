const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');

const author = require('./author');
const article = require('./article');
/** router
 * @return: Router
 */
function router() {
  let r = new Router();

  return r
    .get('/', ctx => { ctx.body = 'hello, world'; })
    .all('/:ident', author)
    .all('/:ident/:no', article);
}

/** server 
 * @params: Router
 * @return: ()
 */
function server(r) {
  let server = new Koa();
  console.log('Server listen to 6006...');

  server
    .use(logger())
    .use(bodyparser())
    .use(r.routes())
    .use(r.allowedMethods())
    .listen(6006);
}

function main() {
  server(router());
}

/* main */
main();
