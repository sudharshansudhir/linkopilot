import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Link from "../models/Link.js";
import Feedback from "../models/Feedback.js";

import generateToken from "../utils/generateToken.js";


// ======================================
// ADMIN LOGIN
// ======================================

export const adminLogin = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and Password required",
      });
    }

    const admin =
      await Admin.findOne({
        email,
      });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Credentials",
      });
    }

    return res.status(200).json({
      success: true,
      token: generateToken(
        admin._id
      ),
      admin: {
        id: admin._id,
        email: admin.email,
      },
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
// ADMIN DASHBOARD
// ======================================

export const getAdminDashboard =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalLinks =
        await Link.countDocuments();

      const totalFeedback =
        await Feedback.countDocuments();

      const links =
        await Link.find();

      const totalClicks =
        links.reduce(
          (acc, item) =>
            acc + item.clicks,
          0
        );

      return res.status(200).json({
        success: true,
        stats: {
          totalUsers,
          totalLinks,
          totalClicks,
          totalFeedback,
        },
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
// ALL USERS
// ======================================

export const getAllUsers =
  async (req, res) => {
    try {
      const users =
        await User.find()
          .select("-password")
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        users,
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
// ALL LINKS
// ======================================

export const getAllLinks =
  async (req, res) => {
    try {
      const links =
        await Link.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        links,
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
// TOP LINKS
// ======================================

export const getTopLinks =
  async (req, res) => {
    try {
      const links =
        await Link.find({
          isPublic: true,
        })
          .populate(
            "user",
            "name"
          )
          .sort({
            clicks: -1,
          })
          .limit(10);

      return res.status(200).json({
        success: true,
        links,
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
// TOP USERS
// ======================================

export const getTopUsers =
  async (req, res) => {
    try {
      const users =
        await User.find();

      const results =
        await Promise.all(
          users.map(
            async (user) => {
              const links =
                await Link.find({
                  user: user._id,
                });

              const clicks =
                links.reduce(
                  (
                    total,
                    link
                  ) =>
                    total +
                    link.clicks,
                  0
                );

              return {
                userId:
                  user._id,
                name:
                  user.name,
                email:
                  user.email,
                totalLinks:
                  links.length,
                totalClicks:
                  clicks,
              };
            }
          )
        );

      results.sort(
        (a, b) =>
          b.totalClicks -
          a.totalClicks
      );

      return res.status(200).json({
        success: true,
        users:
          results.slice(
            0,
            10
          ),
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