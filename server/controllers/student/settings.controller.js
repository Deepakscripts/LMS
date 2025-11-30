import { Student } from "../../models/index.js";
import {
    updatePrivacySchema,
    changePasswordSchema,
} from "../../validation/student.zod.js";

/**
 * PUT /api/student/settings/privacy
 * Update privacy settings
 */
export const updatePrivacy = async (req, res) => {
    try {
        const validation = updatePrivacySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                errors: validation.error.errors,
            });
        }

        const student = await Student.findByIdAndUpdate(
            req.userId,
            { isProfileLocked: validation.data.isProfileLocked },
            { new: true }
        ).select("isProfileLocked");

        res.json({
            success: true,
            data: student,
            message: "Privacy settings updated",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * PUT /api/student/settings/password
 * Change password
 */
export const changePassword = async (req, res) => {
    try {
        const validation = changePasswordSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                errors: validation.error.errors,
            });
        }

        const student = await Student.findById(req.userId).select(
            "+lmsPassword"
        );

        if (!student.lmsPassword) {
            return res.status(400).json({
                success: false,
                message: "Password change not available for OAuth users",
            });
        }

        const isMatch = await student.matchLmsPassword(
            validation.data.currentPassword
        );
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        student.lmsPassword = validation.data.newPassword;
        await student.save();

        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
