const user = require('../dao/user');
const validator = require('validator');

class UserService {
  
  async register(userObject) {
    return await user.create(userObject);
  }
  async findByEmail(email) {
    return await user.getByUnique(email);
  }
}

module.exports = new UserService();
