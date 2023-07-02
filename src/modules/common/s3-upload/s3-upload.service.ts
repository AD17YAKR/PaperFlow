import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class S3UploadService {
  async upload(file: any) {
    const { originalname } = file;
    const bucketS3 = process.env.BACKBLAZE_BUCKET_NAME;
    const uploadedFile = await this.uploadS3(
      file.buffer,
      bucketS3,
      originalname,
    );
    return this.getFileUrl(uploadedFile.Key, bucketS3);
  }

  async uploadS3(file: any, bucket: string, name: string) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise<any>((resolve, reject) => {
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  async download(key: string, bucket: string): Promise<Readable> {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const object = await s3.getObject(params).promise();
    return object.Body as Readable;
  }

  getS3() {
    return new S3({
      endpoint: process.env.BACKBLAZE_ENDPOINT,
      accessKeyId: process.env.BACKBLAZE_APP_KEY_ID,
      secretAccessKey: process.env.BACKBLAZE_APPLICATION_KEY,
    });
  }

  getFileUrl(key: string, bucket: string) {
    return `https://${bucket}.${process.env.BACKBLAZE_ENDPOINT}/${key}`;
  }
}
