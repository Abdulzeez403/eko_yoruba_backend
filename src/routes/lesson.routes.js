const router = require("express").Router();
const {createLesson, getAllLessons, getLesson, updateLesson, deleteLesson  } = require("../controllers/lesson.controller");

// Optional: add auth middleware if needed
// const { protect } = require("../middleware/authMiddleware");

router.post("/", createLesson);       // Create
router.get("/", getAllLessons);       // Read all
router.get("/:id", getLesson);        // Read one
router.put("/:id", updateLesson);     // Update
router.delete("/:id", deleteLesson);  // Delete

module.exports = router;
