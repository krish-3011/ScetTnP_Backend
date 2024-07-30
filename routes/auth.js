const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../modules/studentSchema.js");
const Offer = require("../modules/offerSchema.js");
const wrapAsync = require("../utils/wrapAsync.js");

//authenticate
router.post("/",async (req,res)=>{

    let { enrollmentNo , birthDate } = req.body;

    let profile = await Student.find({enrollment_no : enrollmentNo});
    if(!profile){
        res.status(404).json({message : "Student not found"});
    }

    profile = profile[0];

    if(profile.birth_date.slice(0,10) === birthDate){
        res.status(200).json(profile);
    } else {
        res.send(401).json({message : "wrong credentials"})
    }
});

module.exports = router;