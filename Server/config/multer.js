// Assuming you have Multer configured in a file named multer.js

const multer = require('multer');

// Multer configuration for video uploads
exports.uploads = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads'); // Directory where videos will be stored
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname); // Generating unique filename
        }
    }),
});




