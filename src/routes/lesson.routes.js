const router = require("express").Router();
const {createLesson, getAllLessons, getLesson, updateLesson, deleteLesson  } = require("../controllers/lesson.controller");
const upload = require("../middleware/upload");

// Optional: add auth middleware if needed
// const { protect } = require("../middleware/authMiddleware");

router.post("/", upload.fields([{ name: "image" }, { name: "audio" }]), createLesson);       // Create
router.get("/", getAllLessons);       // Read all
router.get("/:id", getLesson);        // Read one
router.put("/:id", upload.fields([{ name: "image" }, { name: "audio" }]), updateLesson);     // Update
router.delete("/:id", deleteLesson);  // Delete

module.exports = router;
