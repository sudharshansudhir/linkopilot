import Link from "../models/Link.js";
import Visit from "../models/Visit.js";

import {UAParser} from "ua-parser-js";

export const redirectToOriginalUrl = async (
  req,
  res
) => {
  try {
    const { shortCode } = req.params;

    const link = await Link.findOne({
      shortCode,
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    // Expiry Check
    if (
      link.expiresAt &&
      new Date() > link.expiresAt
    ) {
      return res.status(410).json({
        success: false,
        message: "This link has expired",
      });
    }

    // User Agent Parsing
    const parser = new UAParser();
    parser.setUA(
  req.headers["user-agent"]
);

    const result = parser.getResult();

    const browser = 
      result.browser.name || "Unknown";

    const os =
      result.os.name || "Unknown";

    const device =
      result.device.type || "Desktop";

    // IP
    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "Unknown";

    // Store Visit
    await Visit.create({
      link: link._id,

      ipAddress,

      browser,

      device,

      os,

      country: "Unknown",

      city: "Unknown",
    });

    // Update Link Stats
    link.clicks += 1;

    link.lastVisited = new Date();

    await link.save();

    return res.redirect(
      link.originalUrl
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};