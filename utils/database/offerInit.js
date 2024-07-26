const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Offer = require("../../modules/offer.js");

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
      "_id": "64c2a1fae1d78f1b8f9e1c1a",
      "title": "Software Engineer",
      "location": ["Bangalore", "Remote"],
      "type": "Full-time",
      "salary": 1200000,
      "criteria": {"minCGPA": 8.0},
      "last_date": "2024-07-31",
      "compney": "64c2a1fae1d78f1b8f9e1c1b",
      "applicants": ["64c2a1fae1d78f1b8f9e1c1c", "64c2a1fae1d78f1b8f9e1c1d"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c1e",
      "title": "Data Analyst",
      "location": ["Mumbai"],
      "type": "Full-time",
      "salary": 900000,
      "criteria": {"minCGPA": 7.5},
      "last_date": "2024-08-15",
      "compney": "64c2a1fae1d78f1b8f9e1c1f",
      "applicants": ["64c2a1fae1d78f1b8f9e1c20"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c21",
      "title": "System Administrator",
      "location": ["Delhi", "Noida"],
      "type": "Part-time",
      "salary": 600000,
      "criteria": {"minCGPA": 7.0},
      "last_date": "2024-07-25",
      "compney": "64c2a1fae1d78f1b8f9e1c22",
      "applicants": ["64c2a1fae1d78f1b8f9e1c23", "64c2a1fae1d78f1b8f9e1c24", "64c2a1fae1d78f1b8f9e1c25"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c26",
      "title": "Network Engineer",
      "location": ["Hyderabad", "Pune"],
      "type": "Full-time",
      "salary": 1100000,
      "criteria": {"minCGPA": 7.8},
      "last_date": "2024-07-28",
      "compney": "64c2a1fae1d78f1b8f9e1c27",
      "applicants": ["64c2a1fae1d78f1b8f9e1c28"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c29",
      "title": "Front-end Developer",
      "location": ["Chennai"],
      "type": "Full-time",
      "salary": 950000,
      "criteria": {"minCGPA": 8.2},
      "last_date": "2024-08-01",
      "compney": "64c2a1fae1d78f1b8f9e1c2a",
      "applicants": ["64c2a1fae1d78f1b8f9e1c2b", "64c2a1fae1d78f1b8f9e1c2c"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c2d",
      "title": "Back-end Developer",
      "location": ["Kolkata"],
      "type": "Full-time",
      "salary": 1050000,
      "criteria": {"minCGPA": 8.0},
      "last_date": "2024-08-10",
      "compney": "64c2a1fae1d78f1b8f9e1c2e",
      "applicants": ["64c2a1fae1d78f1b8f9e1c2f"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c30",
      "title": "DevOps Engineer",
      "location": ["Ahmedabad"],
      "type": "Full-time",
      "salary": 1150000,
      "criteria": {"minCGPA": 7.9},
      "last_date": "2024-07-27",
      "compney": "64c2a1fae1d78f1b8f9e1c31",
      "applicants": ["64c2a1fae1d78f1b8f9e1c32", "64c2a1fae1d78f1b8f9e1c33"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c34",
      "title": "Database Administrator",
      "location": ["Gurgaon"],
      "type": "Full-time",
      "salary": 1000000,
      "criteria": {"minCGPA": 8.1},
      "last_date": "2024-08-05",
      "compney": "64c2a1fae1d78f1b8f9e1c35",
      "applicants": ["64c2a1fae1d78f1b8f9e1c36"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c37",
      "title": "Cloud Engineer",
      "location": ["Pune"],
      "type": "Full-time",
      "salary": 1250000,
      "criteria": {"minCGPA": 8.3},
      "last_date": "2024-07-30",
      "compney": "64c2a1fae1d78f1b8f9e1c38",
      "applicants": ["64c2a1fae1d78f1b8f9e1c39"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c3a",
      "title": "UI/UX Designer",
      "location": ["Bangalore"],
      "type": "Full-time",
      "salary": 950000,
      "criteria": {"minCGPA": 8.0},
      "last_date": "2024-08-12",
      "compney": "64c2a1fae1d78f1b8f9e1c3b",
      "applicants": ["64c2a1fae1d78f1b8f9e1c3c", "64c2a1fae1d78f1b8f9e1c3d"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c3e",
      "title": "Technical Writer",
      "location": ["Remote"],
      "type": "Full-time",
      "salary": 800000,
      "criteria": {"minCGPA": 7.5},
      "last_date": "2024-07-29",
      "compney": "64c2a1fae1d78f1b8f9e1c3f",
      "applicants": ["64c2a1fae1d78f1b8f9e1c40"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c41",
      "title": "Product Manager",
      "location": ["Bangalore"],
      "type": "Full-time",
      "salary": 1400000,
      "criteria": {"minCGPA": 8.4},
      "last_date": "2024-08-20",
      "compney": "64c2a1fae1d78f1b8f9e1c42",
      "applicants": ["64c2a1fae1d78f1b8f9e1c43", "64c2a1fae1d78f1b8f9e1c44"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c45",
      "title": "QA Engineer",
      "location": ["Noida"],
      "type": "Full-time",
      "salary": 900000,
      "criteria": {"minCGPA": 7.8},
      "last_date": "2024-08-07",
      "compney": "64c2a1fae1d78f1b8f9e1c46",
      "applicants": ["64c2a1fae1d78f1b8f9e1c47"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c48",
      "title": "SEO Specialist",
      "location": ["Remote"],
      "type": "Full-time",
      "salary": 850000,
      "criteria": {"minCGPA": 7.7},
      "last_date": "2024-07-26",
      "compney": "64c2a1fae1d78f1b8f9e1c49",
      "applicants": ["64c2a1fae1d78f1b8f9e1c4a"]
    }
  ]
  
`;
Offer.deleteMany().then(console.log("Data deleted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});
Offer.insertMany(JSON.parse(data)).then(console.log("Data Inserted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});