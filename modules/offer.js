const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Student = require("./student.js");
const Company = require("./company.js");



const offerSchema = mongoose.Schema({
    title : {
        type : String
    },
    location : [{
        type : String
    }],
    type : {
            type : String
    },
    salary : {
        type : Number
    },
    criteria : {
        type : Object
    },
    last_date : {
        type : Date
    },
    company : {
        type : mongoose.Schema.ObjectId,
        ref : 'Company'
    },
    applicants : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Student'
    }]
});

const Offer = mongoose.model("Offer",offerSchema);
module.exports = Offer;