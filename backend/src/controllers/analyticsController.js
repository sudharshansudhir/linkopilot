import mongoose from "mongoose";

import Link from "../models/Link.js";
import Visit from "../models/Visit.js";


// =================================
// LINK ANALYTICS
// =================================

export const getLinkAnalytics = async (
  req,
  res
) => {
  try {
    const { linkId } = req.params;

    const link = await Link.findOne({
      _id: linkId,
      user: req.user._id,
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    const recentVisits = await Visit.find({
      link: linkId,
    })
      .sort({ visitedAt: -1 })
      .limit(10);

    const browserStats =
      await Visit.aggregate([
        {
          $match: {
            link: new mongoose.Types.ObjectId(
              linkId
            ),
          },
        },
        {
          $group: {
            _id: "$browser",
            count: { $sum: 1 },
          },
        },
      ]);

    const deviceStats =
      await Visit.aggregate([
        {
          $match: {
            link: new mongoose.Types.ObjectId(
              linkId
            ),
          },
        },
        {
          $group: {
            _id: "$device",
            count: { $sum: 1 },
          },
        },
      ]);

    const dailyTrends =
      await Visit.aggregate([
        {
          $match: {
            link: new mongoose.Types.ObjectId(
              linkId
            ),
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$visitedAt",
              },
            },
            clicks: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    return res.status(200).json({
      success: true,

      analytics: {
        totalClicks: link.clicks,

        lastVisited:
          link.lastVisited,

        recentVisits,

        browserStats,

        deviceStats,

        dailyTrends,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// =================================
// OVERALL DASHBOARD ANALYTICS
// =================================

export const getDashboardAnalytics =
  async (req, res) => {
    try {
      const links = await Link.find({
        user: req.user._id,
      });

      const totalLinks =
        links.length;

      const totalClicks =
        links.reduce(
          (acc, link) =>
            acc + link.clicks,
          0
        );

      const activeLinks =
        links.filter(
          (link) =>
            !link.expiresAt ||
            new Date() <
              link.expiresAt
        ).length;

      const recentLinks =
        await Link.find({
          user: req.user._id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      return res.status(200).json({
        success: true,

        analytics: {
          totalLinks,
          totalClicks,
          activeLinks,
          recentLinks,
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