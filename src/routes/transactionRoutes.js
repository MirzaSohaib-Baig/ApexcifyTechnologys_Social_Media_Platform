const Express = require("express");
const transaction_router = Express.Router();
const transactionService = require("../services/transactionService");
const { jwtBearer } = require("../core/security");

// Get all transactions for a user
transaction_router.get("/user/:userId/:pageNumber/:pageLimit", jwtBearer, async (req, res) => {
  try {
    const result = await transactionService.getAllTransactionsByUserId(req.params.userId, req.params.pageNumber, req.params.pageLimit);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create a transaction
transaction_router.post("/create", jwtBearer, async (req, res) => {
  try {
    const result = await transactionService.createTransaction(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get transaction by id
transaction_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await transactionService.getTransactionById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update transaction
transaction_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await transactionService.updateTransaction(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete transaction
transaction_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await transactionService.deleteTransaction(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = transaction_router;
