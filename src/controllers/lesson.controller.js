const Lesson = require("../models/Lesson");

// Get all lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single lesson by ID
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, description, level, audioUrl, examples } = req.body;
    const lesson = await Lesson.create({ title, description, level, audioUrl, examples });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing lesson
exports.updateLesson = async (req, res) => {
  try {
    const { title, description, level, audioUrl, examples } = req.body;
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { title, description, level, audioUrl, examples },
      { new: true }
    );
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a lesson
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
