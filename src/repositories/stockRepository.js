const BaseRepository = require("./baseRepository");
const { Stock } = require("../models");

class StockRepository extends BaseRepository {
    constructor() {
        super(Stock);
    }

    async createStock(data) {
        return await this.create(data);
    }

    async bulkInsertStocks(stocks) {
        return await this.bulkCreate(stocks, { ignoreDuplicates: true });
    }

    async getBySymbol(symbol) {
        return await this.getOne({ symbol });
    }

    async getStockById(id) {
        return await this.getById({id});
    }

    async getAllStocks(page_number, page_limit) {
        return await this.getAll(
            { },
            page_number,
            page_limit
        );
    }

    async updateStock(id, updateData) {
        return await this.update(id, updateData);
    }

    async updateStockQuote(ticker, updateData) {
        return await Stock.update(updateData, { where: { ticker } });
    }

    async deleteStock(id) {
        return await this.delete(id);
    }
}

module.exports = new StockRepository();