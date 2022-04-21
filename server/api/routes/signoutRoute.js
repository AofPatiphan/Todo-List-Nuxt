const express = require("express");
const router = express.Router();
const passport = require("passport");
const signoutController = require("../controllers/signoutController");
const auth = passport.authenticate("jwt-auth", { session: false });

router.delete("/", auth, signoutController.signout);

module.exports = router;
