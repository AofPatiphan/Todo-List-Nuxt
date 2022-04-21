const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const auth = passport.authenticate("jwt-auth", { session: false });

router.get("/me", auth, userController.getme);

module.exports = router;
