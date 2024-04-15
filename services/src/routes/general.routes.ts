import express from 'express';
import multer from 'multer';
import { checkApiKey } from '../middlewares';
import { createImages, findImages } from '../controller/general.controller';

const router = express.Router({ mergeParams: true });
const upload = multer({ dest: 'uploads/' });

router
  .route('/upload/images')
  .get(checkApiKey, findImages)
  .post(checkApiKey, upload.fields([{ name: 'images' }]), createImages);

export default router;
