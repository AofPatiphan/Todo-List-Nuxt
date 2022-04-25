// const express = require("express");
import express from 'express'
const bodyParser = require("body-parser");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const userRoute = require("./routes/userRoute");
const signoutRoute = require("./routes/signoutRoute");
const uploadRoute = require("./routes/uploadRoute");

const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
require("dotenv").config();
require("./middlewares/passport");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Hello world");
  return res.json()
});

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/user", userRoute);
app.use("/signout", signoutRoute);
app.use("/upload", uploadRoute);

module.exports = app;
