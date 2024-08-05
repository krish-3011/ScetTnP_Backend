const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const axios = require('axios')

dotenv.config();
const mailId = process.env.EMAIL_ID;
const password = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: mailId,
        pass: password,
    },
});

async function main(req, res) {
    const mail = {
        from: mailId,
        to: 'mannpatel.co22d2@scet.ac.in',
        subject: "Testing Nodemailer",
        text: "SCET TnP 2024",
    };

    try {
        const response = await transporter.sendMail(mail);
        console.log(response);
        res.status(200).send('Email sent successfully: ' + response.response);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email: ' + error.message);
    }
}

router.get("/", main);

module.exports = router;
