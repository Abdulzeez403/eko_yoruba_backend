const mongoose = require("mongoose");

const lessonContentSchema = new mongoose.Schema({
  lessonId: mongoose.Schema.Types.ObjectId,
  yoruba: String,
  english: String,
  pronunciation: String,
  example: String,
  image: String,
  imageUrl: String,
  audio: String,
  audioUrl: String,
});

module.exports = mongoose.model("LessonContent", lessonContentSchema);
