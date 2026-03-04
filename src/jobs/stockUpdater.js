const stockRepository = require("../repositories/stockRepository");
const stockService = require("../services/stockService");
const { getQuote } = require("../helpers/finnhubClient");

async function updateAllStocksJob() {
        const tickers = await stockService.getAllStocks(1, 100);
        // console.log("Tickers fetched:", tickers.data.map(t => t.ticker));
        

        for (let i = 0; i < tickers.data.length; i++) {
            const t = tickers.data[i];
            
            try {
                const data = await getQuote(t.ticker);

                if (!data || !data.c) {
                    console.log(`No quote found for ${t.ticker} (${i + 1}/${tickers.data.length})`);
                    continue;
                }

                await stockRepository.updateStockQuote(t.ticker, { 
                    current_price: data.c,
                    change: data.d,
                    percent_change: data.dp,
                    high_price_of_day: data.h,
                    low_price_of_day: data.l,
                    open_price_of_day: data.o,
                    previous_close: data.pc 
                });

                console.log(`Quote updated for ${t.ticker} (${i + 1}/${tickers.data.length})`);

            } catch (err) {
                console.error(`Error updating quote for ${t.ticker}:`, err);
            }

            // ⏳ wait 1 second before next request
            await new Promise(res => setTimeout(res, 1000));
        }

        return {message: "Finished background stock update job."};

}

updateAllStocksJob();

module.exports = { updateAllStocksJob };
