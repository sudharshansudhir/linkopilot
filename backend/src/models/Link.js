import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    shortUrl: {
      type: String,
      required: true,
    },

    qrCode: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "General",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isExpired: {
      type: Boolean,
      default: false,
    },

    lastVisited: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;