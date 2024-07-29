const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../modules/studentSchema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const object = require("../utils/functions/Object.js");
const { json } = require("express/lib/response.js");

//Index Route
router.get("/",wrapAsync(async (req,res)=>{

    //finding all offers from database
    let student = await Student.find({enrollment_no : enrollNo}).populate('applied').populate('selected');

    //sending json object of all offers array
    res.status(200).json({offers});
    
}));

//new Route
router.post("/",wrapAsync( async (req,res)=> {

    //retriving data from request body
    console.log(req.body);
    let offer = req.body;
    console.log(offer);

    //adding formate to criteria
    offer.criteria = offer.criteria.split("\r\n");
    criteria=offer.criteria;
    offer.criteria={};
    for(cri of criteria){
        cri=cri.split(":");
        offer.criteria[cri[0]] = cri[1];
    }
   

    //getting companies id
    let company = await Company.find({name : offer.companyName});
    company = company[0];
    console.log(company);
    if(object.isEmpty(company)){
        throw new Error("regisiter company first");
    }
    
    const newOffer = new Offer({
        role : offer.title,
        type : offer.type,
        location : offer.location.split(","),
        salary: {min : offer.salary},
        criteria : offer.criteria,
        last_date : offer.last_date,
        company : company._id,
    });

    const savedOffer = await newOffer.save();
    
    company.offers.push(savedOffer._id);
    Company.findByIdAndUpdate(company._id,{$set :{offers : company.offers}});

    res.status(200).json({message : "new user saved"});
    // console.log(offer);
    // res.send("post req on /");
}));

//temp forms
router.get("/new",wrapAsync(async (req,res,next)=>{
    res.render("offers/new.ejs");
}));

//show Route
router.get("/:enrollNo",wrapAsync(async (req,res,next)=>{

    //retriving offer is from url
    let {enrollNo} = req.params

    //finding offer in DB
    let student = await Student.find({enrollment_no : enrollNo});

    //chacking valid id
    if(student){
        res.status(200).json(JSON.stringify(student[0]));
    }

    //sending offer
    
    res.status(400).json({message : "student not available"});
}));

//update Route

router.patch("/:id",async (req,res)=>{

    //retriving data from request body
    let {id,title,location,type,salary,last_date, ...criteria} = req.body

    //criteria : {criteria : {} }
    //simplifying obj -> criteria : {}
    criteria = criteria.criteria;

    // if criteria having a array of data , it is in string
    //retrive in form of array
    for (cri in criteria){
        if(criteria[cri].includes(",")){
            criteria.criteria[cri] = criteria.criteria[cri].split(",");
        }
    }

    //finding obj from DB
    let offer = await Offer.findById(id);

    //cheak for valid offer id
    if(!offer){
        throw new Error("Invalid Id");
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