// routes/admin/pendingUsers.routes.js
import express from "express";
import { ongoingStudentController } from "../../controllers/admin/index.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, ongoingStudentController.getOngoingUsers);

router.get("/:enrollmentId", isAuthenticated, ongoingStudentController.getEnrollmentDetails);

router.patch(
    "/:enrollmentId/update-payment-status",
    isAuthenticated,
    ongoingStudentController.updatePaymentStatus
);

export default router;
