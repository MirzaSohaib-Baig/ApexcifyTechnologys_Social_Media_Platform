const BaseRepository = require("./baseRepository");
const { CompanyNews } = require("../models");
const { Sequelize } = require("sequelize");

class CompanyNewsRepository extends BaseRepository {
    constructor() {
        super(CompanyNews);
    }

    async createCompanyNews(data) {
        return await this.create(data);
    }

    async bulkCreateCompanyNews(newsArray) {
        return await this.bulkCreate(newsArray, { ignoreDuplicates: true });
    }

    async getCompanyNewsById(id) {
        return await this.getById({id});
    }

    async getAllCompanyNews(related, page_number, page_limit) {
        return await this.getAll({ related }, page_number, page_limit);
    }

    async updateCompanyNews(id, data) {
        return await this.update(id, data);
    }

    async deleteCompanyNews(id) {
        return await this.delete(id);
    }

    async getLatest(limit = 10) {
        return await this.getAll({ order: [['datetime', 'DESC']], limit });
    }

    async getAllTickers() {
        const tickers = await CompanyNews.findAll({ attributes: [Sequelize.fn('DISTINCT', Sequelize.col('related')) ,'related'], raw: true });
        return tickers.map(t => t.related).filter(Boolean);
    }
}

module.exports = new CompanyNewsRepository();