// const express = require("express");
import express from 'express'
const router = express.Router();
const signupController = require("../controllers/signupController");

router.post("/", signupController.signup);

module.exports = router;
