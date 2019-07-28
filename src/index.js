const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyparser = require('koa-body');

const user = require('./user');
const article = require('./article');
const midware = require('./midware');

class Index {
  static router() {
    let r = new Router();

    r
      .get('/', ctx => {
	ctx.body = 'hello, world';
      })
      .post('/user/register', user.register)
      .post('/user/login', user.login)

    let r_auth = new Router();
    r_auth
      .get('/article', article.get_article)
      .get('/article_thums', article.get_article_thums)
      .get('/article/draft', article.get_draft)
      .get('/article/draft_thums', article.get_draft_thums)
      .post('/article', article.article)
      .post('/article/draft', article.draft)
      

    return { basic: r, auth: r_auth };
  }

  static server(r) {
    const server = new Koa();
    console.log('Server listen to 6000...');

    server
      .use(cors())
      .use(logger())
      .use(bodyparser())
      .use(r.basic.routes())
      .use(r.basic.allowedMethods())
      .use(midware)
      .use(r.auth.routes())
      .use(r.auth.allowedMethods())
      .listen(6000);
  }

  static main() {
    Index.server(Index.router());
  }
}

Index.main();
