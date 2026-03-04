const Express = require("express");
const market_news_router = Express.Router();
const marketNewsService = require("../services/marketNewsService");
const { jwtBearer } = require("../core/security");

market_news_router.get("/all/:category/:pageNumber/:pageLimit", async (req, res) => {
  try {
    const result = await marketNewsService.getAllMarketNews(req.params.category, req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

market_news_router.get("/categories", async (req, res) => {
  try {
    const result = await marketNewsService.getMarketNewsCategories();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
})

market_news_router.post("/create", jwtBearer, async (req, res) => {
  try {
    const result = await marketNewsService.createMarketNews(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

market_news_router.post("/fetch-and-store", async (req, res) => {
  try {
    const result = await marketNewsService.fetchAndStoreMarketNews();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

market_news_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await marketNewsService.updateMarketNews(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

market_news_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await marketNewsService.deleteMarketNews(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

market_news_router.get("/latest/:limit", jwtBearer, async (req, res) => {
  try {
    const result = await marketNewsService.getLatest(req.params.limit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

market_news_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await marketNewsService.getMarketNewsById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = market_news_router;
