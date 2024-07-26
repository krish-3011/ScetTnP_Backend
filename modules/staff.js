const { type } = require("express/lib/response");
const mongoose = require("mongoose");
// const Offer = require("./offer.js");
// const Company = require("./company.js");
// const Student = require("./student.js");


const staffSchema = mongoose.Schema({
    enrollment_no : {
        type : String
    },
    name : {
        type : String
    },
    email : {
        type : String
    },
    result :{
        type : {
            cpi : {
                type : Number
            },
            backlog : {
                type : Number
            }
        }
    }
});

const Staff = mongoose.model("Staff",staffSchema);
module.exports = Staff;