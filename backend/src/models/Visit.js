import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    browser: {
      type: String,
      default: "Unknown",
    },

    device: {
      type: String,
      default: "Unknown",
    },

    os: {
      type: String,
      default: "Unknown",
    },

    country: {
      type: String,
      default: "Unknown",
    },

    city: {
      type: String,
      default: "Unknown",
    },

    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;