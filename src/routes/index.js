const express = require("express");
const router = express.Router();

// Import routers
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const watchlistRoutes = require("./watchlistRoutes");
const stockRoutes = require("./stockRoutes");
const transactionRoutes = require("./transactionRoutes");
const portfolioRoutes = require("./portfolioRoutes");
const alertRoutes = require("./alertRoutes");
const companyNewsRoutes = require("./companyNewsRoutes");
const marketNewsRoutes = require("./marketNewsRoutes");
const dividendRoutes = require("./dividendRoutes");
const holdingRoutes = require("./holdingRoutes");

// Mount routers
router.use("/v0/auth", authRoutes);
router.use("/v1/users", userRoutes);
router.use("/v2/watchlists", watchlistRoutes);
router.use("/v3/stocks", stockRoutes);
router.use("/v4/transactions", transactionRoutes);
router.use("/v5/portfolios", portfolioRoutes);
router.use("/v6/alerts", alertRoutes);
router.use("/v7/company-news", companyNewsRoutes);
router.use("/v8/market-news", marketNewsRoutes);
router.use("/v9/dividends", dividendRoutes);
router.use("/v10/holdings", holdingRoutes);

module.exports = router;
