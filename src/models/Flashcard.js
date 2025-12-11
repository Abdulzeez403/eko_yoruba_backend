const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  yoruba: String,
  english: String,
  pronunciation: String,
  audioUrl: String
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
