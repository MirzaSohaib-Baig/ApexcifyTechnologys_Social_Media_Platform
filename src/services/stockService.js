const stockRepository = require("../repositories/stockRepository");
const { transformStock } = require("../core/transformers");
const fs = require("fs");
const csv = require("csv-parser");

class StockService {
    async createStock(data) {
        const stock = await stockRepository.createStock(data);
        return { message: "Stock created successfully", data: transformStock(stock) };
    }

    async fetchAndStoreStocks() {
        return new Promise((resolve, reject) => {
            const stocks = [];

            // fs.createReadStream("src/ticker_data-csv/tickers.csv")
            fs.createReadStream("src/ticker_data-csv/symbols.csv")
            .pipe(csv())
            .on("data", (row) => {
                stocks.push({
                ticker: row.symbol,
                company_name: row.company_name,
                });
            })
            .on("end", async () => {
                try {
                await stockRepository.bulkInsertStocks(stocks);
                console.log(`✅ Imported ${stocks.length} stocks from CSV`);
                resolve({ message: "Stocks imported successfully", count: stocks.length });
                } catch (err) {
                reject(err);
                }
            })
            .on("error", reject);
        });
    }

    async getStockBySymbol(symbol) {
        const stock = await stockRepository.getBySymbol(symbol);
        return { message: "Stock found successfully", data: transformStock(stock) };
    }

    async getStockById(id) {
        const stock = await stockRepository.getStockById(id);
        return { message: "Stock found successfully", data: transformStock(stock) };
    }

    async getAllStocks(page_number, page_limit) {
        const stocks = await stockRepository.getAllStocks(page_number, page_limit);
        return { message: "Stocks found successfully", data: stocks.data.map(transformStock), total_count: stocks.total_count, page: stocks.page, total_pages: stocks.total_pages };
    }

    async getTrendingStocks(page_number, page_limit) {
        const trendingStocks = await stockRepository.getAllStocks(page_number, page_limit);
        trendingStocks.data.sort((a, b) => Math.abs(b.percent_change) - Math.abs(a.percent_change));
        return { message: "Trending Stocks found successfully", data: trendingStocks.data.map(transformStock), total_count: trendingStocks.total_count, page: trendingStocks.page, total_pages: trendingStocks.total_pages };
    }

    async deleteStock(id) {
        const deleted = await stockRepository.deleteStock(id);
        if (!deleted) throw new Error("Stock not found or already deleted");
        return { message: "Stock deleted successfully" };
    }

    async updateStock(id, updateData) {
        const updated = await stockRepository.updateStock(id, updateData);
        return { message: "Stock updated successfully", data: transformStock(updated) };
    }

}

module.exports = new StockService();