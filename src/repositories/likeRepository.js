const BaseRepository = require('./baseRepository');
const { Like } = require('../models');

class LikeRepository extends BaseRepository {
  constructor() {
    super(Like);
  }

  // ── Lookup ─────────────────────────────────────────────────────────────────

  // Check if a like already exists — used by service before creating
  // to give a clean "already liked" error instead of a duplicate key crash
  async findPostLike(userId, postId) {
    return this.getOne({ user: userId, post: postId });
  }

  async findCommentLike(userId, commentId) {
    return this.getOne({ user: userId, comment: commentId });
  }

  // ── Delete by filter (not by id) ───────────────────────────────────────────
  // When unliking we know user+target, not the like's _id

  async deletePostLike(userId, postId) {
    return Like.findOneAndDelete({ user: userId, post: postId });
  }

  async deleteCommentLike(userId, commentId) {
    return Like.findOneAndDelete({ user: userId, comment: commentId });
  }

  // ── Counts ─────────────────────────────────────────────────────────────────

  async countPostLikes(postId) {
    return Like.countDocuments({ post: postId });
  }

  async countCommentLikes(commentId) {
    return Like.countDocuments({ comment: commentId });
  }
}

module.exports = new LikeRepository();
