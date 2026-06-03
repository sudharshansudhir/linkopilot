import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin =
      await Admin.findOne({
        email:
          "admin@linkopilot.com",
      });

    if (existingAdmin) {
      console.log(
        "Admin already exists"
      );

      process.exit();
    }

    const hashedPassword =
      await bcrypt.hash(
        "Admin@123",
        10
      );

    await Admin.create({
      name: "Super Admin",
      email:
        "admin@linkopilot.com",
      password:
        hashedPassword,
    });

    console.log(
      "Admin Created Successfully"
    );

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

createAdmin();