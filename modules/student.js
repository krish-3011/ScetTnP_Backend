const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Offer = require("./offer.js");


const studentSchema = mongoose.Schema({
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
    },
    applied : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Offer'
    }],
    selected : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Offer'
    }]

});

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;