const mongoose = require('mongoose');

// ── Shared schema options applied to every model ──────────────────────────────
const BASE_OPTIONS = {
  timestamps: true,   // createdAt + updatedAt added automatically

  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      ret.id = ret._id.toString(); // expose id as a plain string
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },

  toObject: {
    virtuals: true,
  },
};

function createSchema(fields = {}, extraOptions = {}) {
  const options = { ...BASE_OPTIONS, ...extraOptions };
  return new mongoose.Schema(fields, options);
}

module.exports = { createSchema };