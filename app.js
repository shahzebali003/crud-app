const path = require("path");
const express = require("express");
const app = express();
const userRouter = require("./useroutes");
//const bcrypt= require("bcryptjs")
// MIDDLE WARE
app.use(express.json());

// DATABASE
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const mongoose = require("mongoose");

mongoose
  .connect(DB, {
  
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB Connection Successful"));

app.use("/api/v1/", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
