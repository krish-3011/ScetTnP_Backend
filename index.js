const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const staticRouter = require("./routes/staticRoute.js");
const offer = require("./routes/offer.js");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const cors = require("cors");
const dotEnv = require("dotenv");

dotEnv.config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT
//connecting database
async function main(){
    await mongoose.connect(DB_URL);
}
main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});

//Middlewares
// app.use((req, res, next) => {res.header('Access-Control-Allow-Origin', '*');});
app.use(cors());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")))

//adding Router
app.use("/",staticRouter);
app.use("/offers",offer);

//error handling
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
})

//Starting Server
app.listen(PORT, ()=>{
    console.log(`server is listing on port ${port}`);
}
);