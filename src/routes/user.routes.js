const router = require("express").Router();
const {
  deleteUser,
  updateUserLevel,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected
router.use(protect);

router.patch("/:id/level", updateUserLevel);
router.delete("/:id", deleteUser);

module.exports = router;