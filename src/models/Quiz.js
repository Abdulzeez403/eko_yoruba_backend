const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  lessonId: mongoose.Schema.Types.ObjectId,
  question: String,
  options: [String],
  correctAnswer: Number
});

module.exports = mongoose.model("Quiz", quizSchema);
