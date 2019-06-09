const IoRedis = require('ioredis');

class Redis {
  constructor() {
    this.redis = new IoRedis()
  }
  
  async set(k, v) { this.redis.set(k, v) }
  async get(k, cb) { this.redis.get(k, cb) }
}

module.exports = Redis;
