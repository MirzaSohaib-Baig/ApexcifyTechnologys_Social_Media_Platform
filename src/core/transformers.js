const {User, Watchlist, Stock, Transaction, Portfolio, Dividend, CompanyNews, MarketNews, Alert, Holding} = require("../models");

const transformUser = (user = User) => {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        image: user.image,
        facebook_id: user.facebook_id,
        x_id: user.x_id,
        linkedin_id: user.linkedin_id,
        instagram_id: user.instagram_id,
        country: user.country,
        city_state: user.city_state,
        postal_code: user.postal_code,
        tax_id: user.tax_id,
        created_at: user.createdAt
    };
};

const transformWatchlist = (watchlist = Watchlist) => {
    return {
        id: watchlist.id,
        user_id: watchlist.user_id,
        name: watchlist.name,
        // company_name: watchlist.company_name,
        // ticker: watchlist.ticker,
        // current_price: Stock.current_price,
        // change: Stock.change,
        // percent_change: Stock.percent_change,
        // high_price_of_day: Stock.high_price_of_day,
        // low_price_of_day: Stock.low_price_of_day,
        // open_price_of_day: Stock.open_price_of_day,
        // previous_close: Stock.previous_close,
        created_at: watchlist.createdAt
    };
};

const transformStock = (stock = Stock) => {
    return {
        id: stock.id,
        company_name: stock.company_name,
        ticker: stock.ticker,
        current_price: stock.current_price,
        change: stock.change,
        percent_change: stock.percent_change,
        high_price_of_day: stock.high_price_of_day,
        low_price_of_day: stock.low_price_of_day,
        open_price_of_day: stock.open_price_of_day,
        previous_close: stock.previous_close,
        created_at: stock.createdAt
    };
};

const transformTransaction = (transaction = Transaction) => {
    return {
        id: transaction.id,
        name: transaction.name,
        date: transaction.date,
        category: transaction.category,
        amount: transaction.amount,
        quantity: transaction.quantity,
        price_at_transaction: transaction.price_at_transaction,
        side: transaction.side,
        status: transaction.status,
        payment_type: transaction.payment_type,
        user_id: transaction.user_id,
        stock_id: transaction.stock_id,
        created_at: transaction.createdAt
    };
};

const transformPortfolio = (portfolio = Portfolio) => {
    return {
        id: portfolio.id,
        total_value: portfolio.total_value,
        risk_score: portfolio.risk_score,
        user_id: portfolio.user_id,
        created_at: portfolio.createdAt
    };
};

const transformDividend = (dividend = Dividend) => {
    const isValidDate = (d) => !isNaN(new Date(d).getTime());
    return {
        id: dividend.id,
        symbol: dividend.symbol,
        date: isValidDate(dividend.date) ? new Date(dividend.date).toISOString().split('T')[0] : null,
        recordDate: isValidDate(dividend.recordDate) ? new Date(dividend.recordDate).toISOString().split('T')[0] : null,
        paymentDate: isValidDate(dividend.paymentDate) ? new Date(dividend.paymentDate).toISOString().split('T')[0] : null,
        declarationDate: isValidDate(dividend.declarationDate) ? new Date(dividend.declarationDate).toISOString().split('T')[0] : null,
        adjDividend: dividend.adjDividend,
        dividend: dividend.dividend,
        yield: dividend.yield,
        frequency: dividend.frequency,
        user_id: dividend.user_id,
        created_at: dividend.createdAt
    };
};

const transformHolding = (holding = Holding) => {
    return {
        id: holding.id,
        user_id: holding.user_id,
        symbol: holding.symbol,
        shares: holding.shares,
        created_at: holding.createdAt
    };
};

const transformCompanyNews = (news = CompanyNews) => {
    return {
        category: news.category,
        datetime: new Date(news.datetime * 1000).toISOString().split('T')[0],
        headline: news.headline,
        news_id: news.id,
        image: news.image,
        related: news.related,
        source: news.source,
        summary: news.summary,
        url: news.url,
        created_at: news.createdAt,
    };
};

const transformMarketNews = (news = MarketNews, ) => {
    return {
        news_category: news.news_category,
        category: news.category,
        datetime: new Date(news.datetime * 1000).toISOString().split('T')[0],
        headline: news.headline,
        news_id: news.id,
        image: news.image,
        related: news.related,
        source: news.source,
        summary: news.summary,
        url: news.url,
        created_at: news.createdAt,
    };
};

const transformAlert = (alert = Alert) => {
    return {
        id: alert.id,
        ticker: alert.ticker,
        condition: alert.condition,
        triggered: alert.triggered,
        user_id: alert.user_id,
        created_at: alert.createdAt
    };
};

module.exports = { transformUser, transformWatchlist, transformStock, transformTransaction, transformPortfolio, transformDividend, transformCompanyNews, transformMarketNews, transformAlert, transformHolding };