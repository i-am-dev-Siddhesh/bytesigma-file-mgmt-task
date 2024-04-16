import Aws from 'aws-sdk';
import fs from 'fs';
import util from 'util';
import { generateFileName, getPath } from '../utils/index';

const unlinkFile = util.promisify(fs.unlink);

export const uploadToS3 = async (
  file: any,
  folderName?: 'images' | 'videos'
) => {
  try {
    const s3 = new Aws.S3({
      region: process.env.AWS_REGION,
    });
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    const fileStream = fs.createReadStream(file?.path);
    const fileType = file.mimetype;
    const Key = folderName
      ? `${folderName}/${file.filename}.${fileType.split('/').pop()}`
      : `${file.filename}.${fileType.split('/').pop()}`;

    const uploadParams: any = {
      Bucket: bucketName,
      Body: fileStream,
      Key: Key,
      ContentType: fileType,
    };
    // image {
    //   [1]   fieldname: 'images',
    //   [1]   originalname: 'Untitled.jpg',
    //   [1]   encoding: '7bit',
    //   [1]   mimetype: 'image/jpeg',
    //   [1]   destination: 'uploads/',
    //   [1]   filename: 'da3a3a3584fced04c2dc72b4e8ade46f',
    //   [1]   path: 'uploads\\da3a3a3584fced04c2dc72b4e8ade46f',
    //   [1]   size: 9281
    //   [1] }

    const resp = await s3.upload(uploadParams).promise();

    return {
      resp,
      fileName: generateFileName(file),
    };
  } catch (error) {
    throw error;
  } finally {
    await unlinkFile(file.path);
  }
};

export const deleteObjectFromS3 = async (url: any) => {
  try {
    if (!url) {
      return;
    }
    const s3 = new Aws.S3({
      region: process.env.AWS_REGION,
    });

    let key = getPath(url).substring(1);

    const bucket = process.env.AWS_S3_BUCKET_NAME;
    const params: any = {
      Bucket: bucket,
      Key: key,
    };
    return new Promise((resolve, reject) => {
      s3.deleteObject(params, function (err, data) {
        // @ts-ignore: types srror for request
        if (err) reject(err, err.stack);
        else resolve(true);
      });
    });
  } catch (error) {
    throw error;
  }
};
