const express = require("express");
const router = express.Router();

const uploadTravelPackageImage = require("../controllers/uploadsController");

router.post("/uploads", uploadTravelPackageImage);

module.exports = router;
