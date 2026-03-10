const BaseRepository = require('./baseRepository');
const { User } = require('../models');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async createUser(data) {
    return this.create(data);
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

  async updateUser(id, data) {
    return this.update(id, data);
  }

  async deleteUser(id) {
    return this.delete(id);
  }
}

module.exports = new UserRepository();  // export instance, not class