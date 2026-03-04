const BaseRepository = require("./baseRepository");
const { User } = require("../models");
const auth = require("../core/security");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  async createUser(userData) {
    return await this.create(userData);
  }

  async getUserByEmail(email) {
    return await this.getOne({ email });
  }

    async getUserById(id) {
    return await this.getById({id});
  }
    async updateUser(id, updateData) {
    return await this.update(id, updateData);
  }

  async changePassword(id, password) {
    return await this.update(id, { password: password });
  }
    async deleteUser(id) {
    return await this.delete(id);
  }

}


module.exports = new UserRepository();