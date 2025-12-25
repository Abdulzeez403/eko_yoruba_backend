const express = require("express");
const router = express.Router();
const {
  createStaff,
  getAllStaff,
  loginStaff,
  getStaffById,
} = require("../controllers/staff.controller");

router.post("/", createStaff);
router.post("/login", loginStaff);
router.get("/", getAllStaff);
router.get("/:id", getStaffById);

module.exports = router;
