import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloudinary = async (filePath) => {
    try {

        if (!filePath.includes('http://') && !filePath.includes('https://')) {
            filePath = path.resolve(filePath);
        }

        const result = await cloudinary.uploader.upload(filePath, {
            type: 'upload',
            resource_type: 'auto',
            folder: process.env.CLOUDINARY_FOLDER,
        });
        // console.log('Uploaded at Cloudinary', result.url);
        return {url: result.url, publicId: result.public_id};
    } catch (error) {
        throw new Error('Failed to upload image to Cloudinary');
    } finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            // console.log('Deleted file:', filePath);
        }
    }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error('Failed to delete image from Cloudinary');
    }
};