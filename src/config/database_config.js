const process  = require('process');
const mongoose = require('mongoose');
const settings = require('./settings');

// ── Logger (swap out for winston/pino in production) ──────────────────────────
const LOG = {
  info:     (...args) => console.log ('[INFO]    ', ...args),
  warn:     (...args) => console.warn ('[WARN]    ', ...args),
  critical: (...args) => console.error('[CRITICAL]', ...args),
};

// ── State ─────────────────────────────────────────────────────────────────────
let isConnected = false;

// ── Connect ───────────────────────────────────────────────────────────────────
async function connectDB() {
  if (isConnected) {
    LOG.info('Reusing existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(settings.MONGOOSE_URI, {
      maxPoolSize: 10, // concurrent operations before queuing
    });

    isConnected = true;
    LOG.info(`MongoDB connected → ${mongoose.connection.host}`);
  } catch (err) {
    LOG.critical('Initial DB connection failed', { error: err.message });
    process.kill(process.pid, 'SIGTERM'); // consistent with original code
  }
}

// ── Initialise indexes ────────────────────────────────────────────────────────
// Call this once after connectDB() to ensure all schema indexes are in sync.
// Equivalent to Sequelize's syncIndexes().
async function initDb() {
  try {
    await mongoose.connection.syncIndexes();
    LOG.info('Database indexes synchronised');
  } catch (err) {
    LOG.critical('Unable to synchronise indexes', { error: err.message });
    process.kill(process.pid, 'SIGTERM');
  }
}

// ── Connection event listeners ────────────────────────────────────────────────
mongoose.connection.on('disconnected', () => {
  LOG.warn('MongoDB disconnected — Mongoose will attempt to reconnect');
  isConnected = false;
});

mongoose.connection.on('reconnected', () => {
  LOG.info('MongoDB reconnected');
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  LOG.critical('MongoDB connection error', { error: err.message });
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
async function gracefulShutdown(signal) {
  LOG.info(`${signal} received — closing MongoDB connection`);
  await mongoose.connection.close();
  LOG.info('MongoDB connection closed');
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));

// ── Exports ───────────────────────────────────────────────────────────────────
// getDb() mirrors the original API so existing callers don't break.
function getDb() {
  return mongoose.connection;
}

module.exports = { connectDB, initDb, getDb };