// routes/admin/courseManagement.routes.js
import express from "express";
import { courseController } from "../../controllers/admin/index.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const router = express.Router();

// GET /api/admin/courses - Get all courses
router.get("/", isAuthenticated, courseController.getAllCourses);

// GET /api/admin/courses/filter-options - Get filter options
router.get(
    "/filter-options",
    isAuthenticated,
    courseController.getCourseFilterOptions
);

// POST /api/admin/courses - Create new course
router.post("/", isAuthenticated, courseController.createCourse);
//get course by id
router.get("/:courseId", isAuthenticated, courseController.getCourseById);

// PUT /api/admin/courses/:courseId - Update course
router.put("/:courseId", isAuthenticated, courseController.updateCourse);

// DELETE /api/admin/courses/:courseId - Delete course
router.delete("/:courseId", isAuthenticated, courseController.deleteCourse);

// PATCH /api/admin/courses/:courseId/status - Toggle publish status
router.patch(
    "/:courseId/status",
    isAuthenticated,
    courseController.toggleCourseStatus
);

export default router;
