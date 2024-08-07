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
    // Initialize the attachments array for the email
    let attachments = [];
    let attachmentsHtml = '';

    // Check if there are attachments and they have the correct structure
    if (notificationData.attachments && Array.isArray(notificationData.attachments)) {
        attachments = notificationData.attachments.map((att, index) => {
            return {
                filename: att.filename || `image${index}.png`,
                path: att.path,
                cid: `image${index}` // unique identifier for the embedded image
            };
        });

        attachmentsHtml = attachments
            .map((att, index) => `<img src="cid:image${index}" alt="Notification Image" style="max-width: 100%; height: auto;"/>`)
            .join('\n');
    }

    const mail = {
        from: mailId,
        to: 'mannpatel.co22d2@scet.ac.in',
        subject: "New Notification arrived",
        html: `
            <p>${notificationData.message}</p>
            ${attachmentsHtml}
        `,
        attachments: attachments
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

