const os = require("os");
const process = require("process");
const { Sequelize } = require("sequelize");
const settings = require("./settings");

// Logging setup (using console for simplicity)
const LOG = {
  info: (...args) => console.log("[INFO]", ...args),
  critical: (...args) => console.error("[CRITICAL]", ...args),
};

// Create Sequelize instance
const sequelize = new Sequelize(settings.DATABASE_URL, {
  pool: { // pool_pre_ping equivalent
    validate: async (client) => {
      try {
        await client.query("SELECT 1");
      } catch (err) {
        throw err;
      }
    },
  },
  logging: false,
  define: { 
    freezeTableName: true,
    timestamps: true,
    underscored: true, 
  },
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    LOG.info("Pinged The database");
  } catch (error) {
    LOG.critical("failed pinging database", { error: error.message });
    process.kill(process.pid, "SIGTERM");
  }
})();

// Get DB session (Sequelize uses connection pooling automatically)
function getDb() {
  return sequelize;
}

// Initialize DB (sync models)
async function initDb() {
  try {
  await sequelize.sync();
  LOG.info("Database synchronized");
  } catch (error) {
    LOG.critical("Unable to synchronize database:", { error: error.message });
    process.kill(process.pid, "SIGTERM");
  }
}

module.exports = {
  sequelize,
  getDb,
  initDb,
};