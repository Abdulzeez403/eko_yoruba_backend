const router = require("express").Router();
const {createQuiz,getQuizzes, getQuiz, updateQuiz,  deleteQuiz } = require("../controllers/quiz.controller");

// Optional: protect routes with auth middleware
// const { protect } = require("../middleware/authMiddleware");

router.post("/", createQuiz);       // Create
router.get("/", getQuizzes);       // Read all (optional filter by lessonId)
router.get("/:id", getQuiz);       // Read one
router.put("/:id", updateQuiz);    // Update
router.delete("/:id", deleteQuiz); // Delete

module.exports = router;
