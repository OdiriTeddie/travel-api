const express = require("express");
const router = express.Router();

const {
  createSelectedPackage,
  getSelectedPackagesForUser,
  updateSelectedPackage,
  deleteSelectedPackage,
} = require("../controllers/selectedPackageController");

const uploadTravelPackageImage = require("../controllers/uploadsController");

router.get("/", getSelectedPackagesForUser);
router.post("/", createSelectedPackage);
router.patch("/:id", updateSelectedPackage);
router.delete("/:id", deleteSelectedPackage);

// router.post("/uploads", uploadTravelPackageImage);

module.exports = router;
