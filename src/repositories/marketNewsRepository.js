const BaseRepository = require("./baseRepository");
const { MarketNews } = require("../models");
const { Sequelize } = require("sequelize");

class MarketNewsRepository extends BaseRepository {
    constructor() {
        super(MarketNews);
    }

    async createMarketNews(data) {
        return await this.create(data);
    }

    async bulkCreateMarketNews(newsArray) {
        return await this.bulkCreate(newsArray, { ignoreDuplicates: true });
    }

    async getMarketNewsById(id) {
        return await this.getById({id});
    }

    async getAllMarketNews(category, page_number, page_limit) {
        return await this.getAll({ category }, page_number, page_limit);
    }

    async updateMarketNews(id, data) {
        return await this.update(id, data);
    }

    async deleteMarketNews(id) {
        return await this.delete(id);
    }

    async getLatest(limit = 10) {
        return await this.getAll({ order: [['datetime', 'DESC']], limit });
    }

    async getAllCategories() {
        const category = await MarketNews.findAll({ attributes: [Sequelize.fn('DISTINCT', Sequelize.col('category')) ,'category'], raw: true, group: ['category'] });
        return category.map(cat => cat.category).filter(Boolean);
    }
}

module.exports = new MarketNewsRepository();