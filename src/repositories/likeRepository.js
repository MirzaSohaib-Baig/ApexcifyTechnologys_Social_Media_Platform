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

  // ── Create ─────────────────────────────────────────────────────────────────

  async likePost(userId, postId) {
    return this.create({ user: userId, post: postId });
  }

  async likeComment(userId, commentId) {
    return this.create({ user: userId, comment: commentId });
  }

  // ── Update ─────────────────────────────────────────────────────────────────
  // (not currently used but could be useful for future features like "reacting" with different emojis instead of just liking)
  async updatePostLike(id, data) {
    return this.update(id, data);
  }

  async updateCommentLike(id, data) {
    return this.update(id, data);
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
