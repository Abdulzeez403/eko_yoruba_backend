const Staff = require("../models/Staff"); // Adjust path as needed
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res
        .status(400)
        .json({ message: "Staff already exists with this email" });
    }

    const newStaff = await Staff.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if staff exists
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare password (assuming you hashed it during registration/seeding)
    // const isMatch = await bcrypt.compare(password, staff.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // 3. Create JWT
    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET, // In production, use process.env.JWT_SECRET
      { expiresIn: "1d" }
    );

    res.status(200).json({ success: true, token, role: staff.role });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({ success: true, count: staff.length, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
