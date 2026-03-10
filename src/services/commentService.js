const commentRepository = require('../repositories/commentRepository');
const postRepository    = require('../repositories/postRepository');
const { transformComment } = require('../core/transformers');

class CommentService {

  async addComment(commentData) {
    if (!content?.trim()) throw new Error('Comment cannot be empty');

    // Verify the post exists before adding a comment to it
    const post = await postRepository.getById(commentData.post);
    if (!post) throw new Error('Post not found');

    // If this is a reply, verify the parent comment exists
    if (commentData.parent_comment) {
      const parent = await commentRepository.getById(commentData.parent_comment);
      if (!parent) throw new Error('Parent comment not found');
    }

    const comment = await commentRepository.create(commentData);

    // Keep post comment count in sync
    await postRepository.incrementComments(commentData.post);

    return {
        message: 'Comment added successfully',
        data: transformComment(comment)
    };
  }

  async getPostComments(postId, page = 1, limit = 20) {
    const post = await postRepository.getById(postId);
    if (!post) throw new Error('Post not found');
    const comments = await commentRepository.getByPost(postId, page, limit);
    return {
        message: 'Comments fetched successfully',
        data: comments.map(transformComment)
    };
  }

  async getReplies(commentId, page = 1, limit = 10) {
    const replies = await commentRepository.getReplies(commentId, page, limit);
    return {
        message: 'Replies fetched successfully',
        data: replies.map(transformComment)
    };
  }

  async deleteComment(commentId, userId) {
    const comment = await commentRepository.getById(commentId);
    if (!comment) throw new Error('Comment not found');

    if (String(comment.user) !== String(userId)) {
      throw new Error('You are not authorised to delete this comment');
    }

    await commentRepository.delete(commentId);

    // Keep post comment count in sync
    await postRepository.decrementComments(comment.post);

    return true;
  }
}

module.exports = new CommentService();