const dividendRepository = require("../repositories/dividendRepository");
const { transformDividend } = require("../core/transformers");
const { fetchDividends } = require("../helpers/fmpClient");
const fs = require("fs");
const csv = require("csv-parser");

class DividendService {
    async createDividend(data) {
        const dividend = await dividendRepository.createDividend(data);
        return { message: "Dividend created successfully", data: transformDividend(dividend) };
    }

    async fetchAndStoreDividends() {
        return new Promise((resolve, reject) => {
            const symbols = [];
            fs.createReadStream("src/ticker_data_csv/symbols.csv")
                .pipe(csv())
                .on("data", (row) => {
                    symbols.push(row.symbol);
                })
                .on("end", async () => {
                    try {
                        let allDividends = [];
                        for (const symbol of symbols) {
                            try {
                                const dividends = await fetchDividends(symbol);

                                // Handle API "premium" message or bad responses
                                if (
                                    typeof dividends === "string" &&
                                    dividends.includes("Premium Query Parameter")
                                ) {
                                    console.warn(`⚠️ Skipping ${symbol}: Premium data not available`);
                                    continue;
                                }

                                // Handle empty array or invalid response
                                if (!Array.isArray(dividends) || dividends.length === 0) {
                                    console.warn(`⚠️ No dividends found for ${symbol}.`);
                                    continue;
                                }

                                else {
                                    console.log(` ✅ Fetched ${dividends.length} dividends for ${symbol}`);
                                }

                                allDividends.push(...dividends.map(transformDividend));
                            } catch (err) {
                                // Skip API 402 errors and keep going
                                if (err.response?.status === 402) {
                                    console.warn(`⚠️ Skipping ${symbol}: Premium access required`);
                                    continue;
                                }
                                console.error(`❌ Error fetching ${symbol}:`, err.message);
                            }
                        }

                        if (allDividends.length > 0) {
                            await dividendRepository.bulkCreateDividends(allDividends);
                            console.log(`✅ Imported ${allDividends.length} dividends from CSV`);
                        } else {
                            console.log("⚠️ No dividend data imported (all skipped or premium)");
                        }

                        resolve({
                            message: "Dividends import completed",
                            count: allDividends.length,
                        });
                    } catch (err) {
                        reject(err);
                    }
                })
                .on("error", reject);
        });
    }


    async getDividendById(id) {
        const dividend = await dividendRepository.getDividendById(id);
        return { message: "Dividend found successfully", data: transformDividend(dividend) };
    }
    async getAllDividends(page_number, page_limit) {
        const dividends = await dividendRepository.getAllDividends(page_number, page_limit);
        return { message: "Dividends found successfully", data: dividends.data.map(transformDividend), total_count: dividends.total_count, page: dividends.page, total_pages: dividends.total_pages };
    }
    async updateDividend(id, data) {
        const dividend = await dividendRepository.updateDividend(id, data);
        return { message: "Dividend updated successfully", data: transformDividend(dividend) };
    }
    async deleteDividend(id) {
        const deleted = await dividendRepository.deleteDividend(id);
        if (!deleted) throw new Error("Dividend not found or already deleted");
        return { message: "Dividend deleted successfully" };
    }
}

module.exports = new DividendService();