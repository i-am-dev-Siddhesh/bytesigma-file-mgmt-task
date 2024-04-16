import { Request, Response } from 'express';
import { prisma } from '../clients/prisma';
import { deleteObjectFromS3, uploadToS3 } from '../clients/s3';
import { generalError } from '../utils/index';

// @desc    Upload images to server
// @route   POST /v1/upload/images
// @access  Public
export const createImages = async (req: Request, res: Response) => {
  try {
    let resp = [];
    if (req.files) {
      // @ts-ignore
      const imagesFiles = req.files.images;
      if (imagesFiles) {
        for (let i = 0; i < imagesFiles.length; i++) {
          const image = imagesFiles[i];          
          const result = await uploadToS3(image, 'images');
          resp.push({
            url: result.resp.Location,
            fileName: result.fileName,
            uploadedDate: new Date().toISOString(),
          });
        }
      }
    }

    const item = await prisma.files.createMany({ data: resp });
    return res.status(200).json({ data: item });
  } catch (error: any) {
    let statusCode = 500;
    if (error.status_code) {
      statusCode = error.status_code;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    Find images data
// @route   GET /v1/upload/images
// @access  Public
export const findImages = async (req: Request, res: Response) => {
  try {
    const items = await prisma.files.findMany();
    return res.status(200).json({ data: items });
  } catch (error: any) {
    let statusCode = 500;
    if (error.status_code) {
      statusCode = error.status_code;
    }
    return res.status(statusCode).json(generalError(error));
  }
};
