const Express = require("express");
const user_router = Express.Router();
const userService = require("../services/userService");
const { jwtBearer } = require("../core/security");

// Register a new user
user_router.post("/register", async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    // console.log("User registered:", req.body);
    res.status(201).json(result); // { message, data }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Login a user and generate tokens
user_router.post("/login", async (req, res) => {
  try {
    const result = await userService.loginUser(req.body.email, req.body.password, req.body.keepSignedIn);
    const { refreshToken, refreshExpires } = result.data.tokens;
    if (result.data.keepSignedIn) {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        expires: new Date(refreshExpires),
      });
    }
    res.json(result); // { data, accessToken, refreshToken, ... }
  } catch (error) {
    // console.log("Login error:", error);
    res.status(400).json({ error: error.message });
  }
});

user_router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});


// Get user profile (protected route)
user_router.get("/profile/:id", jwtBearer, async (req, res) => {
  try {
    const result = await userService.getUserProfile(req.params.id);
    res.json(result); // { message, data }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update user profile (protected route)
user_router.put("/update/:id", jwtBearer, async (req, res) => {
  try {
    const result = await userService.updateUserProfile(req.params.id, req.body);
    res.json(result); // { message, data }
  } catch (error) {
    // console.error("Update error:", error);
    res.status(400).json({ error: error.message });
  }
});

user_router.put("/change-password/:id/", jwtBearer, async (req, res) => {
  try {
    const result = await userService.changePassword(req.params.id, req.body);
    // console.log("Change Password:", result);
    
    res.json(result); // { message, data }
  } catch (error) {
    // console.error("Update error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Delete user profile (protected route)
user_router.delete("/delete/:id", jwtBearer, async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result); // { message }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = user_router;
