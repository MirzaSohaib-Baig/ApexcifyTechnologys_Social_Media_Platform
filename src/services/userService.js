const userRepository = require('../repositories/userRepository');
const followRepository = require('../repositories/followRepository');
const { hashPassword, verifyPassword, generateAccessToken, generateRefreshToken } = require('../config/security');
const { transformUser } = require('../core/transformers');

class UserService {

  // ── Register ────────────────────────────────────────────────────────────────
  async register(userData) {

    // 1. Check email not already taken
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email is already registered');
    }

    // 2. Check username not already taken
    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error('Username is already taken');
    }

    userData.password = await hashPassword(userData.password);

    // 3. Create user — pre('save') hook in model hashes the password
    const user = await userRepository.create(userData);

    return {
        message : 'Registration successful',
        data: transfromUser(user)  // Strip password and format response
    };
  }

  // ── Login ───────────────────────────────────────────────────────────────────
  async login({ email, password, keepSignedIn }) {

    // 1. Fetch user WITH password field (toJSON strips it by default)
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) {
      // Same message for both cases — don't reveal which one is wrong
      throw new Error('Invalid email or password');
    }

    // 2. Verify password via security.js
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // 3. Issue tokens
    const [accessToken, accessExpiresAt]   = generateAccessToken(user);
    const [refreshToken, refreshExpiresAt] = generateRefreshToken(user);

    return {
      message: "Login successful",
      data: {
        user: transformUser(user),
        keepSignedIn: keepSignedIn,
        tokens: {
          accessToken,
          accessExpiresAt,
          refreshToken,
          refreshExpiresAt,
        }
      }
    };
  }

    // ── Get profile ─────────────────────────────────────────────────────────────
    async getUserProfile(userId) {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const [followersCount, followingCount] = await Promise.all([
            followRepository.countFollowers(userId),
            followRepository.countFollowing(userId)
        ]);

        user.followersCount = followersCount;
        user.followingCount = followingCount;
        return {
            message: 'Profile fetched successfully',
            data: transfromUser(user)
        };
    }

    // ── Update profile ──────────────────────────────────────────────────────────
    async updateUserProfile(userId, data) {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (data.username) {
            const existingUsername = await userRepository.findByUsername(data.username);
            if (existingUsername && existingUsername._id.toString() !== userId) {
                throw new Error('Username is already taken');
            }
        }
        const updatedUser = await userRepository.updateUser(userId, data);
        return {
            message: 'Profile updated successfully',
            data: transfromUser(updatedUser)
        };
    }
    
  // ── Refresh token ───────────────────────────────────────────────────────────
  async refresh(user) {
    // user is already decoded from the refresh token by jwtBearer middleware
    const [accessToken, accessExpiresAt] = generateAccessToken(user);
    return {
        message: 'Token refreshed successfully',
        data: {
            accessToken,
            accessExpiresAt
        }
    };
  }

  async searchUsers(query, page = 1, limit = 20) {
    const filter = {
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { first_name: { $regex: query, $options: 'i' } },
        { last_name: { $regex: query, $options: 'i' } }
      ]
    };
    const result = await userRepository.getAll(filter, page, limit);
    return {
      message: 'Users searched successfully',
      data: result.map(transformUser),
        total_count: result.total_count,
        page: result.page,
        total_pages: result.total_pages
    };
  }
}
    
module.exports = new UserService();