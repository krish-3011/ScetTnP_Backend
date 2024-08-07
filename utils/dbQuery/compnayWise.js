const mongoose = require("mongoose");
const XLSX = require('xlsx');
const Company = require("../../schema/model/companySchema");
const Offer = require("../../schema/model/offerSchema");
const Student = require("../../schema/model/studentSchema");

// Connecting to the database
async function main() {
    try {
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
        console.log("Database connected");

        let dataSet = await getData();
        if (!dataSet || dataSet.length === 0) {
            console.log('No data found');
            return;
        }
        
        let dataArr = formateData(dataSet);
        console.log('Data formatted:', dataArr);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        console.log('Workbook created');

        // Convert data to a worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(dataArr);
        console.log('Worksheet created');

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        console.log('Worksheet appended');

        // Write the workbook to a file
        XLSX.writeFile(workbook, 'output.xlsx');
        console.log('File written successfully');
    } catch (err) {
        console.error(`Error: ${err.message}`);
    } finally {
        mongoose.disconnect(); // Ensure the database connection is closed
    }
}

async function getData() {
    try {
        let dataSet = await Offer.find({}).populate('selected').populate('company');
        return dataSet;
    } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
        return [];
    }
}

function formateData(dataSet) {
    let dataArr = [['Company Name', 'Student Name', 'Package']];
    for (let data of dataSet) {
        if (data.company && data.company.name) {
            dataArr.push([data.company.name]); // Add company name as a row header
        }

        if (data.selected && Array.isArray(data.selected)) {
            for (let student of data.selected) {
                dataArr.push(['', student.name, student.selected?.salary || '']);
            }
        }
    }
    return dataArr;
}

main();
