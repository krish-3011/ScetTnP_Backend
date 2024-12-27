const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const reportFun = require("../controllers/report.js")

// router.post("/",wrapAsync(reportFun.indexRoute));
router.post("/",reportFun.indexRoute);

module.exports = router