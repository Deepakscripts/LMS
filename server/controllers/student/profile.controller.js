import { Student } from "../../models/index.js";
import {
    updateProfileSchema,
    updateAvatarSchema,
} from "../../validation/student.zod.js";

/**
 * GET /api/student/profile
 * Get student profile
 */
export const getProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.userId).select(
            "-lmsPassword -resetPasswordToken -resetPasswordExpire -googleId -githubId"
        );

        res.json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * PUT /api/student/profile
 * Update student profile
 */
export const updateProfile = async (req, res) => {
    try {
        const validation = updateProfileSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                errors: validation.error.errors,
            });
        }

        const student = await Student.findByIdAndUpdate(
            req.userId,
            { $set: validation.data },
            { new: true, runValidators: true }
        ).select("-lmsPassword -resetPasswordToken -resetPasswordExpire");

        res.json({
            success: true,
            data: student,
            message: "Profile updated successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * PUT /api/student/profile/avatar
 * Update student avatar
 */
export const updateAvatar = async (req, res) => {
    try {
        const validation = updateAvatarSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                errors: validation.error.errors,
            });
        }

        const student = await Student.findByIdAndUpdate(
            req.userId,
            { avatar: validation.data.avatar },
            { new: true }
        ).select("avatar");

        res.json({
            success: true,
            data: student,
            message: "Avatar updated successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
