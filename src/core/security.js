const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const settings = require("../config/settings");
const LOG = {
  info: (...args) => console.log("[INFO]", ...args),
  error: (...args) => console.error("[ERROR]", ...args),
};

// Hash password
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

// Verify password
// Show me the full error in this function
async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// Create access token
function createAccessToken(data, expiresIn = null) {
  const expiresAt = new Date(Date.now() + (expiresIn || settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60 * 1000));
  const payload = { ...data, expires_at: expiresAt.toISOString() };
  const token = jwt.sign(payload, settings.JWT_SECRET_KEY, { algorithm: settings.ALGORITHM });
  return [token, expiresAt.toISOString()];
}

// Generate access token
function generateAccessToken(user) {
  return createAccessToken(
    {
      id: String(user.id)
    },
    settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60 * 1000
  );
}

// Generate refresh token
function generateRefreshToken(user) {
  return createAccessToken(
    { id: String(user.id) },
    settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60 * 1000
  );
}

// Decode token
function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, settings.JWT_SECRET_KEY, { algorithms: [settings.ALGORITHM] });
    const expiresAt = new Date(decoded.expires_at);
    if (expiresAt <= new Date()) {
      LOG.error("Token has expired");
      return null;
    }
    return decoded;
  } catch (e) {
    LOG.error("Token decode failed:", e.message);
    return {};
  }
}

// JWT Bearer middleware (Express example)
function jwtBearer(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ detail: "Invalid authentication scheme." });
  }
  const token = authHeader.split(" ")[1];
  const payload = decodeToken(token);
  if (!payload) {
    return res.status(401).json({ detail: "Invalid or expired token." });
  }
  req.user = payload;
  next();
}

module.exports = {
  hashPassword,
  verifyPassword,
  createAccessToken,
  generateAccessToken,
  generateRefreshToken,
  decodeToken,
  jwtBearer,
};