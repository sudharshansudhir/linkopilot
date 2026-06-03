import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "resolved",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model(
  "Feedback",
  feedbackSchema
);

export default Feedback;