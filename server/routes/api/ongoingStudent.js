// routes/admin/pendingUsers.routes.js
import express from "express";
import { ongoingStudentController } from "../../controllers/admin/index.js";
import { enrollmentController } from "../../controllers/public/index.js";

const router = express.Router();

router.get("/", ongoingStudentController.getOngoingUsers);

router.get("/:enrollmentId", ongoingStudentController.getEnrollmentDetails);

// PATCH /api/admin/pending-users/:userId/approve - Approve single user
router.patch("/:enrollmentId/update-payment-status", ongoingStudentController.updatePaymentStatus);



export default router;
