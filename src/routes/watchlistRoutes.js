const Express = require("express");
const watchlist_router = Express.Router();
const watchlistService = require("../services/watchlistService");
const { jwtBearer } = require("../core/security");


// Create a new watchlist
watchlist_router.post("/create", jwtBearer,  async (req, res) => {
  try {
    const result = await watchlistService.createWatchlist(req.body);
    console.log("Watchlist:", result);
    
    // res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all watchlists for a user
watchlist_router.get("/user/:userId/:watchlistPageNumber/:watchlistPageLimit/:stockPageNumber/:stockPageLimit",  async (req, res) => {
  try {
    const result = await watchlistService.getAllWatchlistByUserId(req.params.userId, req.params.watchlistPageNumber, req.params.watchlistPageLimit, req.params.stockPageNumber, req.params.stockPageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get watchlist by ID
watchlist_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await watchlistService.getWatchlistById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update watchlist
watchlist_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await watchlistService.updateWatchlist(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete watchlist
watchlist_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await watchlistService.deleteWatchlist(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add stock to watchlist
watchlist_router.post("/add", jwtBearer, async (req, res) => {
  try {
    const result = await watchlistService.addToWatchlist(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove stock from watchlist
watchlist_router.post("/remove/:id/:stockId", jwtBearer, async (req, res) => {
  try {
    const result = await watchlistService.removeFromWatchlist(req.params.id, req.params.stockId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = watchlist_router;
