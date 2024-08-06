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

async function sendMessage(notificationData) {
    const mail = {
        from: mailId,
        to: 'mannpatel.co22d2@scet.ac.in',
        subject: "New Notification arrived",
        text: notificationData.message,
        // attachments: notificationData.attachments
        html: `
            <p>${notificationData.message}</p>
            <img src="${notificationData.imageURL}" alt="Notification Image" style="max-width: 100%; height: auto;"/>
        `
    };

    try {
        const response = await transporter.sendMail(mail);
        return response
    } catch (error) {
        console.error('Error sending email:', error);
        
    }
}


module.exports = sendMessage;

