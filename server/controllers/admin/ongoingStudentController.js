import { Enrollment, Student, Payment } from "../../models/index.js";
import mongoose from "mongoose";
import {
    sendEnrollmentConfirmationEmail,
    sendPaymentRejectionEmail,
} from "../../services/email.js";

/**
 * Get all pending users (students awaiting verification)
 * Filters: College, Year of Study, Course/Domain
 * Search: Student name, email
 */
export const getOngoingUsers = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            studentName = "",
            email = "",
            collegeName = "",
            yearOfStudy = "",
            courseName = "", // Domain/Course filter
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        // Build match conditions - ONLY pending students
        const matchConditions = {
            accountStatus: "pending", // ✅ Only pending students
        };

        // Search by student name (first/middle/last name)
        if (studentName) {
            matchConditions.$or = [
                { name: { $regex: studentName, $options: "i" } },
                { middleName: { $regex: studentName, $options: "i" } },
                { lastName: { $regex: studentName, $options: "i" } },
            ];
        }

        // Filter by email
        if (email) {
            matchConditions.email = { $regex: email, $options: "i" };
        }

        // ✅ Filter by College
        if (collegeName && collegeName !== "All") {
            matchConditions.collegeName = {
                $regex: collegeName,
                $options: "i",
            };
        }

        // ✅ Filter by Year of Study
        if (yearOfStudy && yearOfStudy !== "All") {
            matchConditions.yearOfStudy = yearOfStudy;
        }

        // ✅ Filter by Domain/Course
        if (courseName && courseName !== "All") {
            matchConditions.courseName = { $regex: courseName, $options: "i" };
        }

        // Build aggregation pipeline
        const aggregate = Student.aggregate([
            // Stage 1: Match pending students with filters
            { $match: matchConditions },

            // Stage 2: Add computed fields
            {
                $addFields: {
                    fullName: {
                        $trim: {
                            input: {
                                $concat: [
                                    "$name",
                                    " ",
                                    { $ifNull: ["$middleName", ""] },
                                    " ",
                                    { $ifNull: ["$lastName", ""] },
                                ],
                            },
                        },
                    },
                    // Days since registration
                    daysSinceRegistration: {
                        $dateDiff: {
                            startDate: "$createdAt",
                            endDate: "$$NOW",
                            unit: "day",
                        },
                    },
                },
            },

            // Stage 3: Project only necessary fields
            {
                $project: {
                    _id: 1,
                    name: 1,
                    middleName: 1,
                    lastName: 1,
                    fullName: 1,
                    email: 1,
                    phoneNumber: 1,
                    alternatePhone: 1,
                    collegeName: 1,
                    courseName: 1,
                    yearOfStudy: 1,
                    accountStatus: 1,
                    avatar: 1,
                    lmsId: 1,
                    myReferralCode: 1,
                    referredBy: 1,
                    linkedin: 1,
                    github: 1,
                    portfolio: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    lastLogin: 1,
                    daysSinceRegistration: 1,
                },
            },

            // Stage 4: Sort
            {
                $sort: {
                    [sortBy]: sortOrder === "asc" ? 1 : -1,
                    _id: 1, // Secondary sort for consistency
                },
            },
        ]);

        // Pagination options
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            customLabels: {
                docs: "pendingUsers",
                totalDocs: "totalPending",
                limit: "pageSize",
                page: "currentPage",
                totalPages: "totalPages",
                hasNextPage: "hasNext",
                hasPrevPage: "hasPrev",
                nextPage: "next",
                prevPage: "prev",
                pagingCounter: "serialNo",
            },
        };

        // Execute pagination
        const result = await Student.aggregatePaginate(aggregate, options);

        res.json({
            success: true,
            message: "Pending users retrieved successfully",
            data: result,
        });
    } catch (error) {
        console.error("Get pending users error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get pending users",
            error: error.message,
        });
    }
};
/**
 * Verify/Reject payment (Admin only)
 * PATCH /api/admin/enrollment/:enrollmentId/payment
 */
