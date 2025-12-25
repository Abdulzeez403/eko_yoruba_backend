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
    const audioUrl = req.files && req.files["audio"] ? req.files["audio"][0].path : "";
    const imageUrl = req.files && req.files["image"] ? req.files["image"][0].path : "";

    const lessonData = {
      ...req.body,
      audioUrl,
      imageUrl
    };

    const lesson = await Lesson.create(lessonData);
    res.status(201).json(lesson);
  } catch (err) {
    console.error("CREATE LESSON ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update an existing lesson
exports.updateLesson = async (req, res) => {
  try {
    const audioUrl = req.files && req.files["audio"] ? req.files["audio"][0].path : undefined;
    const imageUrl = req.files && req.files["image"] ? req.files["image"][0].path : undefined;

    const updateData = { ...req.body };
    if (audioUrl) updateData.audioUrl = audioUrl;
    if (imageUrl) updateData.imageUrl = imageUrl;

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    console.error("UPDATE LESSON ERROR:", err);
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
