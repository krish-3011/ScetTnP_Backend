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
        // Create a dynamic HTML string for the email body
        let attachmentsHtml = '';
        if(notificationData.attachments){
            attachmentsHtml = notificationData.attachments
                .map(att => `<img src="${att.path}" alt="Notification Image" style="max-width: 100%; height: auto;"/>`)
                .join('\n');
        }
        console.log(attachmentsHtml);
        const mail = {
            from: mailId,
            to: 'mannpatel.co22d2@scet.ac.in',
            subject: "New Notification arrived",
            html: `
                <p>${notificationData.message}</p>
                ${attachmentsHtml}
            `
        };
    
        try {
            const response = await transporter.sendMail(mail);
            return response;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error; // Re-throw the error to allow further handling if needed
        }
    }
    



module.exports = sendMessage;

