const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Company = require("../../modules/company.js");

//Starting Server
app.listen(port , ()=>{
    console.log(`server is listing on port ${port}`);
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
//Intialize data
const data =`[
    {
      "_id": "64c2a1fae1d78f1b8f9e1c1b",
      "name": "Tech Solutions",
      "link": "www.techSolution.com",
      "desc": "A leading tech company providing innovative solutions.",
      "offers": ["64c2a1fae1d78f1b8f9e1c1a"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c1f",
      "name": "Innovate Inc",
      "link": "www.innovateInc.com",
      "desc": "Innovating the future with cutting-edge technology.",
      "offers": ["64c2a1fae1d78f1b8f9e1c1e"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c22",
      "name": "Global Tech",
      "link": "www.globalTech.com",
      "desc": "Global leader in tech solutions and services.",
      "offers": ["64c2a1fae1d78f1b8f9e1c21"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c27",
      "name": "Tech Innovators",
      "link": "www.TechInnovators.com",
      "desc": "Pioneering innovation in the tech industry.",
      "offers": ["64c2a1fae1d78f1b8f9e1c26"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c2a",
      "name": "Digital Solutions",
      "link": "www.digitalSolution.com",
      "desc": "Delivering comprehensive digital solutions.",
      "offers": ["64c2a1fae1d78f1b8f9e1c29"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c2e",
      "name": "NextGen Technologies",
      "link": "www.nextGenTech.com",
      "desc": "Next generation technology services.",
      "offers": ["64c2a1fae1d78f1b8f9e1c2d"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c31",
      "name": "Future Tech",
      "link": "www.futureTech.com",
      "desc": "Future-forward tech innovations.",
      "offers": ["64c2a1fae1d78f1b8f9e1c30"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c35",
      "name": "TCS",
      "link": "www.tcs.com",
      "desc": "Future-forward tech innovations.",
      "offers": ["64c2a1fae1d78f1b8f9e1c34"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c38",
      "name": "Wipro",
      "link": "www.wipro.com",
      "desc": "Future-forward tech innovations.",
      "offers": ["64c2a1fae1d78f1b8f9e1c37"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c3b",
      "name": "microsoft",
      "link": "www.microsoft.com",
      "desc": "Future-forward tech innovations.",
      "offers": ["64c2a1fae1d78f1b8f9e1c3b"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c3f",
      "name": "yahoo",
      "link": "www.yahoo.com",
      "desc": "Future-forward tech innovations.",
      "offers": ["64c2a1fae1d78f1b8f9e1c3e"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c42",
      "name": "google",
      "link": "www.google.com",
      "desc": "Future-forward tech innovations.",
      "offers": ["64c2a1fae1d78f1b8f9e1c41"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c46",
      "name": "oracle",
      "link": "www.oracle.com",
      "desc": "Future-forward tech innovations.",
      "offers": ["64c2a1fae1d78f1b8f9e1c45"]
    },
    {
      "_id": "64c2a1fae1d78f1b8f9e1c49",
      "name": "soft dogs",
      "link": "www.softDogs.com",
      "desc": "Future-forward tech innovations.",
      "offers": ["64c2a1fae1d78f1b8f9e1c48"]
    }
  ]
  
`;
Company.deleteMany().then(console.log("Data deleted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});
Company.insertMany(JSON.parse(data)).then(console.log("Data Inserted sucessfully")).catch(err => {console.log(`error in connecting database : ${err}`)});