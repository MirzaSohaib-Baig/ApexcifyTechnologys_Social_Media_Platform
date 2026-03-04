const express = require("express");
const auth_router = express.Router();
const auth = require("../core/security");

auth_router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken; // 👈 read cookie

  if (!refreshToken) { 
    return res.status(401).json({ detail: "Refresh token missing" });
  }

  const decoded = auth.decodeToken(refreshToken);
  if (!decoded || !decoded.id) {
    return res.status(403).json({ detail: "Invalid or expired refresh token" });
  }

  // Generate new access token
  const [newAccessToken, newAccessExpires] = auth.generateAccessToken({ id: decoded.id });

  res.json({
    message: "Token refreshed successfully",
    data: {
      accessToken: newAccessToken,
      accessExpires: newAccessExpires,
    },
  });
});

module.exports = auth_router;
