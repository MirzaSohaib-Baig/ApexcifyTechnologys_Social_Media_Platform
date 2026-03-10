const followRepository = require('../repositories/followRepository');
const userRepository   = require('../repositories/userRepository');
const { transformFollow } = require('../core/transformers');

class FollowService {

  async follow(followData) {
    // Cannot follow yourself
    if (String(followData.follower) === String(followData.following)) {
      throw new Error('You cannot follow yourself');
    }

    // Target user must exist
    const target = await userRepository.getById(followData.following);
    if (!target) throw new Error('User not found');

    // Already following?
    const existing = await followRepository.findFollow(followData.follower, followData.following);
    if (existing) throw new Error('You are already following this user');

    const follow = await followRepository.create(followData);
    return {
        message: 'Follow successful',
        data: transformFollow(follow)
    };
  }

  async unfollow(followerId, followingId) {
    const deleted = await followRepository.unfollow(followerId, followingId);
    if (!deleted) throw new Error('You are not following this user');
    return true;
  }

  async getFollowers(userId, page = 1, limit = 20) {
    const user = await userRepository.getById(userId);
    if (!user) throw new Error('User not found');
    return followRepository.getFollowers(userId, page, limit);
  }

  async getFollowing(userId, page = 1, limit = 20) {
    const user = await userRepository.getById(userId);
    if (!user) throw new Error('User not found');
    const following = await followRepository.getFollowing(userId, page, limit);
    return {
        message: 'Following list fetched successfully',
        data: following.map(transformFollow),
        total_count: following.total_count,
        page: following.page,
        total_pages: following.total_pages
    };
  }

  // Returns a plain boolean — useful for "is follow button active?" on frontend
  async isFollowing(followerId, followingId) {
    const follow = await followRepository.findFollow(followerId, followingId);
    return follow !== null;
  }
}

module.exports = new FollowService();