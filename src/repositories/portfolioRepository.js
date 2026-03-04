const { Portfolio } = require("../models")
const BaseRepository = require("./baseRepository");

class PortfolioRepository extends BaseRepository {

  constructor() {
    super(Portfolio);
  }
  async createPortfolio(portfolioData) {
    return await this.create(portfolioData);
  }

    async getPortfolioById(id) {
      return await this.getById({id});
    }

    async getAllPortfoliosByUserId(user_id, page_number, page_limit) {
      return await this.getAll({user_id}, page_number, page_limit);
    }

    async updatePortfolio(id, updateData) {
      return await this.update(id, updateData);
    }

    async deletePortfolio(id) {
      return await this.delete(id);
    }
}

module.exports = new PortfolioRepository();