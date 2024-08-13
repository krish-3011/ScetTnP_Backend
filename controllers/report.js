const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const Student = require("../schema/model/studentSchema.js");

const indexRoute = async (req,res)=>{
    console.log("post")
    // Retriving Data from student
    let filds = req.body;
    
    //cheaking for empty fild
    if(!filds){
        err = new Error("Invalid Data");
        err.status = 400;
        throw err;
    }

    

    //creating enrollment pattern
    let addYear = (filds.batch -4).toString().slice(2,4) || '^[0-9][0-9]';
    let dept = filds.dept || '^[A-Z][A-Z]';
    let enrollmentPattern = `^ET${addYear}BT${dept}[0-9][0-9][0-9]`
    let populateAtt = filds.placed ? filds.intrested ? '^.{2}' : 'selected' : filds.intrested ?  'applied' : '^.{2}' || '^.{2}';
    let gender = filds.male ? filds.female ? '^.{1}'  : 'M' : filds.female ? 'F' : '^.{1}' || '^.{1}';
    // let salaryOp = filds.salaryOprator === "<" ? $le : $ge;
    let obj = { enrollment_no :{$regex : enrollmentPattern} , gender :{$regex : gender} , }
    //Retriving all Data
    let data = await Student.find(obj);

    // console.log(`enrollment no : ${enrollmentPattern} , populate : ${populateAtt}, gender : ${gender}`);
    res.send(data);
};


module.exports = {indexRoute};