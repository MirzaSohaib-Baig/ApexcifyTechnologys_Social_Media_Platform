const portfolioRepository = require("../repositories/portfolioRepository");
const transactionRepository = require("../repositories/transactionRepository");
const { transformPortfolio } = require("../core/transformers");


class PortfolioService {
  async createPortfolio(portfolioData) {
    const portfolio = await portfolioRepository.createPortfolio(portfolioData);
    return { message: "Portfolio created successfully", data: transformPortfolio(portfolio) };
  }

    async getPortfolioById(id) {
      const portfolio = await portfolioRepository.getPortfolioById(id);
      return { message: "Portfolio found successfully", data: transformPortfolio(portfolio) };
    }

    async getPortfoliosByUserId(user_id, page_number, page_limit) {
      const portfolios = await portfolioRepository.getAllPortfoliosByUserId(user_id, page_number, page_limit);
      return { message: "Portfolios found successfully", data: portfolios.data.map(transformPortfolio), total_count: portfolios.total_count, page: portfolios.page, total_pages: portfolios.total_pages };
    }

    async updatePortfolio(id, updateData) {
      const portfolio = await portfolioRepository.updatePortfolio(id, updateData);
      return { message: "Portfolio updated successfully", data: transformPortfolio(portfolio) };
    }

    async deletePortfolio(id) {
      const deleted = await portfolioRepository.deletePortfolio(id);
      if (!deleted) throw new Error("Portfolio not found or already deleted");
      return { message: "Portfolio deleted successfully" };
    }

    async calculatePortfolioValue(userId) {
      const holdings = await transactionRepository.getHoldings(userId);
      const total = holdings.reduce((sum, h) => sum + (h.value || 0), 0);

      // Format for ApexCharts
      const chartData = {
        labels: holdings.map(h => h.ticker),
        series: holdings.map(h => h.value),
      };

      return { total, holdings, chartData };
    }
}

module.exports = new PortfolioService();