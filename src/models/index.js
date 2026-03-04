const { sequelize } = require("../config/database_config");
const User = require("./user");
const Transaction = require("./transaction");
const Portfolio = require("./portfolio");
const Stock = require("./stock");
const CompanyNews = require("./company_news");
const MarketNews = require("./market_news");
const Dividend = require("./dividend");
const Watchlist = require("./watchlist");
const Alert = require("./alert");
const Holding = require("./holding");

// Initialize models
User.init(sequelize);
Transaction.init(sequelize);
Portfolio.init(sequelize);
Stock.init(sequelize);
CompanyNews.init(sequelize);
MarketNews.init(sequelize);
Dividend.init(sequelize);
Watchlist.init(sequelize);
Alert.init(sequelize);
Holding.init(sequelize);

const models = { User, Transaction, Portfolio, Stock, CompanyNews, MarketNews, Dividend, Watchlist, Alert, Holding };

// Set up associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, ...models };
