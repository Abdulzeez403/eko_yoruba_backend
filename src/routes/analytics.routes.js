const router = require("express").Router();
const { getDashboardStats } = require("../controllers/analytics.controller");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected
router.use(protect);

router.get("/", getDashboardStats);

module.exports = router;