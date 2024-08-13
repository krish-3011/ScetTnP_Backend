const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const Student = require("../schema/model/studentSchema.js");

const indexRoute = async (req, res) => {
    
    // Retrieving Data from student
    let filds = req.body;

    // Checking for empty fields
    if (!filds) {
        let err = new Error("Invalid Data");
        err.status = 400;
        throw err;
    }

    // Creating enrollment pattern
    let addYear = (filds.batch - 4).toString().slice(2, 4) || '^[0-9][0-9]';
    let dept = filds.dept || '^[A-Z][A-Z]';
    let enrollmentPattern = `^ET${addYear}BT${dept}[0-9][0-9][0-9]`;
    let gender = filds.male ? filds.female ? '^.{1}' : 'M' : filds.female ? 'F' : '^.{1}' || '^.{1}';
    
    let matchcriteria = {
        enrollment_no: { $regex: enrollmentPattern },
        gender: { $regex: gender },
    };

    // Retrieving all Data
    let data = await Student.find(matchcriteria);

    // Grouping data by 'applied' attribute
    data = groupByDept(data);

    // Sending response
    res.send(data);
};


const groupByCompany = (data) => {
    let key = 'applied'
    return data.reduce((result, currentValue) => {
        // Check if the current value has the specified key
        if (currentValue[key]) {
            currentValue[key].forEach(groupKey => {
                // Initialize the group if it doesn't exist
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                
                // Add the current item to the group
                result[groupKey].push(currentValue);
            });
        } else {
            console.log("No values found for grouping");
        }
        
        return result;
    }, {});
}

const groupBySalary =(data) => {
    let key = 'salary'
    return data.reduce((result, currentValue) => {
        // Check if the current value has the specified key
        if (currentValue.selected) {
                let groupKey = currentValue.selected[key];
                // Initialize the group if it doesn't exist
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                
                // Add the current item to the group
                result[groupKey].push(currentValue);
            
        } else {
            console.log("No values found for grouping");
        }
        
        return result;
    }, {});
}

const groupByDept = (data) => {
    let key = 'salary'
    return data.reduce((result, currentValue) => {
        // Check if the current value has the specified key
                let groupKey = currentValue.enrollment_no.slice(6,8);
                // Initialize the group if it doesn't exist
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                
                // Add the current item to the group
                result[groupKey].push(currentValue);
        
        return result;
    }, {});
}

module.exports = {indexRoute};