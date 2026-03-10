const postRepository    = require('../repositories/postRepository');
const followRepository  = require('../repositories/followRepository');
const { transformPost } = require('../core/transformers');

class PostService {

  // ── Create ──────────────────────────────────────────────────────────────────
  async createPost(postData) {
    if (!content?.trim()) throw new Error('Post content cannot be empty');

    // Normalise hashtags: strip # symbol, lowercase, remove duplicates
    const cleanTags = [...new Set(
      (postData.hashtags || []).map(t => t.replace(/^#/, '').toLowerCase().trim()).filter(Boolean)
    )];

    postData.hashtags = cleanTags;
    const post = await postRepository.create(postData);
    return {
        message: 'Post created successfully',
        data: transformPost(post)
    };
  }

  // ── Read ────────────────────────────────────────────────────────────────────
  async getPost(postId) {
    const post = await postRepository.getById(postId, 'user');
    if (!post) throw new Error('Post not found');
    return {
        message: 'Post fetched successfully',
        data: transformPost(post)
    };
  }

  async getFeed(userId, page = 1, limit = 20) {
    // Get IDs of everyone this user follows, then fetch their posts
    const followingIds = await followRepository.getFollowingIds(userId);

    // Include the user's own posts in their feed
    const feedIds = [userId, ...followingIds];

    const posts = await postRepository.getFeed(feedIds, page, limit);
    return {
        message: 'Feed fetched successfully',
        data: posts.map(transformPost),
        total_count: posts.total_count,
        page: posts.page,
        total_pages: posts.total_pages
    };
  }

  async getUserPosts(userId, page = 1, limit = 20) {
    const posts = await postRepository.getByUser(userId, page, limit);
    return {
        message: 'User posts fetched successfully',
        data: posts.map(transformPost),
        total_count: posts.total_count,
        page: posts.page,
        total_pages: posts.total_pages
    };
  }

  async getByHashtag(tag, page = 1, limit = 20) {
    const posts = await postRepository.getByHashtag(tag, page, limit);
    return {
        message: 'Hashtag posts fetched successfully',
        data: posts.map(transformPost),
        total_count: posts.total_count,
        page: posts.page,
        total_pages: posts.total_pages
    };
  }

  // ── Update ──────────────────────────────────────────────────────────────────
  async updatePost(postId, postData) {
    const post = await postRepository.getById(postId);
    if (!post) throw new Error('Post not found');
    // Only the author can edit their post
    if (String(post.user) !== String(postData.user)) {
      throw new Error('You are not authorised to edit this post');
    }

    const cleanTags = [...new Set(
      (postData.hashtags || []).map(t => t.replace(/^#/, '').toLowerCase().trim()).filter(Boolean)
    )];

    const updatePostData = await postRepository.update(postId, postData);
    return {
        message: 'Post updated successfully',
        data: transformPost(updatePostData)
    };

  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  async deletePost(postId, userId) {
    const post = await postRepository.getById(postId);
    if (!post) throw new Error('Post not found');

    if (String(post.user) !== String(userId)) {
      throw new Error('You are not authorised to delete this post');
    }

    await postRepository.delete(postId);
    return true;
  }
}

module.exports = new PostService();