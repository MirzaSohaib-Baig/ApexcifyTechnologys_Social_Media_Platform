const BaseRepository = require('./baseRepository');
const { User } = require('../models');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.getOne({ email: email.toLowerCase() });
  }

  async findByUsername(username) {
    return this.getOne({ username: username.toLowerCase() });
  }

  async findByEmailWithPassword(email) {
    return this.model.findOne({ email: email.toLowerCase() }).select('+password');
  }
}

module.exports = new UserRepository();  // export instance, not class