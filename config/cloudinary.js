const cloudinary = require('cloudinary');

const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            });
        }, {
            resource_type: 'auto',
            folder: folder
        });
    });
};

exports.getFile = (fileId) => {
    return cloudinary.api.resource(fileId)
        .then(result => {
            if (!result) {
                throw new Error('File not found');
            }
            return result;
        })
        .catch(error => {
            throw error || new Error('File not found');
        });
};


exports.getAllMedia = () => {
    return cloudinary.api.resources()
        .then(result => {
            if (!result || !result.resources) {
                throw new Error('Failed to retrieve media');
            }
            return result.resources;
        })
        .catch(error => {
            throw error || new Error('Failed to retrieve media');
        });
};
