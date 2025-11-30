import { applyReferralCodeSchema } from "../../validation/student.zod.js";
import { Student, Referral } from "../../models/index.js";
/**
 * GET /api/student/referral
 * Get referral info
 */
export const getReferralInfo = async (req, res) => {
    try {
        const student = await Student.findById(req.userId).select(
            "myReferralCode referralCount isPremiumUnlocked"
        );

        const referrals = await Referral.find({ referrer: req.userId })
            .populate("referee", "name createdAt")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: {
                referralCode: student.myReferralCode,
                referralCount: student.referralCount,
                isPremiumUnlocked: student.isPremiumUnlocked,
                referrals: referrals.map((r) => ({
                    name: r.referee.name,
                    joinedAt: r.referee.createdAt,
                    credited: r.credited,
                })),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * POST /api/student/referral/apply
 * Apply referral code
 */
export const applyReferralCode = async (req, res) => {
    try {
        const validation = applyReferralCodeSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                errors: validation.error.errors,
            });
        }

        const { referralCode } = validation.data;
        const student = await Student.findById(req.userId);

        // Check if student already used a referral code
        if (student.referredBy) {
            return res.status(400).json({
                success: false,
                message: "You have already used a referral code",
            });
        }

        // Find referrer
        const referrer = await Student.findOne({
            myReferralCode: referralCode,
        });
        if (!referrer) {
            return res.status(404).json({
                success: false,
                message: "Invalid referral code",
            });
        }

        // Can't use own code
        if (referrer._id.toString() === req.userId.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot use your own referral code",
            });
        }

        // Create referral record
        await Referral.create({
            referrer: referrer._id,
            referee: req.userId,
            referralCode,
        });

        // Update student
        student.referredBy = referralCode;
        await student.save();

        // Update referrer's count
        referrer.referralCount += 1;
        if (referrer.referralCount >= 3 && !referrer.isPremiumUnlocked) {
            referrer.isPremiumUnlocked = true;
        }
        await referrer.save();

        // Unlock benefits for referee
        student.isPremiumUnlocked = true;
        await student.save();

        res.json({
            success: true,
            message:
                "Referral code applied successfully! Premium benefits unlocked.",
            data: { isPremiumUnlocked: true },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
