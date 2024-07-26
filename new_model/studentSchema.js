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
    birth_date: {
        type : Date
    },
    email : {
        type : String
    },
    contact_no:{
        type : {
            country_code : String,
            number : String
        },
    },
    gender:{
        type : String
    },
    cast : {
        type : String
    },
    address : {
        type : String
    },
    result :{
        type : {
            ssc : {
                type : {
                    percentage : Number,
                    passing_year : Number
                },
            },
            hsc : {
                type : {
                    percentage : Number,
                    passing_year : Number
                },
            },
            diploma : {
                type : {
                    percentage : Number,
                    semwise_result : [Number],
                    backlog : [Number],
                    passing_year : Number
                    
                },
            },
            degree : {
                type : {
                    percentage : Number,
                    semwise_result : [Number],
                    backlog : [Number],
                    passing_year : Number
                    
                },
            },
        }
    },
    applied : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Offer'
    }],
    selected : [{
        type : {
            type : mongoose.Schema.ObjectId,
            ref : 'Offer'
        }
    }]

});

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;