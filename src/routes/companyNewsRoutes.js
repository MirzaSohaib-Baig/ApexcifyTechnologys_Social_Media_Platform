const Express = require("express");
const company_news_router = Express.Router();
const companyNewsService = require("../services/companyNewsService");
const { jwtBearer } = require("../core/security");

company_news_router.get("/all/:ticker/:pageNumber/:pageLimit", async (req, res) => {
  try {
    const result = await companyNewsService.getAllCompanyNews(req.params.ticker, req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

company_news_router.get("/tickers", async (req, res) => {
  try {
    const result = await companyNewsService.getCompanyNewsTickers();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
})

company_news_router.post("/create", jwtBearer, async (req, res) => {
  try {
    const result = await companyNewsService.createCompanyNews(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

company_news_router.post("/fetch-and-store", async (req, res) => {
  try {
    const result = await companyNewsService.fetchAndStoreCompanyNews();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

company_news_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await companyNewsService.updateCompanyNews(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

company_news_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await companyNewsService.deleteCompanyNews(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

company_news_router.get("/latest/:limit", jwtBearer, async (req, res) => {
  try {
    const result = await companyNewsService.getLatest(req.params.limit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

company_news_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await companyNewsService.getCompanyNewsById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = company_news_router;
