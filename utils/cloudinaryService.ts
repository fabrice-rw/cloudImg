import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary with your configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const uploadFiles = async (files: Express.Multer.File[]) => {
    const uploadPromises = files.map((file) => cloudinary.uploader.upload(file.path));
    const results = await Promise.all(uploadPromises);

    // Remove the temporary files
    // files.forEach((file) => fs.unlinkSync(file.path));

    return results;
};

export const getFile = async (fileId: string) => {
    // Retrieve the file from Cloudinary using the provided fileId
    const result = await cloudinary.api.resource(fileId);
    return result;
};
export const cloudinaryService = {
    uploadFiles,
    getFile,
};