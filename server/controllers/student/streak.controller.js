import { Student } from "../../models/index.js";
/**
 * POST /api/student/streak/update
 * Update daily streak (called on login or activity)
 */
export const updateStreak = async (req, res) => {
    try {
        const student = await Student.findById(req.userId);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastStreak = student.lastStreakDate
            ? new Date(student.lastStreakDate)
            : null;
        if (lastStreak) {
            lastStreak.setHours(0, 0, 0, 0);
        }

        const oneDayMs = 24 * 60 * 60 * 1000;
        const daysDiff = lastStreak
            ? Math.floor((today - lastStreak) / oneDayMs)
            : null;

        if (daysDiff === null || daysDiff > 1) {
            // Reset streak
            student.streak = 1;
        } else if (daysDiff === 1) {
            // Continue streak
            student.streak += 1;
            // Bonus XP for streak milestones
            if (student.streak % 7 === 0) {
                student.xp += 100; // Weekly streak bonus
            }
        }
        // If daysDiff === 0, streak already counted today

        student.lastStreakDate = today;
        await student.save();

        res.json({
            success: true,
            data: { streak: student.streak },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
