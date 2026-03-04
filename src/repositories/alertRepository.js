const BaseRepository = require("./baseRepository");
const { Alert } = require("../models");

class AlertRepository extends BaseRepository {
    constructor() {
        super(Alert);
    }

    async createAlert(alertData) {
        return await this.create(alertData);
    }

    async getAlertById(id) {
        return await this.getById({id});
    }

    async getAllAlertsByUserId(user_id, page_number, page_limit) {
        return await this.getAll({ user_id }, page_number, page_limit);
    }

    async updateAlert(id, alertData) {
        return await this.update(id, alertData);
    }

    async deleteAlert(id) {
        return await this.delete(id);
    }

    async markTriggered(id) {
        const alert = await this.getById(id);
        if (!alert) return null;
        return await alert.update({ triggered: true });
    }
}

module.exports = new AlertRepository();