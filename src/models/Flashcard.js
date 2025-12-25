const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  yoruba: String,
  english: String,
  pronunciation: String,
  difficulty: String,
  category: String,
  image: String,
  audio: String,
  imageUrl: String,
  audioUrl: String,
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
