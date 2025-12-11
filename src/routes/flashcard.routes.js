const router = require("express").Router();
const {

    createFlashcard,
    getFlashcards,
    getFlashcard,
    updateFlashcard,
    deleteFlashcard

} = require("../controllers/flashcard.controller");

// Optional: protect routes with auth middleware
// const { protect } = require("../middleware/authMiddleware");

router.post("/", createFlashcard);      // Create
router.get("/", getFlashcards);         // Read all
router.get("/:id", getFlashcard);       // Read one
router.put("/:id", updateFlashcard);    // Update
router.delete("/:id", deleteFlashcard); // Delete

module.exports = router;
