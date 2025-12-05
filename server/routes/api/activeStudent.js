import express from "express";
import { acvtiveStudentController } from "../../controllers/admin/index.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
const router = express.Router();

router.get(
    "/",
    isAuthenticated,
    acvtiveStudentController.getAllStudentsWithEnrollments
);
router.get(
    "/stats",
    isAuthenticated,
    acvtiveStudentController.getActiveStudentStats
);
router.get(
    "/export-csv",
    isAuthenticated,
    acvtiveStudentController.exportStudentsCSV
);
router.patch(
    "/enrollment/:enrollmentId/payment",
    isAuthenticated,
    acvtiveStudentController.updatePaymentStatus
);
router.patch(
    "/submission/:submissionId/capstone",
    isAuthenticated,
    acvtiveStudentController.updateCapstoneStatus
);
router.post(
    "/certificate",
    isAuthenticated,
    acvtiveStudentController.issueCertificate
);

export default router;
