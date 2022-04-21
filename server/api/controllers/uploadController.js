const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUR_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (req, res, next) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "Todo HX",
      use_filename: true,
    });

    res.status(201).json({ url: uploadResponse.url });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadImage,
};
