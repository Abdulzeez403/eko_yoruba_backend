const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  level: String,
  yorubaWord: String,
  englishTranslation: String,
  pronunciation: String,
  examples: [String],
  audioUrl: String
});

module.exports = mongoose.model("Lesson", lessonSchema);
