const express = require("express");
const router = express.Router();

// const uploadTravelPackageImage = require("../controllers/uploadsController");
const {
  getAllTravelPackages,
  getTravelPackage,
  createTravelPackage,
  updateTravelPackage,
  deleteTravelPackage,
  uploadImage,
} = require("../controllers/travelPackagesController");

router.post("/uploadImage", uploadImage);

router.get("/", getAllTravelPackages);
router.post("/", createTravelPackage);
router.get("/:packageName", getTravelPackage);
router.patch("/:packageName", updateTravelPackage);
router.delete("/:packageName", deleteTravelPackage);

module.exports = router;
