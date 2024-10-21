const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/newsexplorer_db")
  .then(() => {})
  .catch(console.error);

// JSON parsing middleware
app.use(express.json());

// Main router
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
