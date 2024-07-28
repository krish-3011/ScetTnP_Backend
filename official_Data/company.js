// Batch wise -> year wisse placement
// 202407 -> torrent power
//acadamic year 2023-2024 -> compna

const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
// const Student = require("../../modules/student.js");
const xlsx = require("xlsx");
const fs = require("fs");
//Starting Server
app.listen(port , ()=>{
    console.log(`server is listing on port ${PORT}`);
}
);

const dotEnv = require("dotenv");
const Company = require("../modules/companySchema");
dotEnv.config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT
//connecting database
async function main(){
    await mongoose.connect(DB_URL);
}
main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});

async function getData(){
    //read file
    const workbook = await xlsx.readFile("I:/confidential/2023.07.01 Academic Year 2023-2024 SCET- Dept. of Training & Placement Cell - Campus Notice.xlsx");
    //get first sheet
    const sheetName = await workbook.SheetNames[0];

    const sheet = await workbook.Sheets[sheetName];

    const dataSet = await xlsx.utils.sheet_to_json(sheet);

    return dataSet;

}

//offer :  role : 
    // offer_link : 
    // location :
    // total_opening
    // drive :{//on camp , off camp
    // type : { //Job & Internship
    // sector :
    // salary :
    // criteria :
    // last_date :
    // interview_date : 
    // contacted_person : 
    //         name : ,
    //         designation :
    //         email : 
    //         contact_no : {
    //             type : {
    //                 country_code : String,
    //                 number : String
    // company : 
    // applicants : [],
    // selected : []

async function addData(dataSet) {

    
    for(data of dataSet ){

        //getting compnay details
        let company = await Company.find({name : data["__EMPTY_5"]});
        if (!oldCompnay){
           let id = addNewCompany(data);
           company = await Company.findById(id)
        }  

        //add new offer
        let offer = new Offer({
            offer_link : data["__EMPTY_11"],
            location : data["__EMPTY_22"],
            drive : data["__EMPTY_6"],
            type : data["__EMPTY_7"],
            sector : data["__EMPTY_4"],
            last_Date : data["__EMPTY_1"],
            salary :{},
            criteria:{"graduation_year" : data["__EMPTY_3"]},

        });
    }
}

//company: name : 
        // link :
        // desc :
        // contact_no:
        // address :
        // extra_attribute:


async function addNewCompany(data){
    let id;
    let newCompany = new Company({
        name : data["__EMPTY_5"],
    });
    newCompany.save((err,comp) =>{
        id = comp._id;
    })
    return id;
}

let DataSet = getData();
addData(dataSet)
