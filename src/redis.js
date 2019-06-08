const IoRedis = require('ioredis');

class Redis {
  constructor() {
    this.redis = new IoRedis()
  }
  
  set(k, v) { this.redis.set(k, v) }
  get(k, cb) { this.redis.get(k, cb) }
}

module.exports = Redis;
