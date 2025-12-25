const mongoose = require("mongoose");
const Lesson = require("../../yoruba-ai-backend/src/models/Lesson");
const LessonContent = require("../../yoruba-ai-backend/src/models/LessonContent");
const Quiz = require("../../yoruba-ai-backend/src/models//Quiz");
require("dotenv").config();

// 📌 Update to your actual MongoDB URL
const MONGO_URI = process.env.MONGO_URI;

const lessonsData = [
  {
    title: "Introduction",
    subtitle: "Basic sounds and tones",
    status: "completed",
  },
  { title: "Greetings", subtitle: "Common greetings", status: "active" },
  { title: "Numbers", subtitle: "Counting 1-100", status: "active" },
  { title: "Family", subtitle: "Family members", status: "locked" },
  { title: "Colors", subtitle: "Common colors", status: "locked" },
  { title: "Food & Drinks", subtitle: "Vocabulary", status: "locked" },
  { title: "Time & Days", subtitle: "Telling time", status: "locked" },
  { title: "Directions", subtitle: "Getting around", status: "locked" },
];

const greetingsContent = [
  {
    yoruba: "Ẹ káàárọ̀",
    english: "Good morning",
    pronunciation: "Eh kaa-roh",
    example: "Ẹ káàárọ̀ o, báwo ni?",
  },
  {
    yoruba: "Ẹ káàsán",
    english: "Good afternoon",
    pronunciation: "Eh kaa-san",
    example: "Ẹ káàsán, mo dúpẹ́",
  },
  {
    yoruba: "Ó dàárọ̀",
    english: "Good evening",
    pronunciation: "Oh daa-roh",
    example: "Ó dàárọ̀ o, ẹ kú iṣẹ́",
  },
  {
    yoruba: "Ó dábọ̀",
    english: "Goodbye",
    pronunciation: "Oh dah-boh",
    example: "Ó dábọ̀, má a ríṣẹ́",
  },
];

const greetingsQuiz = [
  {
    question: "What is the Yoruba word for 'Good morning'?",
    options: ["Ẹ káàárọ̀", "Ó dàárọ̀", "Ẹ káàsán", "Ó dábọ̀"],
    correctAnswer: 0,
  },
  {
    question: "How do you say 'Good afternoon' in Yoruba?",
    options: ["Ó dábọ̀", "Ẹ káàsán", "Ó dàárọ̀", "Ẹ káàárọ̀"],
    correctAnswer: 1,
  },
  {
    question: "What is 'Goodbye' in Yoruba?",
    options: ["Ó dábọ̀", "Ẹ káàsán", "Ó dàárọ̀", "Ẹ káàárọ̀"],
    correctAnswer: 0,
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("🌿 Connected to MongoDB");

  // Clear existing data
  await Lesson.deleteMany();
  await LessonContent.deleteMany();
  await Quiz.deleteMany();

  console.log("🧹 Cleared previous records");

  // Insert lessons
  const createdLessons = await Lesson.insertMany(lessonsData);
  console.log("📘 Created lessons:", createdLessons.length);

  // Find the "Greetings" lesson (index 1)
  const greetingsLesson = createdLessons[1];

  // Insert lesson content for Greetings
  const contentToInsert = greetingsContent.map((item) => ({
    ...item,
    lessonId: greetingsLesson._id,
  }));

  const createdContent = await LessonContent.insertMany(contentToInsert);
  console.log("📄 Created lesson contents:", createdContent.length);

  // Insert quizzes for Greetings
  const quizToInsert = greetingsQuiz.map((quiz) => ({
    ...quiz,
    lessonId: greetingsLesson._id,
  }));

  const createdQuiz = await Quiz.insertMany(quizToInsert);
  console.log("❓ Created quizzes:", createdQuiz.length);

  console.log("✅ Seed completed successfully!");
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
