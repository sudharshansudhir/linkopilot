import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import redirectRoutes from "./routes/redirectRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Link-O-Pilot API Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/links", linkRoutes);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use("/api/admin", adminRoutes);

app.use(
  "/api/feedback",
  feedbackRoutes
);

/*
  IMPORTANT:
  Keep redirect route LAST.
*/
app.use("/", redirectRoutes);

export default app;