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
    offers : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Offer'
    }]
});

const Company = mongoose.model("Company",companySchema);
module.exports = Company;