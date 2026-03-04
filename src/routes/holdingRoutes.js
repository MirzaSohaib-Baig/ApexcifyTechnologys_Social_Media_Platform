const Express = require("express");
const holding_router = Express.Router();
const holdingService = require("../services/holdingService");
const { jwtBearer } = require("../core/security");

// Get all holdings for a user
holding_router.get("/user/:userId/:pageNumber/:pageLimit", jwtBearer,  async (req, res) => {
  try {
    const result = await holdingService.getHoldingsByUserId(req.params.userId, req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get holding by ID
holding_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await holdingService.getHoldingById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create holding
holding_router.post("/create", jwtBearer, async (req, res) => {
  try {
    const result = await holdingService.createHolding(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Dividend Symbols
holding_router.get("/dividend-symbols", jwtBearer, async (req, res) => {
  try {
    const result = await holdingService.getAllDividendSymbols();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update holding
holding_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await holdingService.updateHolding(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete holding
holding_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await holdingService.deleteHolding(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user dividend payouts
holding_router.get("/payouts/:userId/:pageNumber/:pageLimit", jwtBearer, async (req, res) => {
  try {
    const result = await holdingService.getUserDividendPayouts(req.params.userId, req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = holding_router;