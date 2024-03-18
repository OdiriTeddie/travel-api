const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
dotenv.config();
const path = require("path");
require("express-async-errors");
const helmet = require("helmet");
// connectDB
const connectDB = require("./db/connect");

const authenticateUser = require("./middleware/authentication");

// routers
const travelPackageRouter = require("./routes/travelPackages");
const authRouter = require("./routes/auth");
const selectedPackageRouter = require("./routes/selectedPackage");

// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(helmet());
// app.use(express.static(path.resolve(__dirname, "./dist")));
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/packages", travelPackageRouter);
app.use("/api/v1/selected-packages", authenticateUser, selectedPackageRouter);

app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "./dist", "index.html"));
  res.send("Travel Package API");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
