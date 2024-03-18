const path = require("path");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../error");
const CustomAPIError = require("../error");
const fs = require("fs");
// const travelPackage = require("../models/travelPackage");

const uploadTravelPackageImage = async (req, res) => {
  if (!req.files) {
    throw new NotFoundError(`No file uploaded`);
  }

  const travelPackageImage = req.files.image;

  if (!travelPackageImage.mimetype.startsWith("image")) {
    throw new CustomAPIError("Please upload Image");
  }

  const maxSize = 1024 * 1024;

  if (travelPackageImage.size > maxSize) {
    throw new CustomAPIError("Please upload Image small than 1KB");
  }

  // console.log(req.files);

  const imagePath = path.join(
    __dirname,
    "../public/uploads" + `${travelPackageImage.name}`
  );

  await travelPackageImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${travelPackageImage.name}` } });
};

module.exports = {
  uploadTravelPackageImage,
};
