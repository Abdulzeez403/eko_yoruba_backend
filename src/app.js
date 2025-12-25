const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const lessonRoutes = require("./routes/lesson.routes");
const quizRoutes = require("./routes/quiz.routes");
const flashcardRoutes = require("./routes/flashcard.routes");
const profileRoutes = require("./routes/profile.routes");
const lessonContentRoutes = require("./routes/lessonContent");
const staffRoutes = require("./routes/staff.routes");
const userRoutes = require("./routes/user.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();

app.use(cors("*"));
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lesson-content", lessonContentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/staff", staffRoutes);

module.exports = app;
