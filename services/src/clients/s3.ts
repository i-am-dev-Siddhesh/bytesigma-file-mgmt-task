import Aws from 'aws-sdk';
import fs from 'fs';
import util from 'util';
import { getPath } from '../utils/index';

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
    const fileName = folderName
      ? `${folderName}/${file.filename}.${fileType.split('/').pop()}`
      : `${file.filename}.${fileType.split('/').pop()}`;

    const uploadParams: any = {
      Bucket: bucketName,
      Body: fileStream,
      Key: fileName,
      ContentType: fileType,
    };

    const resp = await s3.upload(uploadParams).promise();
    
    return { resp, fileName };
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
