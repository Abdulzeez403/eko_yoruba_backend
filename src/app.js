const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const lessonRoutes = require("./routes/lesson.routes");
const quizRoutes = require("./routes/quiz.routes");
const flashcardRoutes = require("./routes/flashcard.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/profile", profileRoutes);

module.exports = app;
