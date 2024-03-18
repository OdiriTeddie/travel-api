const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("no User");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  // compare password
  if (!isPasswordCorrect) {
    throw new Error("no Password");
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, id: user._id }, token });
};

module.exports = { register, login };
