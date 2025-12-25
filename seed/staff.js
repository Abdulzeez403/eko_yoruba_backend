const mongoose = require("mongoose");
const Staff = require("../../yoruba-ai-backend/src/models/Staff"); // Adjust the path to your schema file

require("dotenv").config();

// 📌 Update to your actual MongoDB URL
const MONGO_URI = process.env.MONGO_URI;

const staffMembers = [
  {
    name: "Sodiq Abdulazeez",
    email: "edewa2025@gmail.com",
    password: "123456", // In production, use bcrypt to hash this!
    role: "Admin",
  },
  {
    name: "Bob Smith",
    email: "bob@company.com",
    password: "hashed_password_456",
    role: "Staff",
  },
];

const seedDB = async () => {
  try {
    // 1. Connect to Database
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // 2. Optional: Clear existing staff to avoid "email unique" errors
    await Staff.deleteMany({});
    console.log("Cleared existing staff members.");

    // 3. Insert the seed data
    await Staff.insertMany(staffMembers);
    console.log("Successfully added 2 staff members!");

    // 4. Close connection
    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
