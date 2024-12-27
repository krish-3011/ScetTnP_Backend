let obj = {
    "mann" : "08"
};

console.log(`${Object.keys(obj).filter(key => obj[key] === "08")}`); // true : false