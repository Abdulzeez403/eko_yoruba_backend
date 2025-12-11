const Quiz = require("../models/Quiz");

// Create a new quiz question
exports.createQuiz = async (req, res) => {
  try {
    const { lessonId, question, options, correctAnswer } = req.body;
    const quiz = await Quiz.create({ lessonId, question, options, correctAnswer });
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all quizzes (optional: filter by lesson)
exports.getQuizzes = async (req, res) => {
  try {
    const { lessonId } = req.query;
    const filter = lessonId ? { lessonId } : {};
    const quizzes = await Quiz.find(filter);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single quiz by ID
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { lessonId, question, options, correctAnswer } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { lessonId, question, options, correctAnswer },
      { new: true }
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
