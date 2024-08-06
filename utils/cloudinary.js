const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

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
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

// Multer configuration
const upload = multer({ storage });

// Modified imageUpload function to accept field name
const imageUpload = (fieldName) => async (req, res, next) => {
    try {
        if (!req.body[fieldName] || !Array.isArray(req.body[fieldName])) {
            req.files = [];
            return next();
        }

        const uploadPromises = req.body[fieldName].map(imagePath => {
            return new Promise((resolve, reject) => {
                const multerUpload = upload.single(imagePath);
                multerUpload(req, res, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    if (req.file) {
                        resolve({ filename: req.file.filename, path: req.file.path });
                    } else {
                        resolve(null);
                    }
                });
            });
        });

        req.files = (await Promise.all(uploadPromises)).filter(file => file !== null);
        next();

    } catch (error) {
        next(error);
    }
};

module.exports = { upload, imageUpload };
