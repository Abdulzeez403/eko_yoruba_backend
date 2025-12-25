const express = require("express");
const router = express.Router();
const multer = require("multer");
const { unifiedStorage } = require("../config/cloudinary");
const upload = multer({ storage: unifiedStorage });

const {
  createLessonContent,
  getAllLessonContent,
  getLessonContentByLesson,
  getSingleLessonContent,
  updateLessonContent,
  deleteLessonContent,
} = require("../controllers/lessonContent.controller");

const uploadFiles = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 }
]);

// CREATE
router.post("/", uploadFiles, createLessonContent);

// GET ALL
router.get("/", getAllLessonContent);

// GET BY LESSON ID
router.get("/lesson/:lessonId", getLessonContentByLesson);

// GET SINGLE CONTENT
router.get("/:id", getSingleLessonContent);

// UPDATE
router.put("/:id", uploadFiles, updateLessonContent);

// DELETE
router.delete("/:id", deleteLessonContent);

module.exports = router;
