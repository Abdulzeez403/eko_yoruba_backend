const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Please add a message"],
    },
    type: {
      type: String,
      enum: ["push", "announcement", "email"],
      default: "push",
    },
    targetAudience: {
      type: String,
      enum: ["all", "active", "inactive", "premium", "custom"],
      default: "all",
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "sent"],
      default: "draft",
    },
    scheduledAt: {
      type: Date,
    },
    sentAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
