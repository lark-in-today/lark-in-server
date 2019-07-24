const mongoUser = new require('./mongo').User;
const Redis = require('ioredis');
const crypto = require('crypto');

const u = new mongoUser();
const redis = new Redis();

class User {
  static async register(ctx, next) {
    let body = ctx.request.body;
    let res = await u.register({
      username: body.username,
      password: body.password
    });
    ctx.body = { msg: res };
  }
  
  static async login(ctx, next) {
    let body = ctx.request.body;
    let res = await u.login({
      username: body.username,
      password: body.password
    });
    
    if (res === true) {
      let token = await crypto.randomBytes(64);
      redis.set(body.username, token.toString('base64'));
      ctx.set('auth', token.toString('base64'));
    }
    
    ctx.body = { msg: res };
  }
}

module.exports = User;
