const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../schema/model/studentSchema.js");
const {getDeptCode,getDeptShortname} = require("../utils/functions/dataBase.js");


// Su student Data
let getSUData = async (year,dept) => {
    let SU_enrollment_no = `^ET${year}BT${dept}.{3}`;
    let SU_D2D_enrollment_no = `^ET${year+1}BT${dept}[^01].{2}`;

    let students = await Student.Su_student.find({enrollment_no :{$regex : SU_enrollment_no}});
    let d2dStudent = await Student.Su_student.find({enrollment_no :{$regex : SU_D2D_enrollment_no}});
    students.push(...d2dStudent);


    let statObj = { total : 0, intrested : 0, placed : 0, highestPackge : {} , averagePackge : {} , sector : { CORE : {} , IT : {} , MANAGEMENT : {} , OTHER : {}}};
    
    // fill stat Obj
    // if( Array.isArray(students) && students.length > 0){
    //     for(let student of students){
    //         if(student.applied.length > 0 || student.selected){
    //             statObj.intrested += 1;
    //         }
    //         if(student.selected.length > 0){
                
    //             statObj.placed += 1;
    //         }
    //         statObj.total += 1;
    //     }
    // }



    // heigest packge    
    let sum = {};

    //creating year obj
    let currentYear;
    if(year == ".{2}"){
        currentYear = new Date().getFullYear();
    }
    else {
        currentYear = year + 2004;
    }
    for(let yearCount = 0;yearCount <= 4;yearCount++){

        let yearStr = `${currentYear}`;
        statObj.highestPackge[yearStr] = {salary : 0 , company : "" };
        statObj.averagePackge[yearStr]= {salary : 0 , company : "" };
        statObj.sector.CORE[yearStr] = 0;
        statObj.sector.IT[yearStr] = 0;
        statObj.sector.MANAGEMENT[yearStr] = 0;
        statObj.sector.OTHER[yearStr] = 0;


        sum[yearStr] = {salary : 0 , students : 0};
        
        currentYear -= 1;
    }

    return statObj;


    SU_enrollment_no = `^ET.{2}BT${dept}.{3}`;
    SU_D2D_enrollment_no = `^ET.{2}BT${dept}[^01].{2}`;

    students = await Student.Su_student.find({enrollment_no :{$regex : SU_enrollment_no}})
    .populate({
        path : 'selected',
        populate : {  
            path : 'offer',
            populate : {
                path : 'company'
            }
        }
    });

    d2dStudent = await Student.Su_student.find({enrollment_no :{$regex : SU_D2D_enrollment_no}})
    .populate({
        path : 'selected',
        populate : {  
            path : 'offer',
            populate : {
                path : 'company'
            }
        }
    });;
    students.push(...d2dStudent);

    if(students.length > 0){
        for(let student of students){
            if(student.selected.length > 0){

                let passoutYear = Number(student.enrollment_no.slice(2,4))+2004;
                if(sum[passoutYear]){
                    //heights package
                    if(statObj.highestPackge[passoutYear].salary < student.selected[0].salary){
                        statObj.highestPackge[passoutYear].salary = student.selected[0].salary;
                        console.log(student.enrollment_no)
                        statObj.highestPackge[passoutYear].company = student.selected[0].offer.company.name;
                    }

                    //average package
                    if(student.selected[0].salary){
                        sum[passoutYear].salary += student.selected[0].salary;
                        sum[passoutYear].students += 1;
                    }

                    //setor data
                    let sector = student.selected[0].offer.sector.toUpperCase();
                    statObj.sector[sector][`${passoutYear}`] += 1;
                }
            }
        }
        for(let year in statObj.averagePackge){
            statObj.averagePackge[year] = sum[year].salary / sum[year].students || 0;
        }
    }

    return statObj;
}

//Gtu student Data
let getGtuData = async (statObj,year,dept) => {

    let deptCode = getDeptCode(dept);
    let GTU_enrollment_no = `^${year}042[04]1${deptCode}.{3}`;
    let GTU_D2D_enrollment_no = `^${year}04231${deptCode}.{3}`;

    let students = await Student.Gtu_student.find({enrollment_no :{$regex : GTU_enrollment_no}});
    let d2dStudent = await Student.Gtu_student.find({enrollment_no :{$regex : GTU_D2D_enrollment_no}});
    students.push(...d2dStudent);
    // fill stat Obj
    if( Array.isArray(students) && students.length > 0){
        for(let student of students){
            if(student.applied.length > 0 || student.selected){
                statObj.intrested += 1;
            }
            if(student.selected.length > 0){
                
                statObj.placed += 1;
            }
            statObj.total += 1;
        }
    }

    //heigest packge
    GTU_enrollment_no = `^.{2}04201${deptCode}.{3}`
    let sum = {};

    //creating year obj
    let currentYear;
    if(year == ".{2}"){
        currentYear = new Date().getFullYear();
    }
    else {
        currentYear = year + 2004;
    }
    for(let yearCount = 0;yearCount <= 4;yearCount++){

        let yearStr = `${currentYear}`;
        sum[yearStr] = {salary : 0 , students : 0};
        currentYear -= 1;
    }
    

    students = await Student.Gtu_student.find({enrollment_no :{$regex : GTU_enrollment_no}})
    .populate({
        path : 'selected',
        populate : {  
            path : 'offer',
            populate : {
                path : 'company'
            }
        }
    });

    d2dStudent = await Student.Gtu_student.find({enrollment_no :{$regex : GTU_D2D_enrollment_no}})
    .populate({
        path : 'selected',
        populate : {  
            path : 'offer',
            populate : {
                path : 'company'
            }
        }
    });;
    students.push(...d2dStudent);

    if(students.length > 0){

        for(let student of students){
            if(student.selected.length > 0){
                
                let passoutYear = Number(student.enrollment_no.slice(0,2))+2000;
                
                if(sum[passoutYear]){
                        //heights package
                        if(statObj.highestPackge[passoutYear].salary < student.selected[0].salary){
                            statObj.highestPackge[passoutYear].salary = student.selected[0].salary;
                            statObj.highestPackge[passoutYear].company = student.selected[0].offer.company.name;
                        }
    
                        //average package
                        if(student.selected[0].salary){
                            sum[passoutYear].salary += student.selected[0].salary;
                            sum[passoutYear].students += 1;
                        }
    
                        //setor data
                        let sector = student.selected[0].offer.sector.toUpperCase();
                        statObj.sector[sector][`${passoutYear}`] += 1;
                    }
                }
            }
            for(let year in statObj.averagePackge){
                statObj.averagePackge[year] = sum[year].salary / sum[year].students || 0;
            }
        }
    
        return statObj;
    }

//index route
let indexRoute = async (req,res) => {

    //get filter
    let {year = ".{2}" , dept = ".{2}"} = req.query;

    //getting addmission year
    if(req.query.year){
        year = Number(req.query.year.slice(0,4))-4;
        year = Number(year.toString().slice(2,4));
    }

    statObj = await getSUData(year,dept);
    statObj = await getGtuData(statObj,year,dept);
    
    res.json(statObj);
};

module.exports = {indexRoute};
