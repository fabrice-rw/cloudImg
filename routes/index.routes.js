
const express = require('express');
const multerMiddleware = require('../middleware/multer');
const cloudinary = require('../config/cloudinary');
const router = express.Router();

const fs = require('fs');
const authenticate = require('../middleware/authenticate')

router.post('/upload-media', authenticate, multerMiddleware.array('image','video'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path);

    if (req.method === 'POST') {
        const urls = [];

        const files = req.files;

        for (const file of files) {
            const { path } = file;

            const newPath = await uploader(path);
            urls.push(newPath);

            // Remove the file after upload
            fs.unlinkSync(path);
        }

        res.status(200).json({
            message: 'media uploaded successfully',
            data: urls,
        });
    } else {
        res.status(405).json({
            error: 'media upload failed',
        });
    }
});

router.get('/download/:id', authenticate, async (req, res) => {
    const fileId = req.params.id;
    try {
        const result = await cloudinary.getFile(fileId);
        res.redirect(result.url);
    } catch (error) {
        res.status(404).json({
            error: 'File not found',
        });
    }
});

router.get('/media', async (req, res) => {
    try {
        const result = await cloudinary.getAllMedia();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieve media',
        });
    }
});

module.exports = router;
