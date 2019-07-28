const Redis = require('ioredis');
const redis = new Redis();

class Middleware {
  static async auth(ctx, next) {
    let headers = ctx.headers;
    let user = await redis.get(headers.token);
    if (user !== null) {
      ctx.request.body.author = user;
      await next();
    } else {
      ctx.body = {
	errMsg: 'err',
	extra: 'auth failed.'
      };
    }
  }
}

async function midware(ctx, next) {
  await Middleware.auth(ctx, next);
}

module.exports = midware;
