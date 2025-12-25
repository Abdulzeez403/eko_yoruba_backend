const router = require("express").Router();
const {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion
} = require("../controllers/quiz.controller");

router.post("/", createQuiz);
router.get("/", getQuizzes);
router.get("/:id", getQuiz);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

// Question sub-routes
router.post("/:id/questions", addQuestion);
router.put("/:quizId/questions/:questionId", updateQuestion);
router.delete("/:quizId/questions/:questionId", deleteQuestion);

module.exports = router;
