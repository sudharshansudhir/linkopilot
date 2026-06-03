import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminProtect from "../middleware/adminAuthMiddleware.js";

import {
  createFeedback,
  getAllFeedbacks,
  resolveFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createFeedback
);

router.get(
  "/",
  adminProtect,
  getAllFeedbacks
);

router.put(
  "/:id/resolve",
  adminProtect,
  resolveFeedback
);

export default router;