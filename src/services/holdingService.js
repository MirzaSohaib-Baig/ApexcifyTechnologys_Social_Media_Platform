const holdingRepository = require("../repositories/holdingRepository");
const { transformHolding } = require("../core/transformers");

class HoldingService {
    async getHoldingsByUserId(user_id, page_number, page_limit) {
        const holdings = await holdingRepository.getAllHoldingsByUserId(user_id, page_number, page_limit);
        return { message: "Holdings found successfully", data: holdings.data.map(transformHolding), total_count: holdings.total_count, page: holdings.page, total_pages: holdings.total_pages };
    }

    async getHoldingById(id) {
        const holding = await holdingRepository.getHoldingById(id);
        return { message: "Holding found successfully", data: transformHolding(holding) };
    }

    async createHolding(data) {
        const holding = await holdingRepository.createHolding(data);
        return { message: "Holding created successfully", data: transformHolding(holding) };
    }

    async updateHolding(id, data) {
        const holding = await holdingRepository.updateHolding(id, data);
        return { message: "Holding updated successfully", data: transformHolding(holding) };
    }

    async deleteHolding(id) {
        const deleted = await holdingRepository.deleteHolding(id);
        if (!deleted) throw new Error("Holding not found or already deleted");
        return { message: "Holding deleted successfully" };
    }

    async getUserDividendPayouts(user_id, page_number, page_limit) {
        const payouts = await holdingRepository.getUserDividendPayouts(user_id, page_number, page_limit);
        return { message: "Dividend payouts calculated successfully", data: payouts.data.map(p => ({
            symbol: p.symbol,
            shares: p.shares,
            dividend_per_share: p.dividend_per_share,
            total_payout: p.total_payout,
            ex_date: p.ex_date,
            payment_date: p.payment_date
        })), total_count: payouts.total_count, page: payouts.page, total_pages: payouts.total_pages };
    }

    async getAllDividendSymbols() {
        const symbols = await holdingRepository.getAllSymbols();
        return { message: "Symbols found successfully", data: symbols };
    }
}

module.exports = new HoldingService();