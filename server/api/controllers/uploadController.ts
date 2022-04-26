const cloudinary = require("cloudinary").v2;
require("dotenv").config();
import { Request, Response, NextFunction } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUR_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Hello");
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "Todo HX",
      use_filename: true,
    });
    console.log(uploadResponse)

    res.status(201).json({ url: uploadResponse.url });
  } catch (err) {
    next(err);
  }
};
const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Delete");
    const fileStr = req.body
    await cloudinary.uploader.destroy('mini-banner/desktop/t7zkoqns2xivp35h2zzt');
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadImage,
  deleteImage
};
