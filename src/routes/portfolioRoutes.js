const Express = require("express");
const portfolio_router = Express.Router();
const portfolioService = require("../services/portfolioService");
const { jwtBearer } = require("../core/security");

portfolio_router.post("/create", jwtBearer, async (req, res) => {
    try {
        const result = await portfolioService.createPortfolio(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

portfolio_router.get("/user/:userId/:pageNumber/:pageLimit", jwtBearer, async (req, res) => {
  try {
    const result = await portfolioService.getPortfoliosByUserId(req.params.userId, req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

portfolio_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await portfolioService.getPortfolioById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

portfolio_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await portfolioService.updatePortfolio(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

portfolio_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await portfolioService.deletePortfolio(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

portfolio_router.post("/calculate/:userId", jwtBearer, async (req, res) => {
  try {
    const result = await portfolioService.calculatePortfolioValue(req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = portfolio_router;
