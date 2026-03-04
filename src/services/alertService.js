const alertRepository = require("../repositories/alertRepository");
const { transformAlert } = require("../core/transformers");

class AlertService {
    async createAlert(alertData) {
        const alert = await alertRepository.createAlert(alertData);
        return { message: "Alert created successfully", data: transformAlert(alert) };
    }

    async getAlertById(id) {
        const alert = await alertRepository.getAlertById(id);
        return { message: "Alert found successfully", data: transformAlert(alert) };
    }

    async getAllAlertsByUserId(user_id, page_number, page_limit) {
        const alerts = await alertRepository.getAllAlertsByUserId(user_id, page_number, page_limit);
        return { message: "Alerts found successfully", data: alerts.data.map(transformAlert), total_count: alerts.total_count, page: alerts.page, total_pages: alerts.total_pages };
    }

    async markTriggered(id) {
        const alert = await alertRepository.markTriggered(id);
        return { message: "Alert triggered successfully", data: transformAlert(alert) };
    }

    async deleteAlert(id) {
        const deleted = await alertRepository.deleteAlert(id);
        if (!deleted) throw new Error("Alert not found or already deleted");
        return { message: "Alert deleted successfully" };
    }

    async updateAlert(id, alertData) {
        const alert = await alertRepository.updateAlert(id, alertData);
        return { message: "Alert updated successfully", data: transformAlert(alert) };
    }
}

module.exports = new AlertService();