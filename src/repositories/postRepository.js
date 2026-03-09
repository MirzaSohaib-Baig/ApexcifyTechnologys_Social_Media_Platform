const BaseRepository = require('./baseRepository');
const { Post } = require('../models');

class PostRepository extends BaseRepository {
  constructor() {
    super(Post);
  }

  // ── Feed ───────────────────────────────────────────────────────────────────

  // Home feed: posts from a list of user IDs (the people someone follows)
  // plus their own posts, newest first, paginated
  async getFeed(userIds, page = 1, limit = 20) {
    return this.getAll(
      { user: { $in: userIds }, share_with: 'public' },
      page,
      limit,
      { createdAt: -1 },
      'user'  // populate author details
    );
  }

  // All posts by a single user — used on profile page
  async getByUser(userId, page = 1, limit = 20) {
    return this.getAll(
      { user: userId },
      page,
      limit,
      { createdAt: -1 },
      'user'
    );
  }

  // ── Hashtag search ─────────────────────────────────────────────────────────

  async getByHashtag(tag, page = 1, limit = 20) {
    return this.getAll(
      { hashtags: tag.toLowerCase(), share_with: 'public' },
      page,
      limit,
      { createdAt: -1 },
      'user'
    );
  }

  // ── Counts (atomic — never fetch the whole doc just to update a number) ───

  async incrementLikes(postId) {
    return Post.findByIdAndUpdate(
      postId,
      { $inc: { likes_count: 1 } },
      { new: true }
    );
  }

  async decrementLikes(postId) {
    return Post.findByIdAndUpdate(
      postId,
      { $inc: { likes_count: -1 } },
      { new: true }
    );
  }

  async incrementComments(postId) {
    return Post.findByIdAndUpdate(
      postId,
      { $inc: { comments_count: 1 } },
      { new: true }
    );
  }

  async decrementComments(postId) {
    return Post.findByIdAndUpdate(
      postId,
      { $inc: { comments_count: -1 } },
      { new: true }
    );
  }
}

module.exports = new PostRepository();