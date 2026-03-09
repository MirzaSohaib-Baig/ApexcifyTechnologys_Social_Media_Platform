const mongoose = require('mongoose');
const { createSchema } = require('./baseModel');

// ── One collection replaces your Followers + Following collections ─────────────
//
// A single Follow document means "follower follows following".
// To get all followers of a user:  Follow.find({ following: userId })
// To get all users someone follows: Follow.find({ follower: userId })
//
// The compound unique index prevents duplicate follows.

const followSchema = createSchema({
  follower:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Prevent a user from following the same person twice
followSchema.index({ follower: 1, following: 1 }, { unique: true });

// Prevent self-follows at the schema level
followSchema.pre('save', function (next) {
  if (this.follower.equals(this.following)) {
    return next(new Error('A user cannot follow themselves'));
  }
  next();
});

module.exports = mongoose.model('Follow', followSchema);