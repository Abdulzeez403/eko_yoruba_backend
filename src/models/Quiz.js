const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index of the correct option
  explanation: { type: String }
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  questions: [questionSchema],
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  timeLimit: { type: Number, default: 10 }, // in minutes
  passingScore: { type: Number, default: 70 }, // percentage
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  timesAttempted: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
