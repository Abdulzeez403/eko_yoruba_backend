const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dosf1tsvd",
  api_key: "454268246918651",
  api_secret: "_JlXDcamesAI1s0UKXa-aIO5nzo",
});

const unifiedStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isAudio = file.mimetype.startsWith("audio");
    
    console.log(`Processing file: ${file.originalname}, mimetype: ${file.mimetype}, isAudio: ${isAudio}`);

    let resource_type = "image";
    let folder = "gallery/images";
    let format = undefined;

    if (isAudio) {
      resource_type = "video";
      folder = "gallery/audio";
      // Map audio mimetypes to Cloudinary friendly formats if needed
      // 'mpeg' is often 'mp3' for Cloudinary
      if (file.mimetype === "audio/mpeg") {
        format = "mp3";
      }
    }

    return {
      folder: folder,
      resource_type: resource_type,
      format: format, // let Cloudinary decide if undefined
      public_id: Date.now() + "-" + file.originalname.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "_"), // Remove extension and sanitize
    };
  },
});

module.exports = { unifiedStorage };
