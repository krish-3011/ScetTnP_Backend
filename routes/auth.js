const express = require('express');
const session = require('express-session');
const cors = require('cors'); // Add this line
const path = require('path'); // Add this line
const router = express.Router();

const User = require(path.join(__dirname, 'data', 'student.json')); // Use path.join for compatibility

// Enable CORS
router.use(cors({
    origin: 'https://scettnp-frontend.onrender.com', // Specify your frontend origin
    credentials: true // Allow cookies to be sent with requests
}));

router.use(session({
    secret: 'Scettt',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Ensure secure is false if not using HTTPS
}));

router.post('/login', (req, res) => {
    const { enrollment_no, birth_date } = req.body;
    const user = User.find(u => u.enrollment_no == enrollment_no && u.birth_date == birth_date); // Fix typo
    if (user) {
        req.session.user = user;
        res.status(200).json({ message: 'Login Successful', user: user });
    } else {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
});

router.get('/offers', (req, res) => {
    if (req.session.user) {
        res.json({ message: 'This is a protected route', user: req.session.user });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;
