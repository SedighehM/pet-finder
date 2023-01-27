const express = require("express");

const petFinder = require("./pet-finder");

const router = express.Router();

router.use("/pet-finder", petFinder);

module.exports = router;
