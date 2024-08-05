const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Notificaton = require("../schema/model/notificationSchema.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Index Route
const indexRoute = async (req, res) => {
    let notification = await Notificaton.find({});
    res.status(200).json({ notification });
};

// New Route
const newRoute = async (req, res) => {
    try {
        let notificationData = req.body;

        // Log the incoming data for debugging
        console.log("Received data:", notificationData);

        if (!notificationData.message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const notification = new Notificaton({
            message: notificationData.message
        });

        await notification.save();
        res.status(201).json({ message: "New notification saved" });
    } catch (error) {
        console.error("Error saving notification:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Show Route
const showRoute = async (req, res, next) => {
    let { id } = req.params;
    let notification = await Notificaton.findOne({ _id: id });
    if (!notification) {
        let err = new Error("Notification not found.");
        err.status(400);
        throw err;
    }
    res.status(200).json(notification);
};

// Update Route
const updateRoute = async (req, res) => {
    let { id } = req.params;
    let updateData = req.body;

    let notification = await Notificaton.findOne({ _id: id });
    if (!notification) {
        let err = new Error("Notification not found.");
        err.status(400);
        throw err;
    }

    // Make sure to only update fields provided
    let updatedNotification = await Notificaton.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    res.status(200).json({ message: "Notification updated successfully", updatedNotification });
};

// Delete Route
const deleteRoute = async (req, res) => {
    let { id } = req.params;
    await Notificaton.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted successfully" });
};

// Router setup
router.get("/", wrapAsync(indexRoute));
router.post("/", wrapAsync(newRoute));
router.get("/:id", wrapAsync(showRoute));
router.patch("/:id", wrapAsync(updateRoute));
router.delete("/:id", wrapAsync(deleteRoute));

module.exports = router;