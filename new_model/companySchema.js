const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Offer = require("./offer.js");



const companySchema = mongoose.Schema({
    name : {
        type : String
    },
    link : {
        type : String
    },
    desc : {
        type : String
    },
    contact_no : {
        type : {
            country_code : String,
            number : String
        },
    },
    address : {
        type : String,
    },
    extra_attribute : {
        type : Object,
    }
    offers : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Offer'
    }]
});

const Company = mongoose.model("Company",companySchema);
module.exports = Company;