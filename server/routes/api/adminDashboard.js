import express from "express";
import { adminDashboardController } from "../../controllers/admin/index.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const router = express.Router();

router.get(
    "/stats",
    isAuthenticated,
    adminDashboardController.getDashboardCardStats
);
router.get(
    "/enrollments/by/course",
    isAuthenticated,
    adminDashboardController.getTotalEnrolledStudentInEveryActiveCourse
);
router.get(
    "/colleges",
    isAuthenticated,
    adminDashboardController.getCollegesList
);
router.get(
    "/courses",
    isAuthenticated,
    adminDashboardController.getCoursesList
);
router.get(
    "/enrollments",
    isAuthenticated,
    adminDashboardController.getAllEnrolledStudents
);
router.get(
    "/student/info/:id",
    isAuthenticated,
    adminDashboardController.getStudentInfoById
);

export default router;
