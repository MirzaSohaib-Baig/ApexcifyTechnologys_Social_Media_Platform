const { Transaction, Stock } = require("../models");
const BaseRepository = require("./baseRepository");

class TransactionRepository extends BaseRepository {
  constructor() {
    super(Transaction);
  }

  async createTransaction(transactionData) {
    return await this.create(transactionData);
  }

  async getTransactionById(id) {
    return await this.getById({id});
  }

  async getAllTransactionsByUserId(user_id, page_number, page_limit) {
    return await this.getAll(
      {user_id },
      page_number,
      page_limit,
      [{ model: Stock, as: "stock" }]
    );
  }

  async updateTransaction(id, updateData) {
    return await this.update(id, updateData);
  }

  async deleteTransaction(id) {
    return await this.delete(id);
  }

  // ✅ aggregate holdings per stock for a user
  async getHoldings(userId) {
    const txs = await this.getAllTransactionsByUserId(userId);

    const map = new Map();

    for (const tx of txs) {
      const stock = tx.stock;
      if (!stock) continue;

      if (!map.has(stock.id)) {
        map.set(stock.id, {
          stockId: stock.id,
          ticker: stock.ticker,
          companyName: stock.company_name,
          totalQuantity: 0,
          currentPrice: stock.current_price,
          previousClose: stock.previous_close,
        });
      }

      const entry = map.get(stock.id);

      // ✅ interpret quantity from amount / current_price
      let quantity = tx.amount / stock.current_price;
      if (tx.payment_type === "debit") {
        quantity = -quantity; // selling reduces holdings
      }

      entry.totalQuantity += quantity;
      entry.value = entry.totalQuantity * entry.currentPrice;

      map.set(stock.id, entry);
    }

    return Array.from(map.values()).filter(h => Math.abs(h.totalQuantity) > 0);
  }

  // ✅ fetch single stock from transaction
  async getStockByTransactionId(txId) {
    const tx = await this.getById(txId);
    if (!tx) return null;
    const stock = await tx.getStock();
    tx.stock = stock;
    return tx;
  }
}

module.exports = new TransactionRepository();
