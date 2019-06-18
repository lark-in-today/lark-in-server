const Koa = require('koa');
const cors = require('koa-cors');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const author = require('./author');
const article = require('./article');
const exist = require('./exist');
const midware = require('./midware');

class Index {
  /** router
   * @return: Router
   */
  static router() {
    let r = new Router();

    r
      .use(midware)
      .get('/', ctx => { ctx.body = 'hello, world'; })
      .all('/_/exist', exist)
      .all('/:ident', author)
      .all('/:ident/:no', article);

    return r;
  }

  /** server 
   * @params: Router
   * @return: ()
   */
  static server(r) {
    const server = new Koa();
    console.log('Server listen to 6006...');

    server
      .use(cors())
      .use(logger())
      .use(bodyparser())
      .use(r.routes())
      .use(r.allowedMethods())
      .listen(6006);
  }

  static main() {
    Index.server(Index.router());
  }
}

Index.main();
