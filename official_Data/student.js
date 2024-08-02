const mongoose = require("mongoose");
const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const Student = require("../schema/model/companySchema.js");
const xlsx = require("xlsx");

// connecting database
async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
        console.log("Database connected");

        let DataSet = await getData();
        // console.log(DataSet)
        await Student.deleteMany();
        console.log("Existing data deleted successfully");

        await addData(DataSet);
    } catch (err) {
        console.log(`Error in connecting database: ${err}`);
    }
}

main();

async function getData() {
    // read file
    const workbook = xlsx.readFile("I:/ScetTnp.xlsx");
    // get first sheet
    const sheetName = workbook.SheetNames[2];
    const sheet = workbook.Sheets[sheetName];
    const dataSet = xlsx.utils.sheet_to_json(sheet);

    return dataSet;
}

async function addData(dataSet) {
    let c = 1;
    for (let data of dataSet) {
        let newStudent = new Student({
            enrollment_no : data.__EMPTY,
            name : data.__EMPTY_1,
            birth_date : data.__EMPTY_2,
            email : data.__EMPTY_3,
            contact_no : {country_code : "+91" , number : data.__EMPTY_5},
            gender : data.__EMPTY_6,
            cast : data.__EMPTY_7,
            address : data.__EMPTY_8,
            result : {
                ssc : { percentage : data.__EMPTY_9 , passing_year : data.__EMPTY_10 } , 
                hsc : {percentage : data.__EMPTY_11 , passing_year : data.__EMPTY_12} , 
                diploma : {percentage : data.__EMPTY_19 , semwise_result : [data.__EMPTY_13 , data.__EMPTY_14 , data.__EMPTY_15 , data.__EMPTY_16 , data.__EMPTY_17, data.__EMPTY_18] , backlog : data.__EMPTY_20 , passing_year : data.__EMPTY_21} , 
                degree : {percentage : data.__EMPTY_30 , semwise_result : [data.__EMPTY_22 , data.__EMPTY_23 , data.__EMPTY_24 , data.__EMPTY_25, data.__EMPTY_26, data.__EMPTY_27, data.__EMPTY_28, data.__EMPTY_29] , backlog : data.__EMPTY_31 , passing_year : data.__EMPTY_32}
            }
        });

        await newStudent.save();
        console.log(`student ${c} is saved`);
        c += 1;
            
    }
}
