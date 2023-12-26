import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // check if local file path exists
    if (!localFilePath) return null;

    // upload file to cloudinary
    const result = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded Successfully on Cloudinary: ", result.url);

    return result;
  } catch (error) {
    // remove the local non uploaded temp file
    fs.unlinkSync(localFilePath);
    return null;
  }
};
