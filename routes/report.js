const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const reportFun = require("../controllers/report.js")

router.get("/",wrapAsync(reportFun.indexRoute));

module.exports = router