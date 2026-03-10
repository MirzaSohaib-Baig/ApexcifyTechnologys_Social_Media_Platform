const likeRepository    = require('../repositories/likeRepository');
const postRepository    = require('../repositories/postRepository');
const commentRepository = require('../repositories/commentRepository');
const { transformLike } = require('../core/transformers');

class LikeService {

  // ── Like / unlike a post ────────────────────────────────────────────────────
  async likePost(likeData) {
    const post = await postRepository.getById(likeData.post);
    if (!post) throw new Error('Post not found');

    const existing = await likeRepository.findPostLike(likeData.user, likeData.post);
    if (existing) throw new Error('You have already liked this post');

    const like = await likeRepository.create(likeData);

    // Keep denormalised count in sync atomically
    await postRepository.incrementLikes(likeData.post);

    return {
        message: 'Post liked successfully',
        data: transformLike(like)
    };
  }

  async unlikePost(likeData) {
    const deleted = await likeRepository.deletePostLike(likeData.user, likeData.post);
    if (!deleted) throw new Error('You have not liked this post');

    await postRepository.decrementLikes(likeData.post);
    return {
        message: 'Post unliked successfully'
        // data: transformLike(deleted) // Optionally return the like that was deleted, but it may not be necessary for frontend
    };
  }

  // ── Like / unlike a comment ─────────────────────────────────────────────────
  async likeComment(likeData) {
    const comment = await commentRepository.getById(likeData.comment);
    if (!comment) throw new Error('Comment not found');

    const existing = await likeRepository.findCommentLike(likeData.user, likeData.comment);
    if (existing) throw new Error('You have already liked this comment');

    const like = await likeRepository.create(likeData);

    await commentRepository.incrementLikes(likeData.comment);

    return {
        message: 'Comment liked successfully',
        data: transformLike(like)
    };
  }

  async unlikeComment(likeData) {
    const deleted = await likeRepository.deleteCommentLike(likeData.user, likeData.comment);
    if (!deleted) throw new Error('You have not liked this comment');

    await commentRepository.decrementLikes(likeData.comment);
    return {
        message: 'Comment unliked successfully',
        data: transformLike(deleted)
    };
  }
}

module.exports = new LikeService();