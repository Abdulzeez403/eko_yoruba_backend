const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleYoruba: String,
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  description: String,
  status: { type: String, default: "active" },
  imageUrl: String,
  audioUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lesson", lessonSchema);
