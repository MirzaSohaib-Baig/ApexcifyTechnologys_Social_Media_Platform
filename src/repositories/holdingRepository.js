const BaseRepository = require("./baseRepository");
const { Holding, Dividend } = require("../models");
const { Sequelize } = require("sequelize");

class HoldingRepository extends BaseRepository {
  constructor() {
    super(Holding);
  }

  async createHolding(data) {
    return await this.create(data);
  }

  async getHoldingById(id) {
    return await this.getById({ id });
  }
  async getAllHoldingsByUserId(user_id, page_number, page_limit) {
    return await this.getAll({ user_id }, page_number, page_limit);
  }

  async updateHolding(id, data) {
    return await this.update(id, data);
  }

  async deleteHolding(id) {
    return await this.delete(id);
  }

  async getUserDividendPayouts(user_id, page_number, page_limit) {
    // 1. Get user holdings (with pagination)
    const {
      data: holdings,
      total_count,
      page,
      total_pages,
    } = await this.getAll({ user_id }, page_number, page_limit);

    if (!holdings || holdings.length === 0) {
      return { data: [], total_count, page, total_pages };
    }

    // 2. Collect all symbols the user owns
    const symbols = holdings.map((h) => h.symbol);

    // 3. Fetch all recent dividends for these symbols (in one go)
    const allDividends = await Dividend.findAll({
      where: { symbol: symbols },
      order: [["date", "DESC"]],
    });

    // 4. Create a map to store the latest dividend per symbol
    const latestDividends = {};
    for (const d of allDividends) {
      if (!latestDividends[d.symbol]) {
        latestDividends[d.symbol] = d; // only keep the most recent one
      }
    }

    // 5. Calculate payout for each holding
    const results = holdings
      .map((holding) => {
        const dividend = latestDividends[holding.symbol];
        if (!dividend) return null;

        const perShare = dividend.dividend || dividend.adjDividend || 0;
        const payout = perShare * holding.shares;

        return {
          symbol: holding.symbol,
          shares: holding.shares,
          dividend_per_share: perShare,
          total_payout: payout,
          ex_date: dividend.exDate || dividend.recordDate,
          payment_date: dividend.paymentDate,
        };
      })
      .filter(Boolean); // remove nulls

    return { data: results, total_count, page, total_pages };
  }

    async getAllSymbols() {
        const symbols = await Dividend.findAll({ attributes: [Sequelize.fn('DISTINCT', Sequelize.col('symbol')) ,'symbol'], raw: true });
        return symbols.map(t => t.symbol).filter(Boolean);
    }
}

module.exports = new HoldingRepository();
