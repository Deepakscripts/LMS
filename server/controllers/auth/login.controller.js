import { Student, Admin, RefreshToken } from "../../models/index.js";
import {
    setAuthCookies,
    formatUserResponse,
    formatStudentResponse,
} from "./utils.js";

/**
 * Authenticates an admin with email and password credentials.
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.validatedData;

        // Find admin with password field
        const admin = await Admin.findOne({
            email: email.toLowerCase(),
        }).select("+password");

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check if admin has a password
        if (!admin.password) {
            return res.status(401).json({
                success: false,
                message: "Password not set for this account",
            });
        }

        // Verify password
        const isPasswordValid = await admin.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate tokens
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        // Save refresh token to DB
        await RefreshToken.saveRefreshToken(
            admin._id,
            refreshToken,
            req,
            "Admin"
        );

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Set tokens in httpOnly cookies
        setAuthCookies(res, accessToken, refreshToken);

        res.json({
            success: true,
            message: "Login successful",
            data: {
                user: formatUserResponse(admin),
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        });
    }
};

/**
 * Authenticates students using Learning Management System (LMS) issued credentials.
 */
export const lmsLogin = async (req, res) => {
    try {
        const { lmsId, lmsPassword } = req.validatedData;

        // Find student by LMS ID
        const student = await Student.findOne({ lmsId }).select("+lmsPassword");
        if (!student) {
            return res.status(401).json({
                success: false,
                message: "Invalid LMS ID or password",
            });
        }

        // Verify LMS password
        const isPasswordValid = await student.matchLmsPassword(lmsPassword);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid LMS ID or password",
            });
        }

        // Check account status
        if (student.accountStatus === "blocked") {
            return res.status(403).json({
                success: false,
                message:
                    "Your account has been blocked. Please contact support.",
            });
        }

        // Generate tokens
        const accessToken = student.generateAccessToken();
        const refreshToken = student.generateRefreshToken();

        // Save refresh token to DB
        await RefreshToken.saveRefreshToken(
            student._id,
            refreshToken,
            req,
            "Student"
        );

        // Update last login
        student.lastLogin = new Date();
        await student.save();

        // Set tokens in httpOnly cookies
        setAuthCookies(res, accessToken, refreshToken);

        res.json({
            success: true,
            message: "LMS Login successful",
            data: {
                user: formatStudentResponse(student),
                accessToken,
                refreshToken,
                expiresIn: 15 * 60,
            },
        });
    } catch (error) {
        console.error("LMS Login error:", error);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        });
    }
};
