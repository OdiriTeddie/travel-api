const SelectedPackage = require("../models/selectedPackage");
const User = require("../models/User");
const TravelPackage = require("../models/travelPackage");
const { NotFoundError } = require("../error");
const { StatusCodes } = require("http-status-codes");

const createSelectedPackage = async (req, res) => {
  const { userId, packageId, message, date } = req.body;
  const user = await User.findById(userId);
  const package = await TravelPackage.findById(packageId);

  if (!user || !package) {
    throw new NotFoundError(`No Package with id ${package}`);
  }

  const selectedPacakge = await SelectedPackage.create(req.body);
  res.status(StatusCodes.CREATED).json({ selectedPacakge });
};

const getSelectedPackagesForUser = async (req, res) => {
  const { userId } = req.user;
  const selectedPackages = await SelectedPackage.find({ userId }).populate(
    "packageId"
  );

  res.status(StatusCodes.OK).json(selectedPackages);
};

const updateSelectedPackage = async (req, res) => {
  const { msg, date } = req.body;
  const { id } = req.params;
  const { userId } = req.user;

  if (msg === "" || date === "") {
    throw new BadRequestError("msg or date fields cannot be empty");
  }

  const updateFields = { msg, date };
  const selectedPackage = await SelectedPackage.findByIdAndUpdate(
    {
      _id: id,
      userId: userId,
    },
    updateFields,
    { new: true }
  );
  if (!selectedPackage) {
    throw new NotFoundError(`No travel package with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ selectedPackage });
};

const deleteSelectedPackage = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const selectedPackage = await SelectedPackage.findByIdAndDelete({
    _id: id,
    userId: userId,
  });
  if (!selectedPackage) {
    throw new NotFoundError(`No Travel Package with id ${id}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createSelectedPackage,
  getSelectedPackagesForUser,
  updateSelectedPackage,
  deleteSelectedPackage,
};
