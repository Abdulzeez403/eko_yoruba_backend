const router = require("express").Router();
const {getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/profile.controller");

// Optional: protect routes with auth middleware
// const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllUsers);       // Get all users
router.get("/:id", getUser);        // Get single user
router.put("/:id", updateUser);     // Update profile
router.delete("/:id", deleteUser);  // Delete user (admin)

module.exports = router;
