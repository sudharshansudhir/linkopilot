import Link from "../models/Link.js";

import generateShortCode from "../utils/generateShortCode.js";
import generateQRCode from "../services/qrGenerator.js";
import validateUrl from "../utils/validateUrl.js";

// ==========================================
// CREATE LINK
// ==========================================

export const createLink = async (
  req,
  res
) => {
  try {
    const {
      title,
      originalUrl,
      category,
      isPublic,
      expiresAt,
      customAlias,
    } = req.body;
if (!title || !originalUrl) {
  return res.status(400).json({
    success: false,
    message: "Title and URL are required",
  });
}

if (!validateUrl(originalUrl)) {
  return res.status(400).json({
    success: false,
    message: "Invalid URL",
  });
}

    let shortCode;

    if (
      customAlias &&
      customAlias.trim() !== ""
    ) {
      shortCode =
        customAlias.trim();
    } else {
      shortCode =
        generateShortCode();
    }

    const existingLink =
      await Link.findOne({
        shortCode,
      });

    if (existingLink) {
      return res.status(400).json({
        success: false,
        message:
          "Alias already exists",
      });
    }

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    const qrCode =
      await generateQRCode(
        shortUrl
      );

    const newLink =
      await Link.create({
        user: req.user._id,
        title,
        originalUrl,
        shortCode,
        shortUrl,
        qrCode,
        category:
          category ||
          "General",
        isPublic:
          isPublic ===
          undefined
            ? true
            : isPublic,
        expiresAt:
          expiresAt ||
          null,
      });

    return res.status(201).json({
      success: true,
      link: newLink,
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


// ==========================================
// GET MY LINKS
// ==========================================

export const getMyLinks =
  async (req, res) => {
    try {
      const links =
        await Link.find({
          user: req.user._id,
        }).sort({
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


// ==========================================
// GET SINGLE LINK
// ==========================================

export const getSingleLink =
  async (req, res) => {
    try {
      const link =
        await Link.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!link) {
        return res.status(404).json({
          success: false,
          message:
            "Link not found",
        });
      }

      return res.status(200).json({
        success: true,
        link,
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


// ==========================================
// UPDATE LINK
// ==========================================

export const updateLink =
  async (req, res) => {
    try {
      const {
        title,
        originalUrl,
        category,
        isPublic,
        expiresAt,
      } = req.body;

      const link =
        await Link.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!link) {
        return res.status(404).json({
          success: false,
          message:
            "Link not found",
        });
      }

      if (
  originalUrl &&
  !validateUrl(originalUrl)
) {
  return res.status(400).json({
    success: false,
    message: "Invalid URL",
  });
}

      if (title)
        link.title = title;

      if (originalUrl)
        link.originalUrl =
          originalUrl;

      if (category)
        link.category =
          category;

      if (
        isPublic !== undefined
      ) {
        link.isPublic =
          isPublic;
      }

      if (
        expiresAt !==
        undefined
      ) {
        link.expiresAt =
          expiresAt;
      }

      await link.save();

      return res.status(200).json({
        success: true,
        message:
          "Link updated successfully",
        link,
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


// ==========================================
// DELETE LINK
// ==========================================

export const deleteLink =
  async (req, res) => {
    try {
      const link =
        await Link.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!link) {
        return res.status(404).json({
          success: false,
          message:
            "Link not found",
        });
      }

      await link.deleteOne();

      return res.status(200).json({
        success: true,
        message:
          "Link deleted successfully",
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

  // ==========================================
// GET TRENDING LINKS
// ==========================================

export const getTrendingLinks =
  async (req, res) => {
    try {
      const links =
        await Link.find({
          isPublic: true,
        })
          .sort({
            clicks: -1,
          })
          .limit(10)
          .select(
            "title shortUrl clicks category"
          );

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