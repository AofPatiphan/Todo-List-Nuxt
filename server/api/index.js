// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World - express.js API");
// });

// module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const userRoute = require("./routes/userRoute");
const signoutRoute = require("./routes/signoutRoute");
const uploadRoute = require("./routes/uploadRoute");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
require("dotenv").config();
require("./middlewares/passport");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Hello world");
  res.status(200).json({ message: "Hello world" });
});

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/user", userRoute);
app.use("/signout", signoutRoute);
app.use("/upload", uploadRoute);

module.exports = app;
