const userRepository = require("../repositories/userRepository");
const auth = require("../core/security");
const { transformUser } = require("../core/transformers");

class UserService {
  async registerUser(userData) {
    // Check if user already exists
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = auth.hashPassword(userData.password);

    userData.password = hashedPassword;

    const user = await userRepository.createUser(userData);

    return { message: "User created successfully", data: transformUser(user) };
  }

  async loginUser(email, password, keepSignedIn) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Verify password
    const isPasswordValid = auth.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate tokens (with your auth functions)
    const [accessToken, accessExpires] = auth.generateAccessToken(user);
    const [refreshToken, refreshExpires] = auth.generateRefreshToken(user);

    return {
      message: "Login successful",
      data: {
        user: transformUser(user),
        keepSignedIn: keepSignedIn,
        tokens: {
          accessToken,
          accessExpires,
          refreshToken,
          refreshExpires,
        }
      }
    };

  }

  async getUserProfile(userId) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User found successfully", data: transformUser(user) };
  }

  async updateUserProfile(userId, updateData) {
    const updatedUser = await userRepository.updateUser(userId, updateData);
    return { message: "Profile updated successfully", data: transformUser(updatedUser) };
  }

  async changePassword(userId, passwordData) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = auth.verifyPassword(passwordData.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid current password");
    }
    const hashedPassword = auth.hashPassword(passwordData.newPassword);
    await userRepository.changePassword(userId, hashedPassword);
    return { message: "Password changed successfully" };
  }

  async deleteUser(userId) {
    const deleted = await userRepository.deleteUser(userId);
    if (!deleted) {
      throw new Error("User not found or already deleted");
    }
    return { message: "User deleted successfully" };
  }
}

module.exports = new UserService();
