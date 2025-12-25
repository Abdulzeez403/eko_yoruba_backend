const Flashcard = require("../models/Flashcard");

// Create a flashcard
exports.createFlashcard = async (req, res) => {
  console.log("FILES:", JSON.stringify(req.files, null, 2));
  console.log("BODY:", req.body);

  try {
    const { yoruba, english, pronunciation, category, difficulty } = req.body;

    const imageUrl =
      req.files && req.files["image"] ? req.files["image"][0].path : "";
    const audioUrl =
      req.files && req.files["audio"] ? req.files["audio"][0].path : "";

    console.log("Image URL:", imageUrl);
    console.log("Audio URL:", audioUrl);

    const flashcard = await Flashcard.create({
      yoruba,
      english,
      pronunciation,
      category,
      difficulty,
      imageUrl,
      audioUrl,
      image: imageUrl, // legacy support
      audio: audioUrl, // legacy support
    });

    res.status(201).json(flashcard);
  } catch (error) {
    console.error("CREATE FLASHCARD ERROR:", error);
    if (error.message) console.error("Message:", error.message);
    if (error.stack) console.error("Stack:", error.stack);

    res.status(500).json({
      message: "Failed to create flashcard",
      error: error.message || String(error),
    });
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
    if (!flashcard)
      return res.status(404).json({ message: "Flashcard not found" });
    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update flashcard
exports.updateFlashcard = async (req, res) => {
  try {
    const { yoruba, english, pronunciation, category, difficulty } = req.body;

    // Get uploaded files if any
    const imageUrl = req.files?.image?.[0]?.path;
    const audioUrl = req.files?.audio?.[0]?.path;

    const updateData = {
      yoruba,
      english,
      pronunciation,
      category,
      difficulty,
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
      updateData.image = imageUrl;
    }
    if (audioUrl) {
      updateData.audioUrl = audioUrl;
      updateData.audio = audioUrl;
    }

    const flashcard = await Flashcard.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!flashcard)
      return res.status(404).json({ message: "Flashcard not found" });

    res.json(flashcard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete flashcard
exports.deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
    if (!flashcard)
      return res.status(404).json({ message: "Flashcard not found" });
    res.json({ message: "Flashcard deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
