import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    // Device/session info (optional but useful)
    userAgent: { type: String },
    ipAddress: { type: String },
    // For revoking specific sessions
    isRevoked: {
      type: Boolean,
      default: false,
    },
    // For token rotation - track if token was already used
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedAt: {
      type: Date,
    },
    // Link to the token that replaced this one (for tracking chain)
    replacedByToken: {
      type: String,
    },
    // Token family for detecting reuse attacks
    family: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Index for efficient cleanup of expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for finding tokens by user
refreshTokenSchema.index({ user: 1, isRevoked: 1 });

// Index for token family (for revoking entire chain on reuse detection)
refreshTokenSchema.index({ family: 1 });

// Static method to clean up expired/revoked tokens for a user
refreshTokenSchema.statics.cleanupUserTokens = async function (userId) {
  await this.deleteMany({
    user: userId,
    $or: [{ expiresAt: { $lt: new Date() } }, { isRevoked: true }],
  });
};

// Static method to revoke all tokens for a user (logout from all devices)
refreshTokenSchema.statics.revokeAllUserTokens = async function (userId) {
  await this.updateMany({ user: userId }, { isRevoked: true });
};

// Static method to revoke entire token family (on reuse detection)
refreshTokenSchema.statics.revokeTokenFamily = async function (family) {
  await this.updateMany({ family }, { isRevoked: true });
};

export default mongoose.model("RefreshToken", refreshTokenSchema);
