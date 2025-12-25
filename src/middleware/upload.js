const multer = require("multer");
const { unifiedStorage } = require("../config/cloudinary");

const upload = multer({ storage: unifiedStorage });

module.exports = upload;
