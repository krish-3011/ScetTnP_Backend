const express = require("express");
const session = require('express-session');
const cors = require('cors');
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../modules/studentSchema.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Enable CORS
router.use(cors({
    origin: 'https://scettnp-frontend.onrender.com', // Specify your frontend origin
    credentials: true // Allow cookies to be sent with requests
}));

// Configure session middleware
router.use(session({
    secret: 'Scettt',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Authenticate user
router.post("/", wrapAsync(async (req, res) => {
    let { enrollmentNo, birthDate } = req.body;

    let profile = await Student.findOne({ enrollment_no: enrollmentNo });
    if (!profile) {
        return res.status(404).json({ message: "Student not found" });
    }
    profile.birth_date = new Date(profile.birth_date);
    birthDate = new Date(birthDate);
    console.log(`${profile.birth_date.toString().slice(0, 10)} === ${birthDate.toISOString().slice(0, 10)}`);
    if (profile.birth_date.toISOString().slice(0, 10) === birthDate.toISOString().slice(0, 10)) {
        req.session.user = profile; // Store user in session
        res.status(200).json(profile);
    } else {
        res.status(401).json({ message: "Wrong credentials" });
    }
}));

module.exports = router;
