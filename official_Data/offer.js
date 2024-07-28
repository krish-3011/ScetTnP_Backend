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
dotEnv.config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT
//connecting database
async function main(){
    await mongoose.connect(DB_URL);
}
main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});

//read file
const workbook = xlsx.readFile("I:/confidential/2023.07.01 Academic Year 2023-2024 SCET- Dept. of Training & Placement Cell - Campus Notice.xlsx");

//get first sheet
const sheetName = workbook.SheetNames[3];
console.log(sheetName)
const sheet = workbook.Sheets[sheetName];

const dataSet = xlsx.utils.sheet_to_json(sheet);
console.log(dataSet);