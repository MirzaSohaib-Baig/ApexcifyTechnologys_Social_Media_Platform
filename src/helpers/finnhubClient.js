const finnhub = require('finnhub');
const settings = require('../config/settings');

const finnhubClient = new finnhub.DefaultApi(settings.FINNHUB_API_KEY);


function getQuote(symbol) {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

function getCompanyNews(symbol, from, to) {
  return new Promise((resolve, reject) => {
    finnhubClient.companyNews(symbol, from, to, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

function getMarketNews(category) {
  return new Promise((resolve, reject) => {
    finnhubClient.marketNews(category, {}, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

module.exports = { getQuote, getCompanyNews, getMarketNews };