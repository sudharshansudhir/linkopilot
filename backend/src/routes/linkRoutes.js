import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createLink,
  getMyLinks,
  getSingleLink,
  updateLink,
  deleteLink,
  getTrendingLinks,
} from "../controllers/linkController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createLink
);

router.get(
  "/",
  protect,
  getMyLinks
);
router.get(
  "/trending/public",
  protect,
  getTrendingLinks
);

router.get(
  "/:id",
  protect,
  getSingleLink
);

router.put(
  "/:id",
  protect,
  updateLink
);

router.delete(
  "/:id",
  protect,
  deleteLink
);

export default router;