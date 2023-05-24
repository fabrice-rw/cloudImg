import { Request, Response } from 'express';
import { cloudinaryService } from '../utils/cloudinaryService';

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const files = req.files;

        if (!Array.isArray(files)) {
            throw new Error('Invalid files');
        }

        const uploadedFiles = await cloudinaryService.uploadFiles(files);
        res.status(200).json({ files: uploadedFiles });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload files' });
    }
};

export const downloadFile = async (req: Request, res: Response) => {
    try {
        const fileId = req.params.fileId;
        const file = await cloudinaryService.getFile(fileId);
        res.status(200).json({ file });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve file' });
    }
};
