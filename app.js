const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();
const helmet = require("helmet");
const { limiter } = require("./utils/rate-limit");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { mongoServerAddress } = require("./utils/config");

const app = express();
const { PORT = 3002 } = process.env;

mongoose
  .connect(mongoServerAddress)
  .then(() => {})
  .catch(console.error);

app.use(helmet());

app.use(limiter);

// JSON parsing middleware
app.use(express.json());

app.use(cors());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(requestLogger);

// Main router
app.use("/", mainRouter);

// Error handing middleware
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
