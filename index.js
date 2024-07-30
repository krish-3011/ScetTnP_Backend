const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const staticRouter = require("./routes/staticRoute.js");
const offer = require("./routes/offer.js");
const user = require("./routes/user.js");
const auth = require("./routes/auth.js");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const cors = require("cors");
const dotEnv = require("dotenv");
const session = require('express-session');

dotEnv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

// Connect to the database
async function main() {
    await mongoose.connect(DB_URL);
}
main().then(() => console.log("Database connected")).catch(err => console.log(`Error in connecting to database: ${err}`));

// Middleware
app.use(cors({
    origin: 'https://scettnp-frontend.onrender.com', // Specify your frontend origin
    credentials: true // Allow cookies to be sent with requests
}));
app.use(session({
    secret: 'Scettt',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));

// Routers
app.use("/", staticRouter);
app.use("/offers", offer);
app.use("/user", user);
app.use("/auth", auth);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
