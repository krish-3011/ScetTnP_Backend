const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const {Su_student,Gtu_student} = require("../schema/model/studentSchema.js");
const {getDeptCode,getDeptShortname} = require("../utils/functions/dataBase.js");

const GTUdata = async (filds) => {

    // Creating enrollment pattern
    let addYear = (filds.batch - 4).toString().slice(2, 4) || '[0-9][0-9]';
    let deptCode = getDeptCode(filds.dept) || '[0-9][0-9]';
    let enrollmentPattern = `^${addYear}04201${deptCode}[0-9][0-9][0-9]`;
    let gender = filds.male ? filds.female ? '^.{1}' : 'M' : filds.female ? 'F' : '^.{1}' || '^.{1}';
    
    let matchcriteria = {
        enrollment_no: { $regex: enrollmentPattern },
        gender: { $regex: gender },
    };

    // Adding salary filter
    if (filds.salaryAmount) {
        let salaryOperator = filds.salaryOperator === "<" ? "$lte" : "$gte";
        matchcriteria["selected.salary"] = { [salaryOperator]: filds.salaryAmount };
    }
    // Retrieving all Data  
    let data = await Gtu_student.find(matchcriteria)
    .populate({
        path : 'applied',
        populate : {path : 'company'}
    }).populate({
        path : 'selected',
        populate : 
        {
            path : 'offer',
            populate : {path : 'company'}

        }
    }); 

    return data;
}

const getSUdata = async (filds) => {

    // Creating enrollment pattern
    let addYear = (filds.batch - 4).toString().slice(2, 4) || '[0-9][0-9]';
    let dept = filds.dept || '[A-Z][A-Z]';
    let enrollmentPattern = `^ET${addYear}BT${dept}[0-9][0-9][0-9]`;
    let gender = filds.male ? filds.female ? '^.{1}' : 'M' : filds.female ? 'F' : '^.{1}' || '^.{1}';
    
    let matchcriteria = {
        enrollment_no: { $regex: enrollmentPattern },
        gender: { $regex: gender },
    };

    // Adding salary filter
    if (filds.salaryAmount) {
        let salaryOperator = filds.salaryOperator === "<" ? "$lte" : "$gte";
        matchcriteria["selected.salary"] = { [salaryOperator]: filds.salaryAmount };
    }
    // Retrieving all Data  
    let data = await Su_student.find(matchcriteria)
    .populate({
        path : 'applied',
        populate : {path : 'company'}
    }).populate({
        path : 'selected',
        populate : 
        {
            path : 'offer',
            populate : {path : 'company'}

        }
    }); 

    return data;
}



const GTUdataGroupByDept = (resul,data) => {  
    if(!data){
        return resul;
    }

    data = data.reduce((result, currentValue) => {
        // Check if the current value has the specified key
                let groupKey = getDeptShortname(currentValue.enrollment_no.slice(7,9));
                // Initialize the group if it doesn't exist
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                
                //remove currentvalue from data
                data = data.filter((value) => { return value.enrollment_no !== currentValue.enrollment_no; });

                newObj = {
                    name : currentValue.name,
                    enrollment_no : currentValue.enrollment_no,
                    gender : currentValue.gender,
                    cast : currentValue.cast,
                    salary : currentValue.selected.salary,
                    sector : currentValue.selected.offer.sector,
                    company : currentValue.selected.offer.company.name,
                }

                // Add the current item to the group
                result[groupKey].push(newObj);
        
        return result;
    }, {});
    return {...resul,...data};
}

const SUdataGroupByDept = (resul,data) => {

    if(!data){
        return resul;
    }

    data = data.reduce((result, currentValue) => {
        // Check if the current value has the specified key
                let groupKey = currentValue.enrollment_no.slice(6,8);
                // Initialize the group if it doesn't exist
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                newObj = {
                    name : currentValue.name,
                    enrollment_no : currentValue.enrollment_no,
                    gender : currentValue.gender,
                    cast : currentValue.cast,
                    salary : currentValue.selected.salary,
                    sector : currentValue.selected.offer.sector,
                    company : currentValue.selected.offer.company.name,
                }

                // Add the current item to the group
                result[groupKey].push(newObj);

        
        return result;
    }, {});
    return {...resul,...data};
}

const indexRoute = async (req, res) => {
    
    // Retrieving Data from student
    let filds = req.body;

    // Checking for empty fields
    if (!filds) {
        let err = new Error("Invalid Data");
        err.status = 400;
        throw err;
    }
    
    let data = await GTUdata(filds);

    let SUdata = await getSUdata(filds);

    
    // Grouping data by 'applied' attribute
    switch(filds.groupBy){
    
    case 'dept'://data.push(...SUdata);
                 data = groupByDept(data);
                break;
        
        case 'company' : data.push(...SUdata);
                        data = groupByCompany(data);
                        break;

        case 'salary' :  data = groupBySalary(data,SUdata);
                        break;
    }

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
                if (!result[groupKey.company.name]) {
                    result[groupKey.company.name] = [];
                }
                
                newObj = {
                    name : currentValue.name,
                    enrollment_no : currentValue.enrollment_no,
                    gender : currentValue.gender,
                    cast : currentValue.cast,
                    salary : currentValue.selected.salary,
                    sector : currentValue.selected.offer.sector,
                    company : currentValue.selected.offer.company.name,
                }

                // Add the current item to the group
                result[groupKey.company.name].push(newObj);
            });
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
                newObj = {
                    name : currentValue.name,
                    enrollment_no : currentValue.enrollment_no,
                    gender : currentValue.gender,
                    cast : currentValue.cast,
                    salary : currentValue.selected.salary,
                    sector : currentValue.selected.offer.sector,
                    company : currentValue.selected.offer.company.name,
                }

                // Add the current item to the group
                result[groupKey].push(newObj);
            
        }
        
        return result;
    }, {});
}

const groupByDept = (GTUData,SUData) => {
    let result = {};

    result = GTUdataGroupByDept(result,GTUData);
    result = SUdataGroupByDept(result,SUData);

    return result;
}


module.exports = {indexRoute};