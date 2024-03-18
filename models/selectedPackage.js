const mongoose = require("mongoose");

const SelectedPackageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  packageId: {
    type: mongoose.Types.ObjectId,
    ref: "travelPackage",
    required: [true, "please select package"],
  },
  msg: {
    type: String,
    required: [true, "Please provide a short message"],
    maxlenght: 500,
  },
  date: {
    type: Date,
    required: [true, "Please pick a date"],
  },
});

module.exports = mongoose.model("SelectedPackage", SelectedPackageSchema);
