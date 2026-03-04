const BaseRepository = require("./baseRepository");
const { Dividend } = require("../models");

class DividendRepository extends BaseRepository {
    constructor() {
        super(Dividend);
    }

    async createDividend(data) {
        return await this.create(data);
    }

    async bulkCreateDividends(dataArray) {
        return await this.bulkCreate(dataArray);
    }

    async getDividendById(id) {
        return await this.getById({id});
    }

    async getAllDividends(page_number, page_limit) {
        return await this.getAll({}, page_number, page_limit);
    }

    async updateDividend(id, data) {
        return await this.update(id, data);
    }

    async deleteDividend(id) {
        return await this.delete(id);
    }
}

module.exports = new DividendRepository();