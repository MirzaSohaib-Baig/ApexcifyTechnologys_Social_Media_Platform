const BaseRepository = require('./baseRepository');
const { Follow } = require('../models');

class FollowRepository extends BaseRepository {
  constructor() {
    super(Follow);
  }

  // ── Lookup ─────────────────────────────────────────────────────────────────

  // Check if a follow relationship already exists
  async findFollow(followerId, followingId) {
    return this.getOne({ follower: followerId, following: followingId });
  }

  // ── Followers / Following lists ────────────────────────────────────────────

  // People who follow userId
  async getFollowers(userId, page = 1, limit = 20) {
    return this.getAll(
      { following: userId },
      page,
      limit,
      { createdAt: -1 },
      'follower'   // populate the follower's user details
    );
  }

  // People that userId follows
  async getFollowing(userId, page = 1, limit = 20) {
    return this.getAll(
      { follower: userId },
      page,
      limit,
      { createdAt: -1 },
      'following'  // populate the following user's details
    );
  }

  // ── Unfollow (delete by filter, not by id) ─────────────────────────────────

  async unfollow(followerId, followingId) {
    return Follow.findOneAndDelete({ follower: followerId, following: followingId });
  }

  // ── Counts ─────────────────────────────────────────────────────────────────

  async countFollowers(userId) {
    return Follow.countDocuments({ following: userId });
  }

  async countFollowing(userId) {
    return Follow.countDocuments({ follower: userId });
  }

  // ── Feed helper ────────────────────────────────────────────────────────────
  // Returns a plain array of user IDs that userId follows —
  // PostRepository.getFeed() passes this list to a $in query

  async getFollowingIds(userId) {
    const follows = await Follow.find({ follower: userId }).select('following');
    return follows.map(f => f.following);
  }
}

module.exports = new FollowRepository();