const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Offer = require("../modules/offerSchema.js");
const Company = require("../modules/companySchema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const object = require("../utils/functions/Object.js");
const { compile } = require("ejs");

//Index Route
router.get("/",wrapAsync(async (req,res)=>{

    //finding all offers from database
    let companies = await Company.find({}).populate('company');

    //sending json object of all offers array
    res.status(200).json({companies});
    
}));

//new Route
router.post("/",wrapAsync( async (req,res)=> {

    //retriving data from request body
    let companyData = req.body;

    //getting companies id
    let company = await Company.findOne({name : companyData.name});
    if(company){
        let err = new Error("Company already exsist");
        err.status = 400;
        throw err;
    }
    
    const newCompany = new Company({
        name : companyData.CompnayName,
        logo : companyData.Logo,
        link :companyData.Link,
        desc :companyData.Description,
        contact_no :{ country_code : "+91" , number : companyData.Contact},
        address : companyData.Address,
    });

    const savedCompany = await newCompany.save();

    res.status(200).json({message : "new user saved"});
}));


//show Route
router.get("/:id",wrapAsync(async (req,res,next)=>{

    //retriving offer is from url
    let {id} = req.params

    //finding offer in DB
    let compnay = await Company.findById(id);

    //chacking valid id
    if(!compnay){
        let err = new Error("Company not found...");
        err.status = 400;
        throw err;
    }

    //sending offer
    res.status(200).json(compnay);
}));

//update Route

router.patch("/:id",async (req,res)=>{

    //retriving data from request body
    let {id,title,location,type,salary,last_date, ...criteria} = req.body


    //finding offer in DB
    let compnay = await Company.findById(id);

    //chacking valid id
    if(!compnay){
        let err = new Error("Company not found...");
        err.status = 400;
        throw err;
    }
    //update data
    let newOffer = await Offer.findByIdAndUpdate(id ,{$set :{title : title , location : location.split(","), type:type , salary : salary , last_date : last_date , criteria : criteria }},{ new : true}).then(console.log("data updated")).catch((err) =>{console.log("data not updated")});

    //sending a completed signals
    res.status(200).json({message : "Data updated successfully "});
    
    
});


//temp form
router.get("/:id/update",wrapAsync(async (req,res,next)=>{

    //retriving id from url
    let {id} = req.params

    //fanding offer in DB
    let  offer = await Offer.findById(id);

    //cheak for valid id
    if(Object.keys(offer).length === 0){
        throw new Error("Invalid Id");
    }

    res.render("offers/update.ejs",offer);
}));

//delete route
router.delete("/:id",wrapAsync( async (req,res)=>{
    let {id} = req.params;
    let deletedOffer = await Offer.findByIdAndDelete(id);
    console.log(deletedOffer);

    res.status(200).json({message : "Offer deleted sucessfully"});
}));

module.exports = router