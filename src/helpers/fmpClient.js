const axios = require('axios');
const settings = require('../config/settings');


async function fetchDividends(symbol) {
    try {
        const url = `https://financialmodelingprep.com/stable/dividends?symbol=${symbol}&apikey=${settings.FMP_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { fetchDividends };