const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "Staff" },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Staff", staffSchema);
