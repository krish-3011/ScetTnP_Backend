const express = require("express");
const router = express.Router();
const statController = require("../controllers/stat.js");
const wrapAsync = require("../utils/wrapAsync.js");

//Home Route
router.get("/",async (req,res) => {
    res.redirect("/home")
});

router.get("/home",(statController.indexRoute));

module.exports = router;