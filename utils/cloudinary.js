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
        allowed_formats: ['jpg', 'jpeg', 'png'], // `allowed_formats` should be in snake_case
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional transformations
    },
});

// Multer configuration
const upload = multer({ storage });

// imageUpload function
const imageUpload = (path) => (req, res, next) => {
    let files = [];

    if (req.body[path]) {
        req.body[path].forEach((imagePath) => {
            upload.single(path)(req, res, (err) => {
                if (err) {
                    return next(err);
                }

                if (req.file) {
                    files.push({ filename: req.file.filename, path: req.file.path });
                }
            });
        });

        req.files = files;
    } else {
        req.files = [{ filename: null, path: '' }];
    }

    next();
};

module.exports = { storage, imageUpload };
