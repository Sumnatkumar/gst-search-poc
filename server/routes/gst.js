const express = require("express");
const router = express.Router();
const GSTData = require("../models/GSTData");
const csv = require("csv-parser");
const fs = require("fs");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Search GST data
router.get("/search", async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    const searchQuery = query
      ? {
          $or: [
            { gstin: { $regex: query, $options: "i" } },
            { legalName: { $regex: query, $options: "i" } },
            { tradeName: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const gstData = await GSTData.find(searchQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await GSTData.countDocuments(searchQuery);

    res.json({
      gstData,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get GST data by ID
router.get("/:id", async (req, res) => {
  try {
    const gstData = await GSTData.findById(req.params.id);
    if (!gstData) {
      return res.status(404).json({ message: "GST record not found" });
    }
    res.json(gstData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload CSV file
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          // Process and save to database
          for (const item of results) {
            const gstData = new GSTData({
              gstin: item.gstin,
              legalName: item.legalName,
              tradeName: item.tradeName,
              registrationDate: item.registrationDate,
              state: item.state,
              businessType: item.businessType,
              status: item.status,
              address: item.address,
            });

            await gstData.save();
          }

          // Delete the file after processing
          fs.unlinkSync(req.file.path);

          res.json({
            message: "File uploaded successfully",
            records: results.length,
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
