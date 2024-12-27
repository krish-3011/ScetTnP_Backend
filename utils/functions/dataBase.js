const deptCodeMap = {
    "Computer Engineering": "07",
    "Information Technology": "16",
    "Civil Engineering": "06",
    "Mechanical Engineering": "19",
    "Electrical Engineering": "09",
    "Chemical Engineering": "05",
    "Textile Technology": "29",
    "Electronics & Communication Engineering": "11",
    "Instrumentation & Control Engineering": "17"
};

const deptShortnameMap = {
    "Computer Engineering": "CO",
    "Information Technology": "IT",
    "Civil Engineering": "CE",
    "Mechanical Engineering": "ME",
    "Electrical Engineering": "EE",
    "Chemical Engineering": "CH",
    "Textile Technology": "TT",
    "Electronics & Communication Engineering": "EC",
    "Instrumentation & Control Engineering": "IC"
};

const getDeptCode = (deptName) =>{
    return deptCodeMap[deptName] || ".{2}"; // Return "00" or some default if not found
}

const getDeptShortname = (deptCode) =>{
    let data =  deptShortnameMap[Object.keys(deptCodeMap).find(name => deptCodeMap[name] === String(deptCode))]
    return data;
}


module.exports = {getDeptCode,getDeptShortname};