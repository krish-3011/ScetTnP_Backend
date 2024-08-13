const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const Student = require("../schema/model/studentSchema.js");

const indexRoute = async (req,res)=>{
    // Retriving Data from student
    let filds = req.body;
    
    //cheaking for empty fild
    if(!filds){
        err = new Error("Invalid Data");
        err.status = 400;
        throw err;
    }

    //Retriving all Data
    let data;
    if(filds.groupBy === 'Company')
        data = getData('Company');
    else
        data = getData('Student');

    //creating enrollment pattern
    let addYear = filds.batch -4 || '^[0-9][0-9]';
    let dept = filds.dept || '^[A-Z][A-Z]';
    let enrollmentPattern = `^ET${addYear}BT${dept}[0-9][0-9][0-9]`
    let populateAtt = filds.placed ? filds.intrested ? '^.{2}' : 'selected' : filds.intrested ?  'applied' : '^.{2}' || '^.{2}';
    let gender = filds.male ? 'M' : filds.female ? 'F' : '^.{1}' || '^.{1}';

    print(`enrollment no : ${enrollmentPattern} , populate : ${populateAtt}, gender : ${gender}`);
};

const getData = async (collection) => {
    let data = collection.find({});
    return data;
};

module.exports = {indexRoute};