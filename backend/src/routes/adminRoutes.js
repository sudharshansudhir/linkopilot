import express from "express";

import {
  adminLogin,
  getAdminDashboard,
  getAllUsers,
  getAllLinks,
  getTopLinks,
  getTopUsers,
} from "../controllers/adminController.js";

import adminProtect from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post(
  "/login",
  adminLogin
);

router.get(
  "/dashboard",
  adminProtect,
  getAdminDashboard
);

router.get(
  "/users",
  adminProtect,
  getAllUsers
);

router.get(
  "/links",
  adminProtect,
  getAllLinks
);

router.get(
  "/top-links",
  adminProtect,
  getTopLinks
);

router.get(
  "/top-users",
  adminProtect,
  getTopUsers
);

export default router;