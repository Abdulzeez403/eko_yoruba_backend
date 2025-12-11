const Flashcard = require("../models/Flashcard");

// Create a flashcard
exports.createFlashcard = async (req, res) => {
  try {
    const { yoruba, english, pronunciation, audioUrl } = req.body;
    const flashcard = await Flashcard.create({ yoruba, english, pronunciation, audioUrl });
    res.status(201).json(flashcard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all flashcards
exports.getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single flashcard by ID
exports.getFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update flashcard
exports.updateFlashcard = async (req, res) => {
  try {
    const { yoruba, english, pronunciation, audioUrl } = req.body;
    const flashcard = await Flashcard.findByIdAndUpdate(
      req.params.id,
      { yoruba, english, pronunciation, audioUrl },
      { new: true }
    );
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete flashcard
exports.deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
    res.json({ message: "Flashcard deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
