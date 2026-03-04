const transactionRepository = require("../repositories/transactionRepository");
const { transformTransaction } = require("../core/transformers");

class TransactionService {
  async createTransaction(transactionData) {
    const transaction = await transactionRepository.createTransaction(transactionData);
    return { message: "Transaction created successfully", data: transformTransaction(transaction) };
  }

    async getTransactionById(id) {
      const transaction = await transactionRepository.getTransactionById(id);
      return { message: "Transaction found successfully", data: transformTransaction(transaction) };
  }

    async getAllTransactionsByUserId(user_id, page_number, page_limit) {
      const transactions = await transactionRepository.getAllTransactionsByUserId(user_id, page_number, page_limit);
      return { message: "Transactions found successfully", data: transactions.data.map(transformTransaction), total_count: transactions.total_count, page: transactions.page, total_pages: transactions.total_pages };
  }

    async updateTransaction(id, updateData) {
      const transaction = await transactionRepository.updateTransaction(id, updateData);
      return { message: "Transaction updated successfully", data: transformTransaction(transaction) };
  }

    async deleteTransaction(id) {
      const deleted = await transactionRepository.deleteTransaction(id);
      if (!deleted) {
        throw new Error("Transaction not found or already deleted");
      }
      return { message: "Transaction deleted successfully" };
  }
}

module.exports = new TransactionService();