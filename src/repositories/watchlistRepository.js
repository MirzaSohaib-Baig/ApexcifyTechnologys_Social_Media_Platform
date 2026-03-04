const { Watchlist, Stock } = require("../models");
const BaseRepository = require("./baseRepository");

class WatchlistRepository extends BaseRepository {
    constructor() {
        super(Watchlist);
    }
    async createWatchlist(watchlistData) {
        return await this.create(watchlistData);
    }

    // async getAllWatchlistByUserId(user_id, page_number, page_limit) {
    //     return await this.getAll({ user_id }, page_number, page_limit, [{ model: Stock, as: "stocks" }]);
    // }

    async getAllWatchlistByUserId(user_id, watchlistPage, watchlistLimit, stockPage, stockLimit) {
    const offset = (watchlistPage - 1) * watchlistLimit;

    const { count, rows: watchlists } = await Watchlist.findAndCountAll({
        where: { user_id },
        limit: watchlistLimit,
        offset,
        distinct: true, // ensures correct count when using includes
    });

    // For each watchlist, fetch its paginated stocks
    const data = await Promise.all(
        watchlists.map(async (watchlist) => {
        const stocks = await watchlist.getStocks({
            limit: stockLimit,
            offset: (stockPage - 1) * stockLimit,
            order: [["createdAt", "DESC"]],
        });

        const totalStocks = await watchlist.countStocks();

        return {
            ...watchlist.toJSON(),
            stocks,
            stock_page: stockPage,
            stock_total_pages: Math.ceil(totalStocks / stockLimit),
        };
        })
    );

    return {
        data: data,
        total_watchlists: count,
        watchlist_page: watchlistPage,
        watchlist_total_pages: Math.ceil(count / watchlistLimit),
    };
    }
        

    async getWatchlistById(id) {
        return await this.getById({id});
    }

    async deleteWatchlist(id) {
        return await this.delete(id);
    }

    async updateWatchlist(id, updateData) {
        return await this.update(id, updateData);
    }

    async addToWatchlist(watchlistData) {
        const stock = await Stock.findOne({ where: { ticker: watchlistData.ticker } });
        if (!stock) throw new Error("Stock not found");

        let watchlist = await Watchlist.findOne({ where: { user_id: watchlistData.user_id, name: watchlistData.name } });
        if (!watchlist) {
            watchlist = await this.createWatchlist(watchlistData);
        }

        await watchlist.addStock(stock);
        return watchlist;
    }

    async removeFromWatchlist(watchlistId, stockId) {
        const watchlist = await this.getById({ id: watchlistId });
        if (!watchlist) throw new Error("Watchlist not found");

        const stock = await Stock.findOne({ where: { id: stockId } });
        if (!stock) throw new Error("Stock not found");

        await watchlist.removeStock(stock);
        return watchlist;
    }
}

module.exports = new WatchlistRepository();