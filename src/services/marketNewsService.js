const marketNewsRepository = require("../repositories/marketNewsRepository");
const { transformMarketNews } = require("../core/transformers");
const { getMarketNews } = require("../helpers/finnhubClient");

class MarketNewsService {
    async getLatest(limit = 10) {
        const latest_news = await marketNewsRepository.getLatest(limit);
        return { message: "Latest news found successfully", data: latest_news.map(transformMarketNews) };
    }
    async getAllMarketNews(category, page_number, page_limit) {
        const news = await marketNewsRepository.getAllMarketNews(category, page_number, page_limit);
        return { message: "News found successfully", data: news.data.map(transformMarketNews), total_count: news.total_count, page: news.page, total_pages: news.total_pages };
    }

    async getMarketNewsCategories() {
        const categories = await marketNewsRepository.getAllCategories();
        return { message: "Categories found successfully", data: categories };
    }
    async getMarketNewsById(id) {
        const news = await marketNewsRepository.getMarketNewsById(id);
        return { message: "News found successfully", data: transformMarketNews(news) };
    }
    async createMarketNews(data) {
        const news = await marketNewsRepository.createMarketNews(data);
        return { message: "News created successfully", data: transformMarketNews(news) };
    }

    async fetchAndStoreMarketNews() {
        let allNews = [];
        const newsCategoryArray = ["general", "forex", "crypto", "top news"];
        for ( const news_category of newsCategoryArray ) {
            const news = await getMarketNews(news_category);
            allNews.push(...news.map(transformMarketNews));
        }
        try {
        await marketNewsRepository.bulkCreateMarketNews(allNews);
        console.log(`✅ Imported ${allNews.length} news from API`);
        return { message: "News imported successfully", count: allNews.length };
        } catch (err) {
            throw new Error("Failed to import news: " + err.message);
        }
    }

    async updateCompanyNews(id, data) {
        const news = await marketNewsRepository.updateMarketNews(id, data);
        return { message: "News updated successfully", data: transformMarketNews(news) };
    }
    async deleteCompanyNews(id) {
        const deleted = await marketNewsRepository.deleteMarketNews(id);
        if (!deleted) throw new Error("News not found or already deleted");
        return { message: "News deleted successfully" };
    }
}

module.exports = new MarketNewsService();