const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../modules/student.js");
const object = require("../utils/functions/Object.js");

//Home Route
router.get("/",async (req,res) => {
    res.redirect("/home")
});


router.get("/home",async (req,res,next) => {
    //get filter
    let {year = ".{2}" , dept = ".{2}"} = req.query;

    //geeting addmission year of student for enrollment no
    if(req.query.year){
        year = Number(req.query.year.slice(5)) - 4;
    }

    const enrollment_no = `ET${year}BT${dept}.{3}`;

    let statObj = { total : 0, intrested : 0, placed : 0 };
    let students = await Student.find({enrollment_no :{$regex : enrollment_no}});
    console.log(students)
    if(students.length > 0){
        for(let student of students){
            if(student.applied.length > 0 || student.selected.length > 0){
                statObj.intrested += 1;
            }
            if(student.selected.length > 0){
                statObj.placed += 1;
            }
            statObj.total += 1;
        }
    }
    res.json(statObj);
});

module.exports = router;