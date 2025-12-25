const mongoose = require("mongoose");
const Flashcard = require("../../yoruba-ai-backend/src/models/Flashcard");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI:", process.env.MONGO_URI);

const flashcards = [
  {
    yoruba: "Ẹ káàárọ̀",
    english: "Good morning",
    pronunciation: "Eh kaa-roh",
    audioUrl: "",
    category: "Greetings",
    difficulty: "Beginner",
  },
  {
    yoruba: "Ẹ ṣé",
    english: "Thank you",
    pronunciation: "Eh sheh",
    audioUrl: "",
    category: "Greetings",
    difficulty: "Beginner",
  },
  {
    yoruba: "Báwo ni?",
    english: "How are you?",
    pronunciation: "Bah-woh nee",
    audioUrl: "",
    category: "Conversation",
    difficulty: "Beginner",
  },
  {
    yoruba: "Mo wà dáadáa",
    english: "I am fine",
    pronunciation: "Moh wah daa-daa",
    audioUrl: "",
    category: "Conversation",
    difficulty: "Beginner",
  },
  {
    yoruba: "Ó dábọ̀",
    english: "Goodbye",
    pronunciation: "Oh dah-boh",
    audioUrl: "",
    category: "Greetings",
    difficulty: "Beginner",
  },
];

const seedFlashcards = async () => {
  try {
    console.log("🌱 Connecting to database...");
    await mongoose.connect(MONGO_URI);

    // OPTIONAL: clear existing flashcards
    await Flashcard.deleteMany();
    console.log("🧹 Old flashcards removed");

    await Flashcard.insertMany(flashcards);
    console.log("✅ Flashcards seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedFlashcards();
