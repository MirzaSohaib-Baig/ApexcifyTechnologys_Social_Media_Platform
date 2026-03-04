const Express = require("express");
const dividend_router = Express.Router();
const dividendService = require("../services/dividendService");
const { jwtBearer } = require("../core/security");

dividend_router.get("/all/:pageNumber/:pageLimit", jwtBearer, async (req, res) => {
  try {
    const result = await dividendService.getAllDividends(req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

dividend_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await dividendService.getDividendById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

dividend_router.post("/create", jwtBearer, async (req, res) => {
  try {
    const result = await dividendService.createDividend(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dividend_router.post("/fetch-and-store", async (req, res) => {
  try {
    const result = await dividendService.fetchAndStoreDividends();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dividend_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await dividendService.updateDividend(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dividend_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await dividendService.deleteDividend(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = dividend_router;
