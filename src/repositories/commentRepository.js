const BaseRepository = require('./baseRepository');
const { Comment } = require('../models');

class CommentRepository extends BaseRepository {
  constructor() {
    super(Comment);
  }

    async createComment(data) {
      return this.create(data);
    }

  // All top-level comments on a post (no parent), oldest first
  // so comments read chronologically top to bottom
  async getByPost(postId, page = 1, limit = 20) {
    return this.getAll(
      { post: postId, parent_comment: null },
      page,
      limit,
      { createdAt: 1 },   // 1 = ascending (oldest first)
      'user'
    );
  }

  // Replies to a specific comment
  async getReplies(commentId, page = 1, limit = 10) {
    return this.getAll(
      { parent_comment: commentId },
      page,
      limit,
      { createdAt: 1 },
      'user'
    );
  }

  // All comments by a user — used on profile liked/commented tab
  async getByUser(userId, page = 1, limit = 20) {
    return this.getAll(
      { user: userId },
      page,
      limit,
      { createdAt: -1 },
      'post'
    );
  }

  // ── Counts ──────────────────────────────────────────────────────────────────

  async incrementLikes(commentId) {
    return Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes_count: 1 } },
      { new: true }
    );
  }

  async decrementLikes(commentId) {
    return Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes_count: -1 } },
      { new: true }
    );
  }

  async updateComment(id, data) {
    return this.update(id, data);
  }

  async deleteComment(id) {
    return this.delete(id);
  }
}

module.exports = new CommentRepository();