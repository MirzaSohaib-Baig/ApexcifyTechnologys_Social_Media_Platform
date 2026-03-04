const Express = require("express");
const stock_router = Express.Router();
const stockService = require("../services/stockService");
const { jwtBearer } = require("../core/security");


stock_router.post("/fetch-and-store",  async (req, res) => {
  try {
    const result = await stockService.fetchAndStoreStocks();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

stock_router.get("/all/:pageNumber/:pageLimit", jwtBearer, async (req, res) => {
  try {
    const result = await stockService.getAllStocks(req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

stock_router.get("/trending/:pageNumber/:pageLimit", jwtBearer, async (req, res) => {
  try {
    const result = await stockService.getTrendingStocks(req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
})

stock_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await stockService.getStockById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

stock_router.get("/detail/:symbol", jwtBearer, async (req, res) => {
  try {
    const result = await stockService.getStockBySymbol(req.params.symbol);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

stock_router.post("/create", jwtBearer, async (req, res) => {
  try {
    const result = await stockService.createStock(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

stock_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await stockService.updateStock(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

stock_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await stockService.deleteStock(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = stock_router;
