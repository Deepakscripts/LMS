import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import studentRoutes from "./student.js";
import adminDashboardRoutes from "./admin.dashboard.js";
import ongoingUserRoutes from "./ongoing.student.js";
// import paymentRoute from "./payment.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "API is working" }));
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/student", studentRoutes);
router.use("/admin/dashboard", adminDashboardRoutes);
router.use("/admin/ongoing", ongoingUserRoutes);
// router.use("/payment", paymentRoute);

export default router;
