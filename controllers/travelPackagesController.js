const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../error");
const TravelPackage = require("../models/travelPackage");
const path = require("path");

const getAllTravelPackages = async (req, res) => {
  const { search, country, activities } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
    ];
  }

  // if (country && country !== "all") {
  //   queryObject.country = country;
  // }

  // if (activities && acitivities !== "all") {
  //   queryObject.activities = activities;
  // }

  let result = TravelPackage.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const travelPackages = await result;

  const totalTravelPackages = await TravelPackage.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTravelPackages / limit);

  res
    .status(StatusCodes.OK)
    .json({ travelPackages, totalTravelPackages, numOfPages });
};
const createTravelPackage = async (req, res) => {
  const travelPackages = await TravelPackage.create(req.body);
  res.status(StatusCodes.CREATED).json({ travelPackages });
};

const getTravelPackage = async (req, res) => {
  const { packageName } = req.params;

  const travelPackage = await TravelPackage.findOne({
    name: packageName,
  });

  if (!travelPackage) {
    throw new NotFoundError(`No package with name ${packageName}`);
  }

  res.status(StatusCodes.OK).json({ travelPackage });
};
const updateTravelPackage = async (req, res) => {
  const { packageName } = req.params;

  const travelPackage = await TravelPackage.findOneAndUpdate(
    { name: packageName },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!travelPackage) {
    throw new NotFoundError(`No package with name ${packageName}`);
  }

  res.status(StatusCodes.OK).json(travelPackage);
};
const deleteTravelPackage = async (req, res) => {
  const { packageName } = req.params;
  const travelPackage = await TravelPackage.findOneAndDelete({
    name: packageName,
  });

  if (!travelPackage) {
    throw new NotFoundError(`No package with name ${packageName}`);
  }

  res.status(StatusCodes.OK).json({ travelPackage });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload Image");
  }
  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload Image smaller than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  getAllTravelPackages,
  getTravelPackage,
  createTravelPackage,
  updateTravelPackage,
  deleteTravelPackage,
  uploadImage,
};
