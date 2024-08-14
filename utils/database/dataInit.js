const mongoose = require("mongoose");
// const Student = require("../schema/model/student.js");
const Company = require("../../schema/model/companySchema.js");
const xlsx = require("xlsx");

// connecting database
async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP-new", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
        let dataSet = await getData();
        await Company.deleteMany();
        console.log("Existing data deleted successfully");

        await addData(dataSet);
    } catch (err) {
        console.log(`Error in connecting database: ${err}`);
    }
}

main();

async function getData(no) {
    // read file
    const workbook = xlsx.readFile("I:/BatchWise.xlsx");
    let data = [];
    // get first sheet
    for(let i=4; i< workbook.SheetNames.length; i++){
    const sheetName = workbook.SheetNames[i];
    const sheet = workbook.Sheets[sheetName];
    const dataSet = xlsx.utils.sheet_to_json(sheet);
    data.push(...dataSet);
    }

    return data;
}

async function addData(dataSet) {
    let c = 1;
    let remaining = []
    for (let data of dataSet) {
        try {
            let company = Company.findOne({name : data['Name of Company']});

            if(!company){
                addCompany(data);
                company = Company.findOne({name : data['Name of Company']});

            }
        } catch (err) {
            remaining.push(data);
            console.log(`Error inserting data ${c}:`, err);
        }
    }
}

async function addCompany(data){
    try{
        let newCompany = new Company({
            name : data['Name of Company']
        });

    await newCompany.save();
    }
    catch(err){
        console.log(err);
    }

}
