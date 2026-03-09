const mongoose = require('mongoose');
const { createSchema } = require('./baseModel');

// A Like targets either a Post OR a Comment — never both, never neither.
// This is enforced by the custom validator below.

const likeSchema = createSchema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post:    { type: mongoose.Schema.Types.ObjectId, ref: 'Post',    default: null },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
});

// ── Validator: exactly one target must be set ─────────────────────────────────
likeSchema.pre('validate', function (next) {
  const hasPost    = this.post    != null;
  const hasComment = this.comment != null;

  if (hasPost === hasComment) {
    // both set or neither set → invalid
    return next(new Error('A like must target either a post or a comment, not both and not neither'));
  }
  next();
});

// ── Compound unique index: one like per user per target ───────────────────────
// Sparse indexes ignore null values so post-likes and comment-likes
// don't interfere with each other's uniqueness constraint.
likeSchema.index({ user: 1, post: 1    }, { unique: true, sparse: true });
likeSchema.index({ user: 1, comment: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Like', likeSchema);