const watchlistRepository = require("../repositories/watchlistRepository");
const { transformWatchlist, transformStock } = require("../core/transformers");

class WatchlistService {

    async createWatchlist(watchlistData) {
        const watchlist = await watchlistRepository.createWatchlist(watchlistData);
        return {
            message: "Watchlist created successfully",
            data: transformWatchlist(watchlist),
        };
    }
    async getAllWatchlistByUserId(user_id, watchlist_page_number, watchlist_page_limit, stock_page_number, stock_page_limit) {
    const { data, total_watchlists, watchlist_page, watchlist_total_pages } =
        await watchlistRepository.getAllWatchlistByUserId(user_id, watchlist_page_number, watchlist_page_limit, stock_page_number, stock_page_limit);

    const transformedData = data.map((w) => ({
        ...transformWatchlist(w),
        stocks: w.stocks ? w.stocks.map(transformStock) : [],
        stock_page: w.stock_page,
        stock_total_pages: w.stock_total_pages,
    }));

    return {
        message: "Watchlists found successfully",
        data: transformedData,
        total_watchlists: total_watchlists,
        watchlist_page: watchlist_page,
        watchlist_total_pages: watchlist_total_pages,
    };
    }


    async getWatchlistById(id) {
        const watchlist = await watchlistRepository.getWatchlistById(id);
        if (!watchlist) throw new Error("Watchlist not found");
        return {
        message: "Watchlist found successfully",
        data: transformWatchlist(watchlist),
        };
    }

    async deleteWatchlist(id) {
        const deleted = await watchlistRepository.deleteWatchlist(id);
        if (!deleted) throw new Error("Watchlist not found or already deleted");
        return { message: "Watchlist deleted successfully" };
    }

    async updateWatchlist(id, updateData) {
        const updated = await watchlistRepository.updateWatchlist(id, updateData);
        if (!updated) throw new Error("Watchlist not found");
        return {
        message: "Watchlist updated successfully",
        data: transformWatchlist(updated),
        };
    }

    async addToWatchlist(watchlistData) {
        const watchlist = await watchlistRepository.addToWatchlist(watchlistData);
        return {
            message: "Stock added to watchlist successfully",
            data: transformWatchlist(watchlist),
        };
    }

    async removeFromWatchlist(watchlistId, stockId) {
        const watchlist = await watchlistRepository.removeFromWatchlist(watchlistId, stockId);
        return {
            message: "Stock removed from watchlist successfully",
            data: transformWatchlist(watchlist),
        };
    }
}

module.exports = new WatchlistService();