export const updatePaymentStatus = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { enrollmentId } = req.params;
        const { action, paymentType, rejectionReason, amountPaid } = req.body;

        const enrollment = await Enrollment.findById(enrollmentId)
            .populate("partialPaymentDetails")
            .populate("fullPaymentDetails")
            .populate("course", "title price")
            .populate("student")
            .session(session);

        if (!enrollment) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            });
        }
        const coursePrice = enrollment.courseAmount || enrollment.course.price;

        // Validate amount based on payment type
        if (paymentType === "partial") {
            if (amountPaid !== Math.ceil(coursePrice * 0.1)) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    message:
                        "Partial payment amount must be 10% of course price",
                });
            }
        } else if (paymentType === "full") {
            if (amountPaid !== coursePrice) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    message:
                        "Full payment amount must be equal to course price",
                });
            }
        }

        if (action === "approve") {
            if (paymentType === "partial") {
                enrollment.paymentStatus = "PARTIAL_PAID";
                enrollment.amountPaid = amountPaid;
                enrollment.amountRemaining = coursePrice - amountPaid;
            } else if (paymentType === "full") {
                enrollment.paymentStatus = "FULLY_PAID";
                enrollment.amountPaid = coursePrice;
                enrollment.amountRemaining = 0;
            }

            const student = enrollment.student;

            const lmsPassword = await student.generateLmsPassword();
            const lmsId = await student.generateLmsId();

            try {
                await sendEnrollmentConfirmationEmail(
                    student.email,
                    student.name,
                    enrollment.course.title,
                    lmsId,
                    lmsPassword,
                    process.env.LMS_LOGIN_URL
                );
                await student.save({ session });
            } catch (emailError) {
                console.error("Email sending failed:", emailError);
                await session.abortTransaction();
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to send enrollment email. Payment not approved.",
                    error: emailError.message,
                });
            }
        } else if (action === "reject") {
            // Send rejection email
            try {
                await sendPaymentRejectionEmail(
                    enrollment.student.email,
                    enrollment.student.name,
                    "Payment Rejected",
                    rejectionReason
                );
            } catch (emailError) {
                console.error("Rejection email sending failed:", emailError);
            }

            // Reset payment status and remove payment details
            if (paymentType === "partial") {
                enrollment.paymentStatus = "UNPAID";
                if (enrollment.partialPaymentDetails) {
                    await Payment.findByIdAndDelete(
                        enrollment.partialPaymentDetails._id,
                        { session }
                    );
                    enrollment.partialPaymentDetails = null;
                }
            } else {
                enrollment.paymentStatus = enrollment.partialPaymentDetails
                    ? "PARTIAL_PAID"
                    : "UNPAID";
                if (enrollment.fullPaymentDetails) {
                    await Payment.findByIdAndDelete(
                        enrollment.fullPaymentDetails._id,
                        { session }
                    );
                    enrollment.fullPaymentDetails = null;
                }
            }
        }

        await enrollment.save({ session });
        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: `Payment ${
                action === "approve" ? "approved" : "rejected"
            } successfully`,
            data: {
                enrollmentId: enrollment._id,
                paymentStatus: enrollment.paymentStatus,
                amountPaid: enrollment.amountPaid,
                amountRemaining: enrollment.amountRemaining,
                rejectionReason: rejectionReason,
            },
        });
    } catch (error) {
        await session.abortTransaction();
        console.error("Update payment status error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update payment status",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    } finally {
        session.endSession();
    }
};

export const getEnrollmentDetails = async (req, res) => {
    try {
        const { enrollmentId } = req.params;

        const enrollment = await Enrollment.findById(enrollmentId)
            .select(
                "-completedQuizzes -completedTasks -completedModules -progressPercentage -isCompleted"
            )
            .populate(
                "student",
                "name middleName lastName email phoneNumber collegeName courseName yearOfStudy avatar"
            )
            .populate("course", "title slug price thumbnail")
            .populate(
                "partialPaymentDetails",
                "accountHolderName bankName ifscCode accountNumber transactionId screenshotUrl currency"
            )
            .populate(
                "fullPaymentDetails",
                "accountHolderName bankName ifscCode accountNumber transactionId screenshotUrl currency"
            );

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            });
        }

        res.status(200).json({
            success: true,
            data: enrollment,
        });
    } catch (error) {
        console.error("Get enrollment error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get enrollment details",
            error: error.message,
        });
    }
};
