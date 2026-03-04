const companyNewsRepository = require("../repositories/companyNewsRepository");
const { transformCompanyNews } = require("../core/transformers");
const { getCompanyNews } = require("../helpers/finnhubClient");
const fs = require("fs");
const csv = require("csv-parser");

class CompanyNewsService {
    async getLatest(limit = 10) {
        const latest_news = await companyNewsRepository.getLatest(limit);
        return { message: "Latest news found successfully", data: latest_news.map(transformCompanyNews) };
    }
    async getAllCompanyNews(ticker, page_number, page_limit) {
        const news = await companyNewsRepository.getAllCompanyNews(ticker, page_number, page_limit);
        return { message: "News found successfully", data: news.data.map(transformCompanyNews), total_count: news.total_count, page: news.page, total_pages: news.total_pages };
    }

    async getCompanyNewsTickers() {
        const tickers = await companyNewsRepository.getAllTickers();
        return { message: "Tickers found successfully", data: tickers };
    }

    async getCompanyNewsById(id) {
        const news = await companyNewsRepository.getCompanyNewsById(id);
        return { message: "News found successfully", data: transformCompanyNews(news) };
    }
    async createCompanyNews(data) {
        const news = await companyNewsRepository.createCompanyNews(data);
        return { message: "News created successfully", data: transformCompanyNews(news) };
    }

    async fetchAndStoreCompanyNews() {
        return new Promise((resolve, reject) => {
            const tickers = [];

            fs.createReadStream("src/ticker_data-csv/symbols.csv")
                .pipe(csv())
                .on("data", (row) => {
                    tickers.push(row.symbol);
                })
                .on("end", async () => {
                    try {
                        let allNews = [];
                        const startDate = "2020-01-01";
                        const endDate = new Date().toISOString().split('T')[0];
                        
                        for (const ticker of tickers) {
                            const news = await getCompanyNews(ticker, startDate, endDate);
                            allNews.push(...news.map(transformCompanyNews));
                        }
                        await companyNewsRepository.bulkCreateCompanyNews(allNews);
                        console.log(`✅ Imported ${allNews.length} news from CSV`);
                        resolve({ message: "News imported successfully", count: allNews.length });
                    } catch (err) {
                        reject(err);
                    }
                })
                .on("error", reject);
        });
    }
    async updateCompanyNews(id, data) {
        const news = await companyNewsRepository.updateCompanyNews(id, data);
        return { message: "News updated successfully", data: transformCompanyNews(news) };
    }
    async deleteCompanyNews(id) {
        const deleted = await companyNewsRepository.deleteCompanyNews(id);
        if (!deleted) throw new Error("News not found or already deleted");
        return { message: "News deleted successfully" };
    }
}

module.exports = new CompanyNewsService();