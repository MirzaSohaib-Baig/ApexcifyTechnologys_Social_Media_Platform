const mongoose = require('mongoose');
const { createSchema } = require('./baseModel');

const postSchema = createSchema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content:    { type: String, required: true, maxlength: 1000 },
  image:      { type: String, default: '' },
  hashtags:   [{ type: String, lowercase: true, trim: true }],
  share_with: { type: String, enum: ['public', 'private'], default: 'public' },

  // ── Removed from here ─────────────────────────────────────────────────────
  // comments and likes are NOT stored as arrays on the post for the same
  // reason as on User — querying them from their own collections is cleaner.
  // Like.countDocuments({ post: postId })       → like count
  // Comment.find({ post: postId })              → comments
  //
  // Exception: if you want a fast like count without a separate query you
  // can keep a likes_count: Number field and increment it atomically:
  //   Post.findByIdAndUpdate(id, { $inc: { likes_count: 1 } })

  likes_count:    { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
});

// Index for feed queries: all posts by a user, newest first
postSchema.index({ user: 1, createdAt: -1 });

// Index for hashtag search
postSchema.index({ hashtags: 1 });

module.exports = mongoose.model('Post', postSchema);