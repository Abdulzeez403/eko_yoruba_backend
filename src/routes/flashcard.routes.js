const router = require("express").Router();
const multer = require("multer");
const {
  createFlashcard,
  getFlashcards,
  getFlashcard,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcard.controller");

const { unifiedStorage } = require("../config/cloudinary");
const upload = multer({ storage: unifiedStorage });



// This replaces your custom uploadFiles function
const uploadFiles = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 }
]);

// Routes
router.post("/", upload.fields([
  { name: "image", maxCount: 2 },
  { name: "audio", maxCount: 2 }
]), createFlashcard);
router.put("/:id", uploadFiles, updateFlashcard);

router.get("/", getFlashcards);
router.get("/:id", getFlashcard);
router.delete("/:id", deleteFlashcard);

module.exports = router;
