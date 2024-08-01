const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ScetTnP',
        allowedFormats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional transformations
    },
});
const upload = multer({ storage });

// Index Route
router.get("/", wrapAsync(async (req, res) => {
    let companies = await Company.find({}).populate('offers');
    res.status(200).json({ companies });
}));

// New Route
router.post("/", upload.single('Logo'), wrapAsync(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Logo file is required" });
    }

    let companyData = req.body;
    let existingCompany = await Company.findOne({ name: companyData.CompanyName });
    if (existingCompany) {
        return res.status(400).json({ message: "Company already exists" });
    }

    const newCompany = new Company({
        name: companyData.CompanyName,
        logo: {
            link: req.file.path, // Cloudinary URL
            file_name: req.file.filename
        },
        link: companyData.Link,
        desc: companyData.Description,
        contact_no: {
            country_code: "+91",
            number: companyData.Contact
        },
        address: companyData.Address,
    });

    await newCompany.save();
    res.status(201).json({ message: "New company saved" });
}));

// Show Route
router.get("/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let company = await Company.findById(id).populate('offers');
    if (!company) {
        return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
}));

// Update Route
router.patch("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let updateData = req.body;

    let company = await Company.findById(id);
    if (!company) {
        return res.status(404).json({ message: "Company not found" });
    }

    // Make sure to only update fields provided
    let updatedCompany = await Company.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    res.status(200).json({ message: "Company updated successfully", updatedCompany });
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
        return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
}));

module.exports = router;
