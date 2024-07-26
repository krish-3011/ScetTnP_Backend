const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Offer = require("./offer.js");


const studentSchema = mongoose.Schema({
    Enrollment_no : {
        type : String
    },
    Name : {
        type : String
    },
    Email : {
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