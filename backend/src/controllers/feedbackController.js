import Feedback from "../models/Feedback.js";


// ======================================
// CREATE FEEDBACK
// ======================================

export const createFeedback =
  async (req, res) => {
    try {
      const { message } =
        req.body;

      if (!message) {
        return res.status(400).json({
          success: false,
          message:
            "Message is required",
        });
      }

      const feedback =
        await Feedback.create({
          user: req.user._id,
          message,
        });

      return res.status(201).json({
        success: true,
        message:
          "Feedback submitted successfully",
        feedback,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };


// ======================================
// GET ALL FEEDBACKS (ADMIN)
// ======================================

export const getAllFeedbacks =
  async (req, res) => {
    try {
      const feedbacks =
        await Feedback.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        feedbacks,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };


// ======================================
// MARK RESOLVED
// ======================================

export const resolveFeedback =
  async (req, res) => {
    try {
      const feedback =
        await Feedback.findById(
          req.params.id
        );

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message:
            "Feedback not found",
        });
      }

      feedback.status =
        "resolved";

      await feedback.save();

      return res.status(200).json({
        success: true,
        message:
          "Feedback resolved",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };