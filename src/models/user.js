const mongoose = require('mongoose');
const { createSchema } = require('./baseModel');

const userSchema = createSchema({

  first_name:  { type: String, required: true, trim: true },
  last_name:   { type: String, required: true, trim: true },
  username:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone:       { type: String, default: null },
  password:    { type: String, required: true },
  bio:         { type: String, default: '', maxlength: 300 },
  profile_pic: { type: String, default: '' },
  cover_pic:   { type: String, default: '' },
  location:    { type: String, default: null },

});

// ── Virtual: full name ────────────────────────────────────────────────────────
userSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

// ── Hook: hash password before save ──────────────────────────────────────────
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   try {
//     this.password = await hashPassword(this.password);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// ── Strip password from JSON responses ───────────────────────────────────────
// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

module.exports = mongoose.model('User', userSchema);