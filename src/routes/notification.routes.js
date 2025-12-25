const express = require("express");
const {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  sendNotification,
} = require("../controllers/notification.controller");
const { staffProtect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes
router.use(staffProtect);
router.use(authorize("Staff", "admin", "superadmin"));

router.route("/").get(getNotifications).post(createNotification);

router.route("/:id").put(updateNotification).delete(deleteNotification);

router.route("/:id/send").post(sendNotification);

module.exports = router;
