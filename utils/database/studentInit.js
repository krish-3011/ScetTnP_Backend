const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Student = require("../../modules/student.js");

//Starting Server
app.listen(port , ()=>{
    console.log(`server is listing on port ${port}`);
}
);

//connecting database
async function main(){
    await mongoose.connect("mongodb://127.0.0.1/scetTnP");
}
main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});

//Intialize data
const data =`[
    {
      "_id": "64c2a1fae1d78f1b8f9e1b1a",
      "Enrollment_no": "ET22BTCO096",
      "Name": "Aryan Sharma",
      "Email": "aryan.sharma@example.com",
      "result": {"CGPA": 8.5},
      "applied": ["64c2a1fae1d78f1b8f9e1b1b", "64c2a1fae1d78f1b8f9e1b1c"],
      "selected": ["64c2a1fae1d78f1b8f9e1b1c"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b1d",
      "Enrollment_no": "ET21BTCO097",
      "Name": "Rahul Verma",
      "Email": "rahul.verma@example.com",
      "result": {"CGPA": 7.8},
      "applied": ["64c2a1fae1d78f1b8f9e1b1e"],
      "selected": []
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b1f",
      "Enrollment_no": "ET21BTCO098",
      "Name": "Sanya Mehta",
      "Email": "sanya.mehta@example.com",
      "result": {"CGPA": 9.1},
      "applied": ["64c2a1fae1d78f1b8f9e1b20", "64c2a1fae1d78f1b8f9e1b21"],
      "selected": ["64c2a1fae1d78f1b8f9e1b21", "64c2a1fae1d78f1b8f9e1b22"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b23",
      "Enrollment_no": "ET20BTCO099",
      "Name": "Aditi Patel",
      "Email": "aditi.patel@example.com",
      "result": {"CGPA": 8.0},
      "applied": ["64c2a1fae1d78f1b8f9e1b24"],
      "selected": ["64c2a1fae1d78f1b8f9e1b24"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b25",
      "Enrollment_no": "ET2BTCO100",
      "Name": "Vikram Singh",
      "Email": "vikram.singh@example.com",
      "result": {"CGPA": 7.3},
      "applied": ["64c2a1fae1d78f1b8f9e1b26", "64c2a1fae1d78f1b8f9e1b27"],
      "selected": []
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b28",
      "Enrollment_no": "ET22BTCO101",
      "Name": "Neha Kapoor",
      "Email": "neha.kapoor@example.com",
      "result": {"CGPA": 8.9},
      "applied": ["64c2a1fae1d78f1b8f9e1b29"],
      "selected": ["64c2a1fae1d78f1b8f9e1b29"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b2a",
      "Enrollment_no": "ET22BTCO102",
      "Name": "Rohit Malhotra",
      "Email": "rohit.malhotra@example.com",
      "result": {"CGPA": 7.6},
      "applied": ["64c2a1fae1d78f1b8f9e1b2b"],
      "selected": []
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b2c",
      "Enrollment_no": "ET21BEL103",
      "Name": "Sneha Rao",
      "Email": "sneha.rao@example.com",
      "result": {"CGPA": 8.2},
      "applied": ["64c2a1fae1d78f1b8f9e1b2d", "64c2a1fae1d78f1b8f9e1b2e"],
      "selected": ["64c2a1fae1d78f1b8f9e1b2d"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b2f",
      "Enrollment_no": "ET22BTEL104",
      "Name": "Arjun Desai",
      "Email": "arjun.desai@example.com",
      "result": {"CGPA": 8.7},
      "applied": ["64c2a1fae1d78f1b8f9e1b30", "64c2a1fae1d78f1b8f9e1b31"],
      "selected": ["64c2a1fae1d78f1b8f9e1b30"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b32",
      "Enrollment_no": "ET22BTEL105",
      "Name": "Priya Nair",
      "Email": "priya.nair@example.com",
      "result": {"CGPA": 9.0},
      "applied": ["64c2a1fae1d78f1b8f9e1b33"],
      "selected": ["64c2a1fae1d78f1b8f9e1b33"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b34",
      "Enrollment_no": "ET21BTCH106",
      "Name": "Rakesh Kumar",
      "Email": "rakesh.kumar@example.com",
      "result": {"CGPA": 8.3},
      "applied": ["64c2a1fae1d78f1b8f9e1b35"],
      "selected": []
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b36",
      "Enrollment_no": "ET22BTCH107",
      "Name": "Pooja Singh",
      "Email": "pooja.singh@example.com",
      "result": {"CGPA": 7.9},
      "applied": ["64c2a1fae1d78f1b8f9e1b37", "64c2a1fae1d78f1b8f9e1b38"],
      "selected": []
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b39",
      "Enrollment_no": "ET22BTCH108",
      "Name": "Vijay Bansal",
      "Email": "vijay.bansal@example.com",
      "result": {"CGPA": 7.4},
      "applied": ["64c2a1fae1d78f1b8f9e1b3a"],
      "selected": ["64c2a1fae1d78f1b8f9e1b3a"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b3b",
      "Enrollment_no": "ET22BTCO109",
      "Name": "Anjali Gupta",
      "Email": "anjali.gupta@example.com",
      "result": {"CGPA": 8.6},
      "applied": ["64c2a1fae1d78f1b8f9e1b3c"],
      "selected": ["64c2a1fae1d78f1b8f9e1b3c"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1b3d",
      "Enrollment_no": "ET22BTCO110",
      "Name": "Kiran Rao",
      "Email": "kiran.rao@example.com",
      "result": {"CGPA": 8.4},
      "applied": ["64c2a1fae1d78f1b8f9e1b3e", "64c2a1fae1d78f1b8f9e1b3f"],
      "selected": []
    }
  ]
  
`;
Student.deleteMany().then(console.log("Data deleted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});
Student.insertMany(JSON.parse(data)).then(console.log("Data Inserted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});