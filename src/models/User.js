const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  level: { type: String, default: "Beginner" },

  streak: { type: Number, default: 0 },
  wordsLearned: { type: Number, default: 0 },
  lessonsCompleted: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
