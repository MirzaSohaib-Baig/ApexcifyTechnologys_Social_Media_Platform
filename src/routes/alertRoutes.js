const Express = require("express");
const alert_router = Express.Router();
const alertService = require("../services/alertService");
const { jwtBearer } = require("../core/security");

alert_router.post("/create", jwtBearer, async (req, res) => {
  try {
    const result = await alertService.createAlert(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

alert_router.get("/detail/:id", jwtBearer, async (req, res) => {
  try {
    const result = await alertService.getAlertById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

alert_router.get("/trigger/:id", jwtBearer, async (req, res) => {
  try {
    const result = await alertService.markTriggered(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

alert_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await alertService.updateAlert(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

alert_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await alertService.deleteAlert(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = alert_router;
