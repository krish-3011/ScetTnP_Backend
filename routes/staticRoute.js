const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../schema/model/studentSchema.js");
const object = require("../utils/functions/Object.js");

//Home Route
router.get("/",async (req,res) => {
    res.redirect("/home")
});


router.get("/home",async (req,res,next) => {
    //get filter
    let {year = ".{2}" , dept = ".{2}"} = req.query;
    console.log(req.query.year.slice(0,5));
    //geeting addmission year of student for enrollment no
    if(req.query.year){
        year = Number(req.query.year.slice(0,4)) - 4;
        year = Number(year.toString().slice(2,4));
    }

    console.log(year)
    let enrollment_no = `ET${year}BT${dept}.{3}`;

    let statObj = { total : 0, intrested : 0, placed : 0, highestPackge : {} , averagePackge : {} , sector : { core : {} , IT : {} , managment : {}}};
    let students = await Student.find({enrollment_no :{$regex : enrollment_no}});
    console.log(students);
    if(students.length > 0){
        for(let student of students){
            if(student.applied.length > 0 || student.selected){
                statObj.intrested += 1;
            }
            if(student.selected){
                
                statObj.placed += 1;
            }
            statObj.total += 1;
        }
    }

    //heigest packge
    enrollment_no = `ET.{2}BT${dept}.{3}`;
    let sum = {};
    //creating year obj
    let currentYear = 2026;
    for(let yearCount = 0; yearCount < 5; yearCount++){
        let yearStr = `${currentYear}`
        statObj.highestPackge[yearStr] = 0;
        statObj.averagePackge[yearStr] = 0;
        // statObj.sector[yearStr] = { core : 0 , IT : 0, Managment : 0}
        statObj.sector.core[yearStr] = 0;
        statObj.sector.IT[yearStr] = 0;
        statObj.sector.managment[yearStr] = 0;

        sum[yearStr] = {salary : 0 , students : 0};
        
        currentYear -= 1;
    }

    students = await Student.find({enrollment_no :{$regex : enrollment_no}}).populate('selected.offer');
    if(students.length > 0){
        for(let student of students){
            if(student.selected){
                let addYear = Number(student.enrollment_no.slice(2,4))+2004;

                //heights package
                if(statObj.highestPackge[addYear] < student.selected.salary){
                    statObj.highestPackge[addYear] = student.selected.salary;
                }

                //average package
                sum[addYear].salary += student.selected.salary;
                sum[addYear].students += 1;

                //setor data
                let sector = student.selected.offer.sector;
                statObj.sector[sector][addYear] += 1;
            }
        }
        for(let year in statObj.averagePackge){
            statObj.averagePackge[year] = sum[year].salary / sum[year].students || 0;
        }
    }
    res.json(statObj);
});

module.exports = router;