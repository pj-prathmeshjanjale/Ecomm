const express = require("express");
const router = express.Router();
const {indexController} = require("../controllers/index.controllers");


router.get("/",indexController);

module.exports = router;