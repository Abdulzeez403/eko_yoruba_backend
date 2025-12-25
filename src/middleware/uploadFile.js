const multer = require("multer");
const { imageStorage, audioStorage } = require("../config/cloudinary");

const uploadImage = multer({ storage: imageStorage }).single("image");
const uploadAudio = multer({ storage: audioStorage }).single("audio");

// Middleware to handle both uploads
const uploadFiles = (req, res, next) => {
  uploadImage(req, res, function (err) {
    if (err) return next(err);
    uploadAudio(req, res, next);
  });
};

module.exports = uploadFiles;
