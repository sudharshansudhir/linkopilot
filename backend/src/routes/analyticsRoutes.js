import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getLinkAnalytics,
  getDashboardAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  getDashboardAnalytics
);

router.get(
  "/:linkId",
  protect,
  getLinkAnalytics
);

export default router;