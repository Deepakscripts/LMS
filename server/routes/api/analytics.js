import express from "express";
import { analyticsController } from "../../controllers/admin/index.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const router = express.Router();

router.get(
    "/dashboard-stats",
    isAuthenticated,
    analyticsController.getDashboardStats
);

router.get(
    "/performance-radar",
    isAuthenticated,
    analyticsController.getPerformanceRadar
);

router.get(
    "/student-growth",
    isAuthenticated,
    analyticsController.getStudentGrowth
);
router.get(
    "/enrollment-completion-revenue",
    isAuthenticated,
    analyticsController.getEnrollmentCompletionRevenueTrend
);
router.get(
    "/course-completion-status",
    isAuthenticated,
    analyticsController.getCourseCompletionStatus
);
router.get(
    "/enrollment-by-category",
    isAuthenticated,
    analyticsController.getEnrollmentByCategory
);
router.get(
    "/monthly-enrollments",
    isAuthenticated,
    analyticsController.getMonthlyEnrollments
);

router.get(
    "/course-completions-by-month",
    isAuthenticated,
    analyticsController.getCourseCompletionsByMonth
);
router.get(
    "/assessment-performance",
    isAuthenticated,
    analyticsController.getAssessmentPerformance
);
router.get(
    "/user-engagement",
    isAuthenticated,
    analyticsController.getUserEngagement
);
router.get(
    "/top-performing-courses",
    isAuthenticated,
    analyticsController.getTopPerformingCourses
);

router.get(
    "/top-leaderboard",
    isAuthenticated,
    analyticsController.getTopLeaderboard
);
router.get(
    "/recent-certifications",
    isAuthenticated,
    analyticsController.getRecentCertifications
);
router.get(
    "/system-health",
    isAuthenticated,
    analyticsController.getSystemHealth
);

export default router;
