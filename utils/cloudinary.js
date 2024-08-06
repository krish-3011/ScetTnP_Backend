const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const upload = multer({ storage })

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

const imageUpload = (path) => {
    file = [];
    if (req.body[`${path}`]){
        req.body.path.map((imagePath)=>{
            upload.single(path);
            file.push({filename:req.file.filename , path : req.file.path})
        });
        req.file=file;
        
    }else{
        req.file['filename'] = null;
        req.file['path'] = ''
    }
}

module.exports = {CloudinaryStorage,storage,imageUpload}


