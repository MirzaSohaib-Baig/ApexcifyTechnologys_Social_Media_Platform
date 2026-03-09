const mongoose = require('mongoose');
const { createSchema } = require('./baseModel');

const commentSchema = createSchema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post:    { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true, trim: true, maxlength: 500 },

  // Optional: support replies (a comment on a comment)
  parent_comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },

  likes_count: { type: Number, default: 0 },
});

// Index for fetching all comments on a post, oldest first
commentSchema.index({ post: 1, createdAt: 1 });

module.exports = mongoose.model('Comment', commentSchema);