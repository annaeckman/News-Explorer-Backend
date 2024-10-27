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

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/newsexplorer_db")
  .then(() => {})
  .catch(console.error);

app.use(helmet());

app.use(limiter);

// JSON parsing middleware
app.use(express.json());

app.use(cors());

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
