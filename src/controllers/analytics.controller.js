const User = require("../models/User");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalLessons,
      totalQuizzes,
      usersByLevel,
      topLessons
    ] = await Promise.all([
      User.countDocuments(),
      Lesson.countDocuments(),
      Quiz.countDocuments(),
      User.aggregate([
        { $group: { _id: "$level", count: { $sum: 1 } } },
        { $project: { level: "$_id", count: 1, _id: 0 } }
      ]),
      Lesson.find().sort({ completions: -1 }).limit(5).select("title completions")
    ]);

    // Calculate active users (e.g., logged in within last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = await User.countDocuments({ updatedAt: { $gte: thirtyDaysAgo } });

    // Calculate average streak
    const usersWithStreak = await User.find({ streak: { $gt: 0 } }).select("streak");
    const totalStreak = usersWithStreak.reduce((acc, user) => acc + user.streak, 0);
    const averageStreak = usersWithStreak.length > 0 ? (totalStreak / usersWithStreak.length).toFixed(1) : 0;

    // Mock daily stats for now (real implementation would require a daily activity log)
    const dailyStats = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toISOString().split('T')[0],
        activeUsers: Math.floor(Math.random() * 50) + 10,
        lessonsCompleted: Math.floor(Math.random() * 20) + 5,
        wordsLearned: Math.floor(Math.random() * 100) + 20
      };
    });

    res.json({
      totalUsers,
      activeUsers,
      totalLessons,
      totalQuizzes,
      averageStreak,
      dailyStats,
      topLessons: topLessons.map(l => ({ name: l.title, completions: l.completions || 0 })),
      usersByLevel: usersByLevel.map(u => ({ level: u.level || 'beginner', count: u.count }))
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};