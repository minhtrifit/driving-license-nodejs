const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // Image save location
    destination: function(req, file, cb) { cb(null, './src/db/images'); },

    // By default, multer removes file extensions so let's add them back
    // filename: function(req, file, cb) { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }
    filename: function(req, file, cb) { cb(null, path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname)); }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
const uploadMulti = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 10);

module.exports = {
    upload, uploadMulti
}