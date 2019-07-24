const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/lark-in', {
    useNewUrlParser: true
  }
);

class User {
  static schema() {
    return new mongoose.Schema({
      username: {
	type: String,
	unique: true
      },
      password: String
    });
  }

  static model() {
    return mongoose.model('user', User.schema());
  }

  constructor() {
    this.user = User.model();
  }
  
  async register(params) {
    const { username, password } = params;
    let u = this.user;

    return u.exists({
      username: username
    }).then(r => {
      if (r === true) {
	return false;
      } else {
	return u.create({
	  username, password
	}).then(r => {
	  return r._id? true: false;
	})
      }
    });
  }

  async login(params) {
    const { username, password } = params;
    let u = this.user;

    return u.findOne({
      username: username
    }).then(r => {
      if (r.password === password) {
	return true;
      } else {
	return false;
      }
    });
  }
}

module.exports = { User };